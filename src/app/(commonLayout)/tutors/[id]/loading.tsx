import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* --- HERO HEADER SKELETON --- */}
            {/* Matching h-64 md:h-80 from original */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden bg-muted">
                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <Skeleton className="h-9 w-32" /> {/* Back button placeholder */}
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* --- LEFT SIDE: MAIN INFO SKELETON --- */}
                    <div className="flex-1 space-y-8">
                        {/* Profile Header Card */}
                        <Card className="border-none shadow-lg">
                            <CardContent className="pt-6"> 
                                <div className="flex flex-col sm:flex-row gap-6 items-start">
                                    {/* Avatar Skeleton */}
                                    <div className="relative">
                                        <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
                                    </div>

                                    {/* Tutor Basic Info */}
                                    <div className="flex-1 space-y-4 w-full pt-2">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-3">
                                                <Skeleton className="h-8 w-48 md:w-64" />{" "}
                                                {/* Name */}
                                                <div className="flex gap-2">
                                                    <Skeleton className="h-5 w-20" />{" "}
                                                    {/* Category Badge */}
                                                    <Skeleton className="h-5 w-20" />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Skeleton className="h-10 w-10 rounded-full" />{" "}
                                                {/* Heart Btn */}
                                                <Skeleton className="h-10 w-10 rounded-full" />{" "}
                                                {/* Share Btn */}
                                            </div>
                                        </div>

                                        {/* Stats Row */}
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs List Skeleton */}
                        <div className="w-full">
                            <Skeleton className="h-10 w-full md:w-[400px] rounded-md" />
                        </div>

                        {/* Tab Content Area (Simulating About Tab) */}
                        <div className="space-y-6 mt-6">
                            {/* Bio Card */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-32" />
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-5/6" />
                                </CardContent>
                            </Card>

                            {/* Subjects Card */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-32" />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                        <Skeleton className="h-6 w-24 rounded-full" />
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-6 w-28 rounded-full" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Experience Card */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-32" />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-24" />
                                            <Skeleton className="h-4 w-40" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: SIDEBAR SKELETON --- */}
                    <div className="w-full md:w-[350px] space-y-6">
                        <div className="sticky top-24">
                            {/* Booking Card */}
                            <Card className="shadow-lg border-t-4 border-t-muted">
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-8 w-24" />
                                    </div>
                                    <Separator />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                    <Skeleton className="w-full h-12 rounded-md" />{" "}
                                    {/* Book Btn */}
                                    <Skeleton className="w-full h-10 rounded-md" />{" "}
                                    {/* Message Btn */}
                                </CardContent>
                                <CardFooter className="bg-muted/30 px-6 py-4">
                                    <Skeleton className="h-3 w-full" />
                                </CardFooter>
                            </Card>

                            {/* Small Stats Grid Card */}
                            <Card className="mt-6">
                                <CardContent className="pt-6 grid grid-cols-2 gap-4 text-center">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center gap-1">
                                            <Skeleton className="h-6 w-10" />
                                            <Skeleton className="h-3 w-12" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
