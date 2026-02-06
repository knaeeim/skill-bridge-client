"use client"

import { createStudentProfileAction } from "@/actions/student.action";
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
import { useForm } from "@tanstack/react-form";
import { GraduationCap, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import * as z from "zod";

const StudentRegisterForm = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.literal("STUDENT"),
    profile: z.object({
        bio: z.string().min(10, "Bio must be at least 10 characters long")
    }),
})

export function StudentSignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "STUDENT",
            profile: {
                bio: ""
            }
        },
        validators: {
            onChange: StudentRegisterForm
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating your student account...");
            try {
                const {data ,error} = await createStudentProfileAction(value)
                console.log(data);
                if(error){
                    return toast.error(`Failed to create account: ${error}`, { id: toastId });
                }
                toast.success("Student account created successfully!", { id: toastId });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    return toast.error(`Failed to create account: ${error.message}`, { id: toastId });
                }
                toast.error("Failed to create account: Unknown error", { id: toastId });
            }
        }
    })

    return (
        <Card className="w-full" {...props}>
            <CardHeader>
                <CardTitle className="flex gap-4 items-center text-2xl">
                    {" "}
                    <GraduationCap size={40}></GraduationCap> Create a student account
                </CardTitle>
                <CardDescription>
                    Enter your information below to create your student account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit();
                }}>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                                name="name"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor="name">Name</FieldLabel>
                                            <Input
                                                id="name"
                                                type="text"
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Your full name"

                                            />
                                        </Field>
                                    )
                                }}
                            />

                            <form.Field
                                name="email"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor="email">Email</FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Your email address"

                                            />
                                        </Field>
                                    )
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                                name="password"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                            <Input
                                                id="password"
                                                type="password"
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Your password"

                                            />
                                        </Field>
                                    )
                                }}
                            />

                            <form.Field
                                name="role"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor="role">Role</FieldLabel>
                                            <Input
                                                id="role"
                                                name={field.name}
                                                value={field.state.value}
                                                placeholder="Your role"
                                                disabled
                                                className="bg-muted text-muted-foreground font-semibold cursor-not-allowed"
                                            />
                                        </Field>
                                    )
                                }}
                            />

                        </div>

                        <form.Field
                            name="profile.bio"
                            children={(field) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                                        <Input
                                            id="bio"
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Your Bio Here..."

                                        />
                                    </Field>
                                )
                            }}
                        />
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
