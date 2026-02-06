import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Target, Heart, Globe, ArrowRight, GraduationCap, Award } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* --- HERO SECTION --- */}
            <section className="py-20 lg:py-28 bg-background text-center">
                <div className="container px-4 mx-auto max-w-4xl">
                    <Badge
                        variant="outline"
                        className="mb-4 px-4 py-1 text-sm border-primary/20 text-primary">
                        Our Story
                    </Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">
                        Democratizing Education for <br />
                        <span className="text-primary">Everyone, Everywhere.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We believe that high-quality education shouldn&apos;t be limited by
                        location or schedule. We are building the bridge between passionate
                        experts and eager learners.
                    </p>
                </div>
            </section>

            {/* --- MISSION & VISION (Side by Side) --- */}
            <section className="py-16 bg-muted/30">
                <div className="container px-4 mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl">
                                <Target className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
                            <p className="text-lg text-muted-foreground">
                                To create a seamless platform where knowledge flows freely.
                                We&nbsp; want to empower tutors to monetize their skills while
                                providing students with affordable, personalized mentorship.
                            </p>
                            <ul className="space-y-3 pt-4">
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="font-medium">
                                        Eliminate geographical barriers
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="font-medium">
                                        Ensure quality through vetted tutors
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="font-medium">
                                        Flexible learning schedules
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Right: Visual/Image Placeholder */}
                        <div className="relative h-100 bg-linear-to-tr from-slate-200 to-slate-100 rounded-2xl border flex items-center justify-center overflow-hidden">
                            {/* Replace with actual image */}
                            <Image
                                alt="online-class"
                                src={
                                    "https://images.unsplash.com/photo-1647085026850-d571649fd234?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                }
                                fill
                                className="absolute inset-0 bg-grid-slate-200 linear-gradient(0deg,white,rgba(255,255,255,0.6))"
                            />
                            <div className="relative text-center p-8 bg-background/80 backdrop-blur-sm rounded-xl border shadow-sm max-w-xs">
                                <GraduationCap className="h-15 w-15 text-primary mx-auto mb-3" />
                                <div className="text-2xl font-bold">100k+</div>
                                <div className="text-sm text-muted-foreground">
                                    Hours Taught
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CORE VALUES --- */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-muted-foreground">
                            The principles that guide every decision we make at [Project Name].
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-background border-none shadow-none hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <Heart className="h-10 w-10 text-red-500 mb-2" />
                                <CardTitle>Student First</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                We obsess over the student experience. Every feature we build
                                is designed to make learning faster, easier, and more
                                enjoyable.
                            </CardContent>
                        </Card>

                        <Card className="bg-background border-none shadow-none hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <Award className="h-10 w-10 text-yellow-500 mb-2" />
                                <CardTitle>Quality Obsessed</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                We carefully vet our tutors. We believe that a great teacher
                                can change a life, so we only accept the best.
                            </CardContent>
                        </Card>

                        <Card className="bg-background border-none shadow-none hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <Globe className="h-10 w-10 text-blue-500 mb-2" />
                                <CardTitle>Global Community</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Learning has no borders. We are building a diverse community of
                                learners and educators from over 50 countries.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Separator className="my-0" />

            {/* --- TEAM SECTION --- */}
            <section className="py-20 bg-background">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2">
                                Meet the Team
                            </h2>
                            <p className="text-muted-foreground">
                                The people behind the platform.
                            </p>
                        </div>
                        <Button variant="outline">
                            Join our Team <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {TEAM_MEMBERS.map((member) => (
                            <div key={member.name} className="group">
                                <div className="relative overflow-hidden rounded-xl mb-4 bg-muted h-64">
                                    <Image
                                        fill
                                        src={member.image}
                                        alt={member.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="font-bold text-lg">{member.name}</h3>
                                <p className="text-primary font-medium text-sm mb-1">
                                    {member.role}
                                </p>
                                <p className="text-muted-foreground text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-24 bg-secondary/20">
                <div className="container px-4 mx-auto text-center max-w-3xl">
                    <Users className="h-12 w-12 mx-auto mb-6 text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight mb-6">
                        Join the Education Revolution
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Whether you want to learn a new skill or share your expertise, there is
                        a place for you in our community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="px-8">
                            Get Started
                        </Button>
                        <Button size="lg" variant="outline" className="px-8" asChild>
                            <Link href="/contact-us">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Mock Data
const TEAM_MEMBERS = [
    {
        name: "Khairul Bashar Naeeim",
        role: "Founder & CEO",
        bio: "Former educator turned tech entrepreneur. Passionate about EdTech.",
        image: "https://i.ibb.co/LXC178ww/profile-Picture.jpg",
    },
    {
        name: "Sarah Lee",
        role: "Head of Education",
        bio: "PhD in Curriculum Design. Ensures our tutors meet the highest standards.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60",
    },
    {
        name: "David Chen",
        role: "Lead Engineer",
        bio: "Full-stack wizard. Builds the magic that connects students and tutors.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
    },
    {
        name: "Emily Davis",
        role: "Community Manager",
        bio: "The heart of our community. Helps students find their perfect match.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60",
    },
];
