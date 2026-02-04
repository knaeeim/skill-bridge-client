"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { User, ImageIcon, DollarSign, FileText, Save, Loader2, ArrowLeft } from "lucide-react";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// Actions
import { getCurrentUserAction } from "@/actions/student.action";
import { updateTutorProfileAction } from "@/actions/tutor.action";
import { Field, FieldError } from "@/components/ui/field";
// Make sure to import your update action here
// import { updateTutorProfileAction } from "@/actions/tutor.action";

// --- TYPES ---
interface FetchedTutorData {
    id?: string;
    name: string;
    image: string;
    tutorProfile: {
        bio: string;
        hourlyRate: number;
    };
}

// --- SCHEMA ---
const TutorProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    image: z.string().optional(),
    tutorProfile: z.object({
        bio: z
            .string()
            .min(10, "Bio must be at least 10 characters")
            .max(1000, "Max 1000 characters"),
        hourlyRate: z.number().min(5, "Minimum rate is 5").max(50000, "Maximum rate is 50000"),
    }),
});

// ==========================================
// 1. PARENT COMPONENT (Data Fetching)
// ==========================================
const TutorProfileUpdate = () => {
    const [user, setUser] = useState<FetchedTutorData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const response = await getCurrentUserAction();
            // Adjust based on your actual API response structure
            if (response.data?.success) {
                setUser(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) return <ProfileSkeleton />;

    if (!user)
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <h2 className="text-xl font-semibold">User not found</h2>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );

    // Pass loaded data to the form component
    return <TutorProfileForm userData={user} />;
};

function TutorProfileForm({ userData }: { userData: FetchedTutorData }) {
    const form = useForm({
        defaultValues: {
            name: userData.name || "",
            image: userData.image || "",
            tutorProfile: {
                bio: userData.tutorProfile?.bio || "",
                hourlyRate: userData.tutorProfile?.hourlyRate || 0,
            },
        },
        validators: {
            onChange: ({ value }) => {
                const result = TutorProfileSchema.safeParse(value);
                if (result.success) return undefined;

                // Manual Zod Error Mapping for Nested Objects
                const errors: Record<string, string> = {};
                result.error.issues.forEach((issue) => {
                    // Joins path array to string (e.g. ['tutorProfile', 'bio'] -> 'tutorProfile.bio')
                    const path = issue.path.join(".");
                    errors[path] = issue.message;
                });
                return errors;
            },
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Saving changes...");
            try {
                const updatedData = {
                    name: value.name,
                    image: value.image,
                    bio: value.tutorProfile.bio,
                    hourlyRate: value.tutorProfile.hourlyRate,
                };
                const { data, error } = await updateTutorProfileAction(updatedData);
                if (error) {
                    return toast.error(`Failed to update profile: ${error}`, { id: toastId });
                }
                toast.success("Profile updated successfully!", { id: toastId });
            } catch (error) {
                toast.error("Something went wrong", { id: toastId });
            }
        },
    });

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Card className="border-none shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 relative">
                    <div className="absolute -bottom-12 left-8">
                        {/* Dynamic Avatar Preview */}
                        <form.Subscribe
                            selector={(state) => state.values.image}
                            children={(imgUrl) => (
                                <Avatar className="h-24 w-24 border-4 border-white shadow-sm bg-white">
                                    <AvatarImage src={imgUrl || ""} className="object-cover" />
                                    <AvatarFallback className="text-2xl font-bold text-blue-600">
                                        {userData.name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        />
                    </div>
                </div>

                <CardHeader className="pt-16 pb-8 px-8">
                    <CardTitle className="text-2xl font-bold">Edit Tutor Profile</CardTitle>
                    <CardDescription>
                        Update your public information and rates.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-6">
                        {/* 1. Name Field */}
                        <form.Field
                            name="name"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;
                                return (
                                    <Field className="space-y-2" data-invalid={isInvalid}>
                                        <Label
                                            htmlFor={field.name}
                                            className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />{" "}
                                            Full Name
                                        </Label>
                                        <Input
                                            id={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="e.g. John Doe"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        {/* 2. Image URL Field */}
                        <form.Field
                            name="image"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;
                                return (
                                    <Field className="space-y-2" data-invalid={isInvalid}>
                                        <Label
                                            htmlFor={field.name}
                                            className="flex items-center gap-2">
                                            <ImageIcon className="h-4 w-4 text-muted-foreground" />{" "}
                                            Profile Image URL
                                        </Label>
                                        <Input
                                            id={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="https://..."
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Paste a direct link to a JPG or PNG image.
                                        </p>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 3. Hourly Rate (Nested Field) */}
                            <form.Field
                                name="tutorProfile.hourlyRate"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;
                                    return (
                                        <Field className="space-y-2" data-invalid={isInvalid}>
                                            <Label
                                                htmlFor="hourlyRate"
                                                className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-muted-foreground" />{" "}
                                                Hourly Rate (BDT)
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-500 font-semibold">
                                                    ৳
                                                </span>
                                                <Input
                                                    id="hourlyRate"
                                                    type="number"
                                                    className="pl-8"
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) =>
                                                        field.handleChange(
                                                            Number(e.target.value),
                                                        )
                                                    }
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            />
                        </div>

                        {/* 4. Bio (Nested Field) */}
                        <form.Field
                            name="tutorProfile.bio"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;
                                return (
                                    <Field className="space-y-2" data-invalid={isInvalid}>
                                        <Label
                                            htmlFor="bio"
                                            className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-muted-foreground" />{" "}
                                            Bio
                                        </Label>
                                        <Textarea
                                            id="bio"
                                            className="min-h-[150px] resize-none"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="Tell students about your experience and teaching style..."
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Min 10 chars</span>
                                            <span>{field.state.value?.length || 0}/1000</span>
                                        </div>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                children={([canSubmit, isSubmitting]) => (
                                    <Button
                                        type="submit"
                                        disabled={!canSubmit || isSubmitting}
                                        className="w-full md:w-auto min-w-[150px]">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" /> Save Changes
                                            </>
                                        )}
                                    </Button>
                                )}
                            />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

// Skeleton Loader
const ProfileSkeleton = () => (
    <div className="container mx-auto p-4 max-w-3xl space-y-8">
        <Skeleton className="h-32 w-full rounded-t-xl" />
        <div className="px-8 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
    </div>
);

export default TutorProfileUpdate;
