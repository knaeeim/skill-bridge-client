"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

// --- Types ---
interface Availability {
    dayOfWeek: string[];
    startTime: string;
    endTime: string;
}

interface BookingSectionProps {
    tutorId: string;
    hourlyRate: number;
    tutorName: string;
    availabilities: Availability[];
}

// --- Utility Functions ---
const parseTimeToMinutes = (timeStr: string) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (hours === 12 && modifier === "AM") hours = 0;
    if (hours !== 12 && modifier === "PM") hours += 12;
    return hours * 60 + minutes;
};

const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const modifier = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMins = mins < 10 ? "0" + mins : mins;
    return `${formattedHours}:${formattedMins} ${modifier}`;
};

export default function BookingSection({
    tutorId,
    hourlyRate,
    tutorName,
    availabilities,
}: BookingSectionProps) {
    const [open, setOpen] = useState(false);

    // States for selection
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // 1. ইউনিক দিনগুলো বের করা (Extract Unique Days for Buttons)
    // availabilities অ্যারে থেকে সব দিন বের করে ডুপ্লিকেট রিমুভ করা হচ্ছে
    const uniqueDays = useMemo(() => {
        const days = new Set<string>();
        availabilities.forEach((slot) => {
            slot.dayOfWeek.forEach((day) => days.add(day));
        });
        // আপনি চাইলে এখানে দিনগুলো সর্ট (Sort) করতে পারেন (Sunday, Monday...)
        return Array.from(days);
    }, [availabilities]);

    // 2. সিলেক্ট করা দিনের জন্য স্লট জেনারেট করা
    const availableSlotsForSelectedDay = useMemo(() => {
        if (!selectedDay) return [];

        // ওই নির্দিষ্ট দিনের জন্য যতগুলো Availability রুল আছে সব খুঁজে বের করা
        const relevantRules = availabilities.filter((a) => a.dayOfWeek.includes(selectedDay));

        let slots: string[] = [];

        relevantRules.forEach((rule) => {
            const startMin = parseTimeToMinutes(rule.startTime);
            const endMin = parseTimeToMinutes(rule.endTime);

            // 60 মিনিটের ইন্টারভাল লুপ
            for (let i = startMin; i < endMin; i += 60) {
                if (i + 60 <= endMin) {
                    slots.push(`${minutesToTime(i)} - ${minutesToTime(i + 60)}`);
                }
            }
        });

        return slots;
    }, [selectedDay, availabilities]);

    const handleConfirm = () => {
        if (!selectedDay || !selectedSlot) {
            toast.error("Please select a day and a time slot.");
            return;
        }

        const bookingData = {
            tutorId,
            day: selectedDay,
            time: selectedSlot,
            price: hourlyRate,
        };

        console.log("Processing Booking:", bookingData);
        // API Call here...

        setOpen(false);
        // Reset selection optionally
        // setSelectedDay(null);
        // setSelectedSlot(null);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="w-full h-12 text-lg font-semibold shadow-md">
                    Book a Session
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>Select Schedule</AlertDialogTitle>
                    <AlertDialogDescription>
                        Time zone: Asia/Dhaka (GMT+6)
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-6 py-2">
                    {/* --- STEP 1: DAY SELECTION --- */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> 1. Select Day
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {uniqueDays.length > 0 ? (
                                uniqueDays.map((day) => (
                                    <Button
                                        key={day}
                                        variant={selectedDay === day ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => {
                                            setSelectedDay(day);
                                            setSelectedSlot(null); // দিন পাল্টালে টাইম রিসেট হবে
                                        }}
                                        className={cn(
                                            "min-w-[80px]",
                                            selectedDay === day
                                                ? "bg-primary text-white"
                                                : "text-muted-foreground",
                                        )}>
                                        {/* শুধু প্রথম ৩ অক্ষর দেখানোর জন্য (e.g., MON) */}
                                        {day.slice(0, 3)}
                                    </Button>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No available days found.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* --- STEP 2: TIME SLOT SELECTION --- */}
                    {selectedDay && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" /> 2. Select Time ({selectedDay})
                            </label>

                            {availableSlotsForSelectedDay.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
                                    {availableSlotsForSelectedDay.map((slot) => (
                                        <Button
                                            key={slot}
                                            variant={
                                                selectedSlot === slot ? "default" : "outline"
                                            }
                                            size="sm"
                                            onClick={() => setSelectedSlot(slot)}
                                            className={cn(
                                                "text-xs",
                                                selectedSlot === slot
                                                    ? "bg-primary text-white border-primary"
                                                    : "hover:border-primary/50",
                                            )}>
                                            {slot}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 bg-muted/50 rounded-md text-center text-sm text-muted-foreground">
                                    No slots available for this day.
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- SUMMARY --- */}
                    {selectedDay && selectedSlot && (
                        <div className="bg-green-50 border border-green-200 p-3 rounded-md flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div className="text-sm">
                                <p className="font-semibold text-green-800">Ready to Book!</p>
                                <p className="text-green-700">
                                    {selectedDay} at {selectedSlot}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={!selectedDay || !selectedSlot} // যতক্ষণ দুটোই সিলেক্ট না হয়, বাটন ডিজেবল
                    >
                        Confirm & Pay ৳{hourlyRate}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
