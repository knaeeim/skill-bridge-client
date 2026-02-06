import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { GraduationCap, LibraryBig } from "lucide-react";

const RegisterPage = () => {
    return (
        <div className="relative min-h-[calc(100vh-85px)] flex flex-col items-center justify-center bg-muted/30 p-4">

            <div className="max-w-4xl w-full space-y-8 text-center">
                {/* Header Text */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                        Join Mentora Today
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Choose how you want to get started
                    </p>
                </div>

                {/* Selection Cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {/* Option 1: Student */}
                    <Link href="/register/student-registration" className="group">
                        <Card className="h-full transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <GraduationCap className="w-24 h-24" />
                            </div>
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                    I am a Student
                                </CardTitle>
                                <CardDescription className="text-base">
                                    I want to find expert tutors, book sessions, and improve my
                                    skills.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li>Book 1-on-1 sessions</li>
                                    <li>Access learning resources</li>
                                    <li>Track your progress</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Option 2: Tutor */}
                    <Link href="/register/tutor-registration" className="group">
                        <Card className="h-full transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <LibraryBig className="w-24 h-24" />
                            </div>
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <LibraryBig className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                    I am a Tutor
                                </CardTitle>
                                <CardDescription className="text-base">
                                    I want to create a profile, list my subjects, and earn by
                                    teaching.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li>Set your own rates</li>
                                    <li>Manage your schedule</li>
                                    <li>Build your reputation</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                <div className="text-sm text-muted-foreground mt-8">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
