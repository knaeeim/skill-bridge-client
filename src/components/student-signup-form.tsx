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
import { GraduationCap, Send } from "lucide-react";
import Link from "next/link";

export function StudentSignupForm({ ...props }: React.ComponentProps<typeof Card>) {
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
                <form>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input id="name" type="text" placeholder="John Doe" required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                                <FieldDescription>
                                    We&apos;ll use this to contact you. We will not share your
                                    email with anyone else.
                                </FieldDescription>
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input id="password" type="password" required />
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirm-password">
                                    Confirm Password
                                </FieldLabel>
                                <Input id="confirm-password" type="password" required />
                                <FieldDescription>
                                    Please confirm your password.
                                </FieldDescription>
                            </Field>
                        </div>
                        <FieldGroup>
                            <Field>
                                <Button type="submit">
                                    <Send /> Create Account
                                </Button>
                                <Button variant="outline" type="button">
                                    Sign up with Google
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
