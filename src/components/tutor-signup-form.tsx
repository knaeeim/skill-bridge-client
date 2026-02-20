"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, GraduationCap, Plus, Send, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { Category, Subjects, TutorFormData, UserRole } from "@/types";
import { Textarea } from "./ui/textarea";
import * as z from "zod";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";
import { getCategories } from "@/actions/categories.action";
import { createTutorProfile } from "@/actions/tutor.action";
import { toast } from "sonner";

const TutorRegisterSchema = z.object({
    name: z
        .string()
        .min(4, "Name must be at least 4 characters long")
        .max(50, "Name must be at most 50 characters long"),
    email: z.string().email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password must be at most 100 characters long"),
    role: z.literal("TUTOR"),
    profile: z.object({
        bio: z
            .string()
            .min(20, "Bio must be at least 20 characters long")
            .max(1000, "Bio must be at most 1000 characters long"),
        experienceYears: z.string().min(1, "Experience years is required"),
        hourlyRate: z.string().min(1, "Hourly rate is required"),
        subjects: z.array(z.string()),
        availabilities: z.array(
            z.object({
                dayOfWeek: z.array(z.string()).min(1, "At least one day must be selected"),
                startTime: z.string().min(1, "Start time is required"),
                endTime: z.string().min(1, "End time is required"),
            }),
        ),
        category: z.array(z.string()),
    }),
});

// type TutorFormValues = z.infer<typeof TutorRegisterSchema>;

export const DAYS = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
];

// সকাল ৮টা থেকে রাত ১০টা পর্যন্ত ৩০ মিনিট গ্যাপে সময় জেনারেট করা
export const generateTimeSlots = () => {
    const times = [];
    for (let i = 8; i <= 22; i++) {
        // 8 AM to 10 PM
        const hour = i > 12 ? i - 12 : i;
        const ampm = i >= 12 ? "PM" : "AM";
        times.push(`${hour}:00 ${ampm}`);
        times.push(`${hour}:30 ${ampm}`);
    }
    return times;
};

const TIME_SLOTS = generateTimeSlots();

