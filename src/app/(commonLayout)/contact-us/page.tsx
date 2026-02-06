import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MapPin, Phone, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* --- HERO SECTION --- */}
            <section className="py-20 bg-muted/30 text-center">
                <div className="container px-4 mx-auto max-w-3xl">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Get in touch
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Have a question about finding a tutor or teaching on our platform?
                        We&apos;re here to help. Chat with our friendly team 24/7.
                    </p>
                </div>
            </section>

            {/* --- MAIN CONTACT SECTION --- */}
            <section className="py-16 lg:py-24">
                <div className="container px-4 mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* LEFT: Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight mb-4">
                                    Contact Information
                                </h2>
                                <p className="text-muted-foreground mb-8">
                                    Fill out the form and our team will get back to you within
                                    24 hours.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {/* Email Card */}
                                <Card>
                                    <CardHeader className="space-y-1">
                                        <Mail className="h-6 w-6 text-primary mb-2" />
                                        <CardTitle className="text-md">Email Us</CardTitle>
                                        <CardDescription>support@mentora.com</CardDescription>
                                    </CardHeader>
                                </Card>

                                {/* Phone Card */}
                                <Card>
                                    <CardHeader className="space-y-1">
                                        <Phone className="h-6 w-6 text-primary mb-2" />
                                        <CardTitle className="text-md">Call Us</CardTitle>
                                        <CardDescription>+880 1234 567 890</CardDescription>
                                    </CardHeader>
                                </Card>

                                {/* Office Card */}
                                <Card>
                                    <CardHeader className="space-y-1">
                                        <MapPin className="h-6 w-6 text-primary mb-2" />
                                        <CardTitle className="text-md">Visit Us</CardTitle>
                                        <CardDescription>Dhaka, Bangladesh</CardDescription>
                                    </CardHeader>
                                </Card>

                                {/* Chat Card */}
                                <Card>
                                    <CardHeader className="space-y-1">
                                        <MessageSquare className="h-6 w-6 text-primary mb-2" />
                                        <CardTitle className="text-md">Live Chat</CardTitle>
                                        <CardDescription>Available 9am - 10pm</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>

                            {/* Business Hours */}
                            <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/20 mt-6">
                                <Clock className="h-6 w-6 text-muted-foreground mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-sm">Business Hours</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Monday - Friday: 9am to 6pm
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Saturday: 10am to 4pm
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Contact Form */}
                        <Card className="shadow-lg border-muted">
                            <CardHeader>
                                <CardTitle>Send us a message</CardTitle>
                                <CardDescription>
                                    We&apos;ll help you find the right solution.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="first-name">First name</Label>
                                            <Input
                                                id="first-name"
                                                placeholder="John"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="last-name">Last name</Label>
                                            <Input id="last-name" placeholder="Doe" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="john@example.com"
                                            type="email"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="I need help with..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Type your message here..."
                                            className="min-h-30"
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full h-11">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-20 bg-background border-t">
                <div className="container px-4 mx-auto max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground">
                            Quick answers to questions you may have.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        {FAQS.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </div>
    );
}

// Mock FAQ Data
const FAQS = [
    {
        question: "How do I book a session with a tutor?",
        answer: "Simply browse our 'Find Tutors' page, select a tutor you like, and click 'Book Session'. You can view their available time slots and choose one that works for you.",
    },
    {
        question: "Can I cancel or reschedule a session?",
        answer: "Yes! You can cancel or reschedule up to 24 hours before the session starts for a full refund. Cancellations within 24 hours may be subject to a fee.",
    },
    {
        question: "How do payments work?",
        answer: "We support secure payments via credit card, PayPal, and mobile banking. Payments are held in escrow and released to the tutor only after the session is successfully completed.",
    },
    {
        question: "I want to become a tutor. How do I apply?",
        answer: "Click on the 'Become a Tutor' button in the menu. You'll need to fill out a profile, upload your credentials, and pass a quick verification process.",
    },
    {
        question: "Is the platform free for students?",
        answer: "Signing up is free! You only pay for the sessions you book. Tutor rates vary depending on their experience and subject.",
    },
];
