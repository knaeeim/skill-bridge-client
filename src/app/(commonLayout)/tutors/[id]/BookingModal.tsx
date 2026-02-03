"use client";

import { createStudentBookingAction } from "@/actions/student.action";
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
import { BookingPayload, studentService } from "@/Services/student.service"; // Ensure this path is correct
import { Calendar, Clock, CheckCircle2, BookOpen } from "lucide-react";
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
    subjects: string[];
    studentId: string;
}

// --- Utility Functions ---

// ১. টাইম স্ট্রিং থেকে মিনিট কনভার্ট
const parseTimeToMinutes = (timeStr: string) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (hours === 12 && modifier === "AM") hours = 0;
    if (hours !== 12 && modifier === "PM") hours += 12;
    return hours * 60 + minutes;
};

// ২. মিনিট থেকে টাইম স্ট্রিং কনভার্ট
const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const modifier = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMins = mins < 10 ? "0" + mins : mins;
    return `${formattedHours}:${formattedMins} ${modifier}`;
};

// ৩. দিন থেকে পরবর্তী তারিখ বের করা (MONDAY -> 2026-02-xx) [API এর জন্য জরুরি]
const getNextDateForDay = (dayName: string): string => {
    const days = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
    ];
    const targetDayIndex = days.indexOf(dayName.toUpperCase());
    if (targetDayIndex === -1) return "";

    const date = new Date();
    const currentDayIndex = date.getDay();
    let daysToAdd = targetDayIndex - currentDayIndex;
    if (daysToAdd <= 0) daysToAdd += 7;

    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0];
};

export default function BookingSection({
    tutorId,
    hourlyRate,
    tutorName,
    availabilities,
    subjects,
    studentId,
}: BookingSectionProps) {
    const [open, setOpen] = useState(false);

    // --- States for selection ---
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null); // ✅ নতুন স্টেট

    // 1. Unique Days Extraction
    const uniqueDays = useMemo(() => {
        const days = new Set<string>();
        availabilities.forEach((slot) => {
            slot.dayOfWeek.forEach((day) => days.add(day));
        });
        return Array.from(days);
    }, [availabilities]);

    // 2. Slots Generation
    const availableSlotsForSelectedDay = useMemo(() => {
        if (!selectedDay) return [];
        const relevantRules = availabilities.filter((a) => a.dayOfWeek.includes(selectedDay));
        let slots: string[] = [];

        relevantRules.forEach((rule) => {
            const startMin = parseTimeToMinutes(rule.startTime);
            const endMin = parseTimeToMinutes(rule.endTime);
            for (let i = startMin; i < endMin; i += 60) {
                if (i + 60 <= endMin) {
                    slots.push(`${minutesToTime(i)} - ${minutesToTime(i + 60)}`);
                }
            }
        });
        return slots;
    }, [selectedDay, availabilities]);

    const handleConfirm = async () => {
        // ১. ভ্যালিডেশন আপডেট করা হয়েছে
        if (!selectedDay || !selectedSlot || !selectedSubject) {
            toast.error("Please select a subject, day, and time slot.");
            return;
        }

        const toastID = toast.loading("Processing your booking...");

        try {
            // ২. ডাটা প্রিপারেশন (API এর জন্য)
            const [startTime, endTime] = selectedSlot.split(" - ");
            const bookingDate = getNextDateForDay(selectedDay);

            const bookingData: BookingPayload = {
                tutorId,
                studentId,
                subject: selectedSubject, // ✅ এখানে single subject যাবে
                date: bookingDate, // ✅ "MONDAY" এর বদলে "2026-02-10"
                startTime: startTime, // ✅ "10:00 PM"
                endTime: endTime, // ✅ "11:00 PM"
                price: hourlyRate,
            };

            console.log("Processing Booking Payload:", bookingData);

            const response = await createStudentBookingAction(bookingData);
            console.log(response);
            if (response.data.data.id) {
                toast.success("Booking request sent successfully!", { id: toastID });
                setOpen(false);
                // Reset States
                setSelectedDay(null);
                setSelectedSlot(null);
                setSelectedSubject(null);
            } else {
                toast.error("Failed to book session.", { id: toastID });
            }
        } catch (error) {
            toast.error("Something went wrong.", { id: toastID });
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="w-full h-12 text-lg font-semibold shadow-md">
                    Book a Session
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>Select Schedule</AlertDialogTitle>
                    <AlertDialogDescription>
                        Booking with <strong>{tutorName}</strong>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-6 py-2">
                    {/* --- STEP 1: SUBJECT SELECTION (New) --- */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <BookOpen className="h-4 w-4" /> 1. Select Subject
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {subjects.length > 0 ? (
                                subjects.map((sub) => (
                                    <Button
                                        key={sub}
                                        variant={
                                            selectedSubject === sub ? "default" : "outline"
                                        }
                                        size="sm"
                                        onClick={() => setSelectedSubject(sub)}
                                        className={cn(
                                            "text-xs",
                                            selectedSubject === sub
                                                ? "bg-primary text-black border-primary"
                                                : "hover:border-primary/50",
                                        )}>
                                        {/* Underscore remove logic if needed */}
                                        {sub.replace(/_/g, " ")}
                                    </Button>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No subjects listed.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* --- STEP 2: DAY SELECTION --- */}
                    {selectedSubject && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> 2. Select Day
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {uniqueDays.length > 0 ? (
                                    uniqueDays.map((day) => (
                                        <Button
                                            key={day}
                                            variant={
                                                selectedDay === day ? "default" : "outline"
                                            }
                                            size="sm"
                                            onClick={() => {
                                                setSelectedDay(day);
                                                setSelectedSlot(null);
                                            }}
                                            className={cn(
                                                "min-w-[80px]",
                                                selectedDay === day
                                                    ? "bg-primary text-black"
                                                    : "text-muted-foreground",
                                            )}>
                                            {day.slice(0, 3)}
                                        </Button>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No available days.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- STEP 3: TIME SLOT SELECTION --- */}
                    {selectedDay && selectedSubject && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" /> 3. Select Time ({selectedDay})
                            </label>

                            {availableSlotsForSelectedDay.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-y-auto pr-1">
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
                                                    ? "bg-primary text-black border-primary"
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
                    {selectedSubject && selectedDay && selectedSlot && (
                        <div className="bg-green-50 border border-green-200 p-3 rounded-md space-y-1">
                            <div className="flex items-center gap-2 font-semibold text-green-800">
                                <CheckCircle2 className="h-4 w-4" /> Ready to Book!
                            </div>
                            <div className="text-xs text-green-700 ml-6">
                                <p>
                                    Subject: <strong>{selectedSubject}</strong>
                                </p>
                                <p>
                                    Time: <strong>{selectedDay}</strong> at{" "}
                                    <strong>{selectedSlot}</strong>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={!selectedDay || !selectedSlot || !selectedSubject} // ✅ তিনটাই সিলেক্ট করতে হবে
                    >
                        Confirm & Pay ৳{hourlyRate}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