export function TutorSignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // ৩. useEffect দিয়ে সার্ভার অ্যাকশন কল করা
    useEffect(() => {
        const fetchData = async () => {
            try {
                // সরাসরি ফাংশন কল করুন (API URL ফেচ করার দরকার নেই)
                const data = await getCategories();
                console.log(data);
                setCategories(data.data);
            } catch (err) {
                console.error("Failed to load categories");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const subjectOptions = Object.values(Subjects).map((key) => ({
        label: key.replace(/_/g, " "),
        value: key,
    }));

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "TUTOR",
            profile: {
                bio: "",
                experienceYears: "",
                hourlyRate: "",
                subjects: [] as string[],
                availabilities: [
                    {
                        dayOfWeek: [] as string[],
                        startTime: "",
                        endTime: "",
                    },
                ] as {
                    dayOfWeek: string[];
                    startTime: string;
                    endTime: string;
                }[],
                category: [] as string[],
            },
        },
        validators: {
            onChange: ({ value }) => {
                const result = TutorRegisterSchema.safeParse(value);
                if (result.success) return undefined;
                const errors: Record<string, string> = {};
                result.error.issues.forEach((issue) => {
                    const path = issue.path.join(".");
                    errors[path] = issue.message;
                });
                return errors;
            },
        },
        onSubmitInvalid: ({ value, formApi }) => {
            console.log("Validation Failed! Errors:", formApi.state.fieldMeta);
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating your tutor account...");
            try {
                console.log(value);
                const tutorData: TutorFormData = {
                    name: value.name,
                    email: value.email,
                    role: value.role,
                    password: value.password,
                    profile: {
                        bio: value.profile.bio,
                        experienceYears: Number(value.profile.experienceYears),
                        hourlyRate: Number(value.profile.hourlyRate),
                        subjects: value.profile.subjects,
                        category: value.profile.category,
                        availabilities: value.profile.availabilities,
                    },
                };
                const response = await createTutorProfile(tutorData);
                toast.success("Tutor account created successfully!", { id: toastId });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    return toast.error(`Failed to create account: ${error.message}`, {
                        id: toastId,
                    });
                }
                toast.error("Failed to create account: Unknown error", { id: toastId });
            }
        },
    });

    return (
        <Card className="w-full" {...props}>
            <CardHeader>
                <CardTitle className="flex gap-4 items-center text-2xl">
                    {" "}
                    <GraduationCap size={40}></GraduationCap> Create a tutor account
                </CardTitle>
                <CardDescription>
                    Enter your information below to create your tutor account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // handleSubmit function that's given by tanStack form
                        form.handleSubmit();
                    }}>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                                name="name"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="Type your name here..."
                                            />
                                        </Field>
                                    );
                                }}
                            />

                            <form.Field
                                name="email"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                            <Input
                                                type="email"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="Type your email here..."
                                            />
                                        </Field>
                                    );
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                                name="password"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>
                                                Password
                                            </FieldLabel>
                                            <Input
                                                type="password"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="Type your password here..."
                                            />
                                        </Field>
                                    );
                                }}
                            />

                            <form.Field
                                name="role"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                disabled
                                                value={field.state.value}
                                                className="bg-muted text-muted-foreground cursor-not-allowed font-semibold opacity-100"
                                                placeholder="Type your role here..."
                                            />
                                        </Field>
                                    );
                                }}
                            />
                        </div>

                        <div>
                            <form.Field
                                name="profile.bio"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>
                                                Bio (As a Tutor you should write bio depending
                                                on your expertise and experience):{" "}
                                            </FieldLabel>
                                            <Textarea
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="Type your bio here..."
                                            />
                                        </Field>
                                    );
                                }}
                            />
                        </div>

                        {/* experienceYears and HourlyRate Field */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                                name="profile.experienceYears"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>
                                                Experience Years
                                            </FieldLabel>
                                            <Input
                                                type="number"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="Type your experience years here..."
                                            />
                                        </Field>
                                    );
                                }}
                            />

                            <form.Field
                                name="profile.hourlyRate"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>
                                                Hourly Rate
                                            </FieldLabel>
                                            <Input
                                                type="number"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="Type your hourly rate here..."
                                            />
                                        </Field>
                                    );
                                }}
                            />
                        </div>

                        {/* subject filed here */}
                        <div>
                            <form.Field
                                name="profile.subjects"
                                children={(field) => {
                                    // ১. সেফলি ভ্যালু রিড করা
                                    const selectedValues =
                                        (field.state.value as string[]) || [];

                                    return (
                                        <Field className="flex flex-col gap-2">
                                            <FieldLabel htmlFor={field.name}>
                                                Subjects (Select Multiple)
                                            </FieldLabel>

                                            <Popover>
                                                {/* --- TRIGGER BUTTON (যা দেখা যায়) --- */}
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        id="subjects-field"
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-full justify-between h-auto",
                                                            "min-h-10 px-3 py-2",
                                                        )}>
                                                        <div className="flex flex-wrap gap-2 justify-start items-center w-full">
                                                            {selectedValues.length > 0 ? (
                                                                selectedValues.map((val) => (
                                                                    <Badge
                                                                        key={val}
                                                                        variant="secondary"
                                                                        className="mr-1 mb-1">
                                                                        {val.replace(
                                                                            /_/g,
                                                                            " ",
                                                                        )}

                                                                        {/* Badge Remove (X) Button */}
                                                                        <div
                                                                            className={cn(
                                                                                "ml-1 rounded-full outline-none cursor-pointer",
                                                                                "ring-offset-background",
                                                                                "focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                                                            )}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                field.handleChange(
                                                                                    selectedValues.filter(
                                                                                        (s) =>
                                                                                            s !==
                                                                                            val,
                                                                                    ),
                                                                                );
                                                                            }}>
                                                                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                                                        </div>
                                                                    </Badge>
                                                                ))
                                                            ) : (
                                                                <span className="text-muted-foreground font-normal">
                                                                    Select subjects...
                                                                </span>
                                                            )}
                                                        </div>
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>

                                                {/* --- DROPDOWN CONTENT (যা মিসিং ছিল) --- */}
                                                <PopoverContent
                                                    className="w-(--radix-popover-trigger-width) p-0"
                                                    align="start">
                                                    <Command>
                                                        <CommandInput placeholder="Search subjects..." />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                No subject found.
                                                            </CommandEmpty>
                                                            <CommandGroup className="max-h-64 overflow-auto">
                                                                {subjectOptions.map(
                                                                    (option) => {
                                                                        const isSelected =
                                                                            selectedValues.includes(
                                                                                option.value,
                                                                            );
                                                                        return (
                                                                            <CommandItem
                                                                                key={
                                                                                    option.value
                                                                                }
                                                                                value={
                                                                                    option.label
                                                                                }
                                                                                onSelect={() => {
                                                                                    if (
                                                                                        isSelected
                                                                                    ) {
                                                                                        // রিমুভ লজিক
                                                                                        field.handleChange(
                                                                                            selectedValues.filter(
                                                                                                (
                                                                                                    s,
                                                                                                ) =>
                                                                                                    s !==
                                                                                                    option.value,
                                                                                            ),
                                                                                        );
                                                                                    } else {
                                                                                        // অ্যাড লজিক
                                                                                        field.handleChange(
                                                                                            [
                                                                                                ...selectedValues,
                                                                                                option.value,
                                                                                            ],
                                                                                        );
                                                                                    }
                                                                                }}>
                                                                                <div
                                                                                    className={cn(
                                                                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                                                        isSelected
                                                                                            ? "bg-primary text-primary-foreground"
                                                                                            : "opacity-50 [&_svg]:invisible",
                                                                                    )}>
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "h-4 w-4",
                                                                                        )}
                                                                                    />
                                                                                </div>
                                                                                {option.label}
                                                                            </CommandItem>
                                                                        );
                                                                    },
                                                                )}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>

                                            {/* এরর মেসেজ */}
                                            {field.state.meta.errors ? (
                                                <p className="text-sm text-red-500">
                                                    {field.state.meta.errors.join(", ")}
                                                </p>
                                            ) : null}
                                        </Field>
                                    );
                                }}
                            />
                        </div>

                        {/* availabilites */}
                        <div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-semibold">
                                        Availability Slots
                                    </Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            // নতুন খালি স্লট যোগ করা
                                            form.pushFieldValue("profile.availabilities", {
                                                dayOfWeek: [],
                                                startTime: "10:00 AM",
                                                endTime: "06:00 PM",
                                            });
                                        }}>
                                        <Plus className="w-4 h-4 mr-2" /> Add Slot
                                    </Button>
                                </div>

                                {/* Availability Array Loop */}
                                <form.Field
                                    name="profile.availabilities"
                                    mode="array"
                                    children={(field) => {
                                        return (
                                            <div className="space-y-4">
                                                {field.state.value.map((_, index) => (
                                                    <Card key={index} className="relative">
                                                        <CardContent className="pt-6 space-y-4">
                                                            {/* ডিলেট বাটন (উপরে ডানে) */}
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                                                                onClick={() =>
                                                                    field.removeValue(index)
                                                                }>
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>

                                                            {/* ১. দিনের সিলেকশন (Day Selector) */}
                                                            <form.Field
                                                                name={`profile.availabilities[${index}].dayOfWeek`}
                                                                children={(dayField) => (
                                                                    <div className="space-y-2">
                                                                        <Label>
                                                                            Select Days
                                                                        </Label>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {DAYS.map(
                                                                                (day) => {
                                                                                    const isSelected =
                                                                                        dayField.state.value.includes(
                                                                                            day,
                                                                                        );
                                                                                    return (
                                                                                        <div
                                                                                            key={
                                                                                                day
                                                                                            }
                                                                                            onClick={() => {
                                                                                                // টগল লজিক
                                                                                                if (
                                                                                                    isSelected
                                                                                                ) {
                                                                                                    dayField.handleChange(
                                                                                                        dayField.state.value.filter(
                                                                                                            (
                                                                                                                d: string,
                                                                                                            ) =>
                                                                                                                d !==
                                                                                                                day,
                                                                                                        ),
                                                                                                    );
                                                                                                } else {
                                                                                                    dayField.handleChange(
                                                                                                        [
                                                                                                            ...dayField
                                                                                                                .state
                                                                                                                .value,
                                                                                                            day,
                                                                                                        ],
                                                                                                    );
                                                                                                }
                                                                                            }}
                                                                                            className={`
                                                                cursor-pointer px-3 py-2 rounded-md text-xs font-semibold border transition-all
                                                                ${
                                                                    isSelected
                                                                        ? "bg-primary text-primary-foreground border-primary"
                                                                        : "bg-background hover:bg-muted text-muted-foreground border-input"
                                                                }
                                                            `}>
                                                                                            {day.slice(
                                                                                                0,
                                                                                                3,
                                                                                            )}{" "}
                                                                                            {/* SUN, MON */}
                                                                                        </div>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            />

                                                            {/* ২. সময় সিলেকশন (Start & End Time) */}
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <form.Field
                                                                    name={`profile.availabilities[${index}].startTime`}
                                                                    children={(startField) => (
                                                                        <div className="space-y-2">
                                                                            <Label>
                                                                                Start Time
                                                                            </Label>
                                                                            <Select
                                                                                value={
                                                                                    startField
                                                                                        .state
                                                                                        .value
                                                                                }
                                                                                onValueChange={
                                                                                    startField.handleChange
                                                                                }>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Start Time" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    {TIME_SLOTS.map(
                                                                                        (
                                                                                            time,
                                                                                        ) => (
                                                                                            <SelectItem
                                                                                                key={
                                                                                                    time
                                                                                                }
                                                                                                value={
                                                                                                    time
                                                                                                }>
                                                                                                {
                                                                                                    time
                                                                                                }
                                                                                            </SelectItem>
                                                                                        ),
                                                                                    )}
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    )}
                                                                />

                                                                <form.Field
                                                                    name={`profile.availabilities[${index}].endTime`}
                                                                    children={(endField) => (
                                                                        <div className="space-y-2">
                                                                            <Label>
                                                                                End Time
                                                                            </Label>
                                                                            <Select
                                                                                value={
                                                                                    endField
                                                                                        .state
                                                                                        .value
                                                                                }
                                                                                onValueChange={
                                                                                    endField.handleChange
                                                                                }>
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="End Time" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    {TIME_SLOTS.map(
                                                                                        (
                                                                                            time,
                                                                                        ) => (
                                                                                            <SelectItem
                                                                                                key={
                                                                                                    time
                                                                                                }
                                                                                                value={
                                                                                                    time
                                                                                                }>
                                                                                                {
                                                                                                    time
                                                                                                }
                                                                                            </SelectItem>
                                                                                        ),
                                                                                    )}
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    )}
                                                                />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}

                                                {/* যদি কোনো স্লট না থাকে */}
                                                {field.state.value.length === 0 && (
                                                    <div className="text-center p-8 border-2 border-dashed rounded-lg text-muted-foreground">
                                                        No availability slots added yet.
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <form.Field
                                name="profile.category"
                                children={(field) => {
                                    // ১. ফর্মে আমরা ID গুলো সেভ রাখছি (যেমন: ["uuid-1", "uuid-2"])
                                    const selectedCategoryIds =
                                        (field.state.value as string[]) || [];

                                    return (
                                        <Field className="flex flex-col gap-2">
                                            <FieldLabel htmlFor="category-field">
                                                Category (Select Specializations)
                                            </FieldLabel>

                                            <Popover>
                                                {/* --- TRIGGER BUTTON --- */}
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        id="category-field"
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-full justify-between h-auto",
                                                            "min-h-10 px-3 py-2",
                                                        )}>
                                                        <div className="flex flex-wrap gap-2 justify-start items-center w-full">
                                                            {selectedCategoryIds.length > 0 ? (
                                                                selectedCategoryIds.map(
                                                                    (id) => {
                                                                        // ২. ID দিয়ে ক্যাটাগরির পুরো অবজেক্ট খুঁজে বের করা (নাম দেখানোর জন্য)
                                                                        const category =
                                                                            categories.find(
                                                                                (c) =>
                                                                                    c.id ===
                                                                                    id,
                                                                            );

                                                                        return (
                                                                            <Badge
                                                                                key={id}
                                                                                variant="secondary"
                                                                                className="mr-1 mb-1">
                                                                                {/* ক্যাটাগরির নাম দেখানো, না পেলে ID দেখাবে */}
                                                                                {category?.name ||
                                                                                    "Unknown"}

                                                                                {/* Remove Button (X) */}
                                                                                <div
                                                                                    className={cn(
                                                                                        "ml-1 rounded-full outline-none cursor-pointer",
                                                                                        "ring-offset-background",
                                                                                        "focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                                                                    )}
                                                                                    onClick={(
                                                                                        e,
                                                                                    ) => {
                                                                                        e.stopPropagation();
                                                                                        // রিমুভ লজিক: ফিল্টার করে বাদ দেওয়া
                                                                                        field.handleChange(
                                                                                            selectedCategoryIds.filter(
                                                                                                (
                                                                                                    cid,
                                                                                                ) =>
                                                                                                    cid !==
                                                                                                    id,
                                                                                            ),
                                                                                        );
                                                                                    }}>
                                                                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                                                                </div>
                                                                            </Badge>
                                                                        );
                                                                    },
                                                                )
                                                            ) : (
                                                                <span className="text-muted-foreground font-normal">
                                                                    {isLoading
                                                                        ? "Loading..."
                                                                        : "Select categories..."}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>

                                                {/* --- DROPDOWN LIST --- */}
                                                <PopoverContent
                                                    className="w-(--radix-popover-trigger-width) p-0"
                                                    align="start">
                                                    <Command>
                                                        <CommandInput placeholder="Search category..." />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                No category found.
                                                            </CommandEmpty>
                                                            <CommandGroup className="max-h-64 overflow-auto">
                                                                {categories.map((category) => {
                                                                    const isSelected =
                                                                        selectedCategoryIds.includes(
                                                                            category.id,
                                                                        );

                                                                    return (
                                                                        <CommandItem
                                                                            key={category.id}
                                                                            value={
                                                                                category.name
                                                                            } // সার্চ করার সময় নাম দিয়ে খুঁজবে
                                                                            onSelect={() => {
                                                                                if (
                                                                                    isSelected
                                                                                ) {
                                                                                    // ৩. আনচেক করলে ID রিমুভ হবে
                                                                                    field.handleChange(
                                                                                        selectedCategoryIds.filter(
                                                                                            (
                                                                                                cid,
                                                                                            ) =>
                                                                                                cid !==
                                                                                                category.id,
                                                                                        ),
                                                                                    );
                                                                                } else {
                                                                                    // ৪. চেক করলে ID যোগ হবে
                                                                                    field.handleChange(
                                                                                        [
                                                                                            ...selectedCategoryIds,
                                                                                            category.id,
                                                                                        ],
                                                                                    );
                                                                                }
                                                                            }}>
                                                                            <div
                                                                                className={cn(
                                                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                                                    isSelected
                                                                                        ? "bg-primary text-primary-foreground"
                                                                                        : "opacity-50 [&_svg]:invisible",
                                                                                )}>
                                                                                <Check
                                                                                    className={cn(
                                                                                        "h-4 w-4",
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            {category.name}
                                                                        </CommandItem>
                                                                    );
                                                                })}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>

                                            {/* Error Message */}
                                            {field.state.meta.errors ? (
                                                <p className="text-sm text-red-500">
                                                    {field.state.meta.errors.join(", ")}
                                                </p>
                                            ) : null}
                                        </Field>
                                    );
                                }}
                            />
                        </div>
                        <FieldGroup>
                            <Field>
                                <Button type="submit">
                                    <Send /> Create Account
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <Link href="/login">Login</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
