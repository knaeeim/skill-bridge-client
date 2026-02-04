import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Search,
    BookOpen,
    Clock,
    Star,
    ArrowRight,
    CheckCircle2,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
} from "lucide-react"; // Added Social Icons
import { tutorServices } from "@/Services/tutor.service";
import { Tutor } from "@/types";
import { Separator } from "@/components/ui/separator"; // Make sure to install this: npx shadcn@latest add separator

export default async function Home() {
    const { data : tutors } = await tutorServices.getAllTutors(
        { isFeatured: "true" },
        { cache: "no-store" },
    );
    // const session = await authClient.getSession(); // Uncomment if needed
    console.log(tutors);
    
    return (
        <div className="flex flex-col min-h-screen">
            {/* --- HERO SECTION --- */}
            <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
                {/* ... (Your existing Hero code remains exactly the same) ... */}
                <div className="container px-4 mx-auto text-center">
                    <Badge
                        variant="secondary"
                        className="mb-4 px-4 py-1.5 text-sm font-medium rounded-full">
                        🚀 The #1 Platform for 1-on-1 Learning
                    </Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 max-w-4xl mx-auto">
                        Master Any Subject with <br />
                        <span className="text-primary">Expert Tutors</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Connect with certified tutors for personalized sessions. From coding to
                        calculus, find the perfect mentor to help you succeed.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto mb-10">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="What do you want to learn? (e.g. React, Physics)"
                                className="pl-10 h-12"
                            />
                        </div>
                        <Button size="lg" className="h-12 w-full sm:w-auto">
                            Find a Tutor
                        </Button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> 5,000+ Verified
                            Tutors
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> 100k+ Sessions
                            Completed
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> 4.9/5 Average
                            Rating
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS --- */}
            <section className="py-20 bg-muted/30">
                {/* ... (Your existing How It Works code remains exactly the same) ... */}
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            How It Works
                        </h2>
                        <p className="text-muted-foreground">Get started in 3 simple steps</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-background p-8 rounded-xl border text-center hover:shadow-lg transition-shadow">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">1. Search Tutors</h3>
                            <p className="text-muted-foreground">
                                Browse profiles by subject, rating, and price.
                            </p>
                        </div>
                        <div className="bg-background p-8 rounded-xl border text-center hover:shadow-lg transition-shadow">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">2. Book a Session</h3>
                            <p className="text-muted-foreground">
                                Choose a time slot that works for you.
                            </p>
                        </div>
                        <div className="bg-background p-8 rounded-xl border text-center hover:shadow-lg transition-shadow">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">3. Start Learning</h3>
                            <p className="text-muted-foreground">
                                Connect via our virtual classroom.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURED TUTORS --- */}
            <section className="py-20">
                {/* ... (Your existing Featured Tutors code remains exactly the same) ... */}
                <div className="container px-4 mx-auto">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2">
                                Top Rated Tutors
                            </h2>
                            <p className="text-muted-foreground">Learn from the very best</p>
                        </div>
                        <Link
                            href="/tutors"
                            className="text-primary font-medium hover:underline flex items-center gap-1">
                            View all tutors <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tutors?.data?.data.map((tutor: Tutor) => (
                            <Card
                                key={tutor.id}
                                className="overflow-hidden hover:border-primary transition-colors">
                                <CardHeader className="p-0">
                                    <div className="h-24 bg-linear-to-r from-blue-500 to-cyan-500 relative"></div>
                                    <div className="px-6 -mt-10">
                                        <Avatar className="h-20 w-20 border-4 border-background">
                                            <AvatarImage src={tutor.image || ""} />
                                            <AvatarFallback>{tutor.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-6 pt-4 pb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg">{tutor.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {tutor.tutorProfile?.subjects.join(", ")}
                                            </p>
                                        </div>
                                        <Badge variant="secondary" className="flex gap-1">
                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />{" "}
                                            {tutor.tutorProfile?.rating || "5.0"}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                        {tutor.tutorProfile?.bio}
                                    </p>
                                    <div className="text-sm font-medium">
                                        ৳ {tutor.tutorProfile?.hourlyRate}/hr
                                    </div>
                                </CardContent>
                                <CardFooter className="px-6 pb-6 pt-0">
                                    <Button className="w-full" asChild>
                                        <Link href={`/tutors/${tutor.id}`}>View Details</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- BECOME A TUTOR CTA --- */}
            <section className="py-24 bg-primary text-primary-foreground">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to share your knowledge?
                    </h2>
                    <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">
                        Join thousands of tutors who are earning money by teaching what they
                        love.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="font-semibold"
                            asChild>
                            <Link href="/register/tutor-registration">Become a Tutor</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-background border-t pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Brand */}
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold tracking-tight flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-primary" /> Mentora
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                                Empowering students and connecting them with expert tutors
                                worldwide.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-primary">
                                    <Facebook className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-primary">
                                    <Twitter className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-primary">
                                    <Instagram className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-primary">
                                    <Linkedin className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
                                Platform
                            </h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>
                                    <Link
                                        href="/tutors"
                                        className="hover:text-primary transition-colors">
                                        Find Tutors
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/register/"
                                        className="hover:text-primary transition-colors">
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className="hover:text-primary transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pricing"
                                        className="hover:text-primary transition-colors">
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
                                Support
                            </h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:text-primary transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/faq"
                                        className="hover:text-primary transition-colors">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="hover:text-primary transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="hover:text-primary transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
                                Stay Updated
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Subscribe to get the latest learning tips and offers.
                            </p>
                            <div className="flex flex-col gap-2">
                                <Input
                                    placeholder="Enter your email"
                                    className="bg-background"
                                />
                                <Button className="w-full">Subscribe</Button>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>
                            &copy; {new Date().getFullYear()} Mentora Inc. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> <span>support@mentora.com</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
