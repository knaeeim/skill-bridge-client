"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Plus, Trash2, Save, Loader2, CalendarDays } from "lucide-react";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { UpdateTutorAvailability } from "@/actions/tutor.action";

// Helper: Generate Time Slots (8 AM - 10 PM)
const TIME_SLOTS = Array.from({ length: 29 }).map((_, i) => {
    const hour24 = 8 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const ampm = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 > 12 ? hour24 - 12 : hour24;
    return `${hour12}:${minute} ${ampm}`;
});

const DAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

// Types
interface AvailabilitySlot {
    dayOfWeek: string[];
    startTime: string;
    endTime: string;
}

interface AvailabilityFormProps {
    initialData: AvailabilitySlot[];
    // userId is no longer needed here because the cookie handles auth on the server!
}

export default function AvailabilityForm({ initialData }: AvailabilityFormProps) {
    const form = useForm({
        defaultValues: {
            availabilities:
                initialData.length > 0
                    ? initialData
                    : [{ dayOfWeek: [], startTime: "09:00 AM", endTime: "05:00 PM" }],
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Saving schedule...");
            try {
                const result = await UpdateTutorAvailability(value.availabilities);
                console.log(result);
                if (result.data?.success) {
                    toast.success("Schedule updated successfully!", { id: toastId });
                } else {
                    toast.error(result.error || "Failed to update schedule.", { id: toastId });
                }
            } catch (error) {
                toast.error("Something went wrong.", { id: toastId });
            }
        },
    });

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-1">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Manage Availability</h2>
                <p className="text-muted-foreground">
                    Set the days and times you are available for tuition.
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-6">
                <form.Field
                    name="availabilities"
                    mode="array"
                    children={(field) => (
                        <div className="space-y-4">
                            {field.state.value.map((_, index) => (
                                <Card
                                    key={index}
                                    className="relative overflow-hidden border-l-4 border-l-primary/70 shadow-sm">
                                    <CardContent className="pt-6 space-y-6">
                                        {/* Delete Button */}
                                        <div className="absolute top-2 right-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-red-600 hover:bg-red-50"
                                                onClick={() => field.removeValue(index)}
                                                disabled={field.state.value.length === 1}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {/* Day Selector */}
                                        <form.Field
                                            name={`availabilities[${index}].dayOfWeek`}
                                            children={(dayField) => (
                                                <div className="space-y-3">
                                                    <Label className="flex items-center gap-2 text-base font-medium">
                                                        <CalendarDays className="h-4 w-4 text-primary" />{" "}
                                                        Select Days
                                                    </Label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {DAYS.map((day) => {
                                                            // Ensure it's an array to avoid crashes
                                                            const currentDays = Array.isArray(
                                                                dayField.state.value,
                                                            )
                                                                ? dayField.state.value
                                                                : [];
                                                            const isSelected =
                                                                currentDays.includes(day);

                                                            return (
                                                                <div
                                                                    key={day}
                                                                    onClick={() => {
                                                                        const newData =
                                                                            isSelected
                                                                                ? currentDays.filter(
                                                                                      (
                                                                                          d: string,
                                                                                      ) =>
                                                                                          d !==
                                                                                          day,
                                                                                  )
                                                                                : [
                                                                                      ...currentDays,
                                                                                      day,
                                                                                  ];
                                                                        dayField.handleChange(
                                                                            newData,
                                                                        );
                                                                    }}
                                                                    className={cn(
                                                                        "cursor-pointer px-3 py-1.5 rounded-full text-xs font-semibold border transition-all select-none",
                                                                        isSelected
                                                                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                                                            : "bg-muted/30 text-muted-foreground border-transparent hover:border-border hover:bg-muted",
                                                                    )}>
                                                                    {day.slice(0, 3)}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    {Array.isArray(dayField.state.value) &&
                                                        dayField.state.value.length === 0 && (
                                                            <p className="text-xs text-red-500 font-medium animate-pulse">
                                                                * Please select at least one
                                                                day
                                                            </p>
                                                        )}
                                                </div>
                                            )}
                                        />

                                        {/* Time Range Selector */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <form.Field
                                                name={`availabilities[${index}].startTime`}
                                                children={(timeField) => (
                                                    <div className="space-y-2">
                                                        <Label className="text-xs uppercase text-muted-foreground font-bold">
                                                            Start Time
                                                        </Label>
                                                        <Select
                                                            value={timeField.state.value}
                                                            onValueChange={
                                                                timeField.handleChange
                                                            }>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Start" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {TIME_SLOTS.map((t) => (
                                                                    <SelectItem
                                                                        key={t}
                                                                        value={t}>
                                                                        {t}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                )}
                                            />

                                            <form.Field
                                                name={`availabilities[${index}].endTime`}
                                                children={(timeField) => (
                                                    <div className="space-y-2">
                                                        <Label className="text-xs uppercase text-muted-foreground font-bold">
                                                            End Time
                                                        </Label>
                                                        <Select
                                                            value={timeField.state.value}
                                                            onValueChange={
                                                                timeField.handleChange
                                                            }>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="End" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {TIME_SLOTS.map((t) => (
                                                                    <SelectItem
                                                                        key={t}
                                                                        value={t}>
                                                                        {t}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full border-dashed border-2 py-6 text-muted-foreground hover:text-primary hover:border-primary/50"
                                onClick={() => {
                                    form.pushFieldValue("availabilities", {
                                        dayOfWeek: [],
                                        startTime: "09:00 AM",
                                        endTime: "05:00 PM",
                                    });
                                }}>
                                <Plus className="mr-2 h-4 w-4" /> Add Another Time Slot
                            </Button>
                        </div>
                    )}
                />

                <div className="flex justify-end pt-4 border-t">
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                size="lg"
                                disabled={!canSubmit || isSubmitting}
                                className="min-w-[150px] shadow-md">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Save Schedule
                                    </>
                                )}
                            </Button>
                        )}
                    />
                </div>
            </form>
        </div>
    );
}
