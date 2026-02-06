import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* --- HERO SECTION SKELETON --- */}
            <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
                <div className="container px-4 mx-auto flex flex-col items-center">
                    {/* Badge */}
                    <Skeleton className="h-8 w-64 rounded-full mb-4" />

                    {/* Heading */}
                    <Skeleton className="h-12 md:h-16 w-full max-w-3xl mb-4" />
                    <Skeleton className="h-12 md:h-16 w-3/4 max-w-2xl mb-6" />

                    {/* Subtext */}
                    <Skeleton className="h-6 w-full max-w-2xl mb-2" />
                    <Skeleton className="h-6 w-3/4 max-w-lg mb-10" />

                    {/* Search Bar Input + Button */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg mb-10">
                        <Skeleton className="h-12 w-full rounded-md" />
                        <Skeleton className="h-12 w-32 rounded-md" />
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap justify-center gap-8">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS SKELETON --- */}
            <section className="py-20 bg-muted/30">
                <div className="container px-4 mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col items-center mb-16 space-y-4">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-5 w-64" />
                    </div>

                    {/* 3 Column Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-background p-8 rounded-xl border flex flex-col items-center">
                                <Skeleton className="h-16 w-16 rounded-full mb-6" />
                                <Skeleton className="h-7 w-32 mb-3" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FEATURED TUTORS SKELETON --- */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    {/* Header Row */}
                    <div className="flex justify-between items-end mb-10">
                        <div className="space-y-2">
                            <Skeleton className="h-9 w-48" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                        <Skeleton className="h-5 w-24" />
                    </div>

                    {/* Tutor Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="overflow-hidden border">
                                <CardHeader className="p-0">
                                    {/* Banner Color Placeholder */}
                                    <div className="h-24 bg-muted" />
                                    <div className="px-6 -mt-10">
                                        {/* Avatar */}
                                        <Skeleton className="h-20 w-20 rounded-full border-4 border-background" />
                                    </div>
                                </CardHeader>
                                <CardContent className="px-6 pt-4 pb-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <Skeleton className="h-6 w-32" /> {/* Name */}
                                            <Skeleton className="h-4 w-24" /> {/* Subjects */}
                                        </div>
                                        <Skeleton className="h-6 w-12 rounded-full" />{" "}
                                        {/* Rating */}
                                    </div>
                                    {/* Bio Lines */}
                                    <div className="space-y-2 pt-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-4/5" />
                                    </div>
                                    <Skeleton className="h-5 w-20 pt-2" /> {/* Price */}
                                </CardContent>
                                <CardFooter className="px-6 pb-6 pt-0">
                                    <Skeleton className="h-10 w-full rounded-md" />{" "}
                                    {/* Button */}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION SKELETON --- */}
            <section className="py-24 bg-muted">
                {/* Note: Used bg-muted instead of primary to prevent flashing bright colors while loading */}
                <div className="container px-4 mx-auto flex flex-col items-center text-center space-y-6">
                    <Skeleton className="h-10 w-full max-w-xl" />
                    <Skeleton className="h-6 w-full max-w-md" />
                    <div className="flex gap-4 mt-4">
                        <Skeleton className="h-12 w-40 rounded-md" />
                        <Skeleton className="h-12 w-32 rounded-md" />
                    </div>
                </div>
            </section>

            {/* --- FOOTER SKELETON --- */}
            <footer className="bg-background border-t pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Brand Column */}
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-4 w-48" />
                            <div className="flex gap-4 pt-2">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-5 rounded-full" />
                            </div>
                        </div>

                        {/* Links Columns */}
                        {[1, 2].map((col) => (
                            <div key={col} className="space-y-4">
                                <Skeleton className="h-5 w-24 mb-4" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        ))}

                        {/* Newsletter Column */}
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-28 mb-4" />
                            <Skeleton className="h-4 w-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <Skeleton className="h-4 w-64" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                </div>
            </footer>
        </div>
    );
}
