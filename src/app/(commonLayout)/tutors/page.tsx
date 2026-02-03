"use client";

import { getAllTutors } from "@/actions/tutor.action";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tutor } from "@/types";

// Define Interface based on your data structure

const AllTutors = () => {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                // Assuming getAllTutors returns { data: Tutor[] }
                const {data, error} = await getAllTutors({ isApproved : true });
                setTutors(data.data);
            } catch (error) {
                console.error("Failed to fetch tutors", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTutors();
    }, []);

    console.log(tutors);
    // Loading State (Skeleton)
    if (isLoading) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="h-87.5 flex flex-col justify-between">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-37.5" />
                                    <Skeleton className="h-4 w-25" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-10 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4 min-h-screen">
            {/* Page Header */}
            <div className="mb-8 text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Find Your Perfect Tutor
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Browse through our expert tutors and find the right match for your learning
                    goals.
                </p>
            </div>

            {/* Grid Layout */}
            {tutors?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutors.map((tutor) => (
                        <TutorCard key={tutor.id} tutor={tutor} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-lg text-muted-foreground">
                        No tutors found at the moment.
                    </p>
                </div>
            )}
        </div>
    );
};

// Extracted Card Component for cleaner code
const TutorCard = ({ tutor }: { tutor: Tutor }) => {
    // Safety check for profile data
    const { tutorProfile } = tutor;
    const subjects = tutorProfile?.subjects || [];

    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-muted">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <Avatar className="h-14 w-14 border-2 border-primary/10">
                            <AvatarImage src={tutor.image || ""} alt={tutor.name} />
                            <AvatarFallback className="font-bold text-lg">
                                {tutor.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-xl font-bold">{tutor.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1 text-primary font-medium">
                                {/* Dummy Rating if not available */}
                                <Star className="w-4 h-4 fill-primary" />
                                {tutorProfile?.rating || "No Rating"}
                                <span className="text-muted-foreground font-bold text-sm ml-1">
                                    ({tutorProfile?.rating} reviews)
                                </span>
                            </CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 pb-3">
                {/* Hourly Rate & Experience */}
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{tutorProfile?.experienceYears || 0}+ Years Exp.</span>
                    </div>
                    <div className="font-bold text-foreground flex items-center bg-secondary px-2 py-1 rounded">
                        ৳{tutorProfile?.hourlyRate || 0}/hr
                    </div>
                </div>

                <Separator className="my-3" />

                {/* Bio Snippet */}
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-10">
                        {tutorProfile?.bio || "This tutor has not added a bio yet."}
                    </p>
                </div>

                {/* Subjects Badges */}
                <div className="flex flex-wrap gap-2">
                    {subjects.slice(0, 3).map((sub, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs font-normal">
                            {sub.toString().replace(/_/g, " ")}
                        </Badge>
                    ))}
                    {subjects.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                            +{subjects.length - 3} more
                        </Badge>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pt-2">
                <Button asChild className="w-full group">
                    <Link href={`/tutors/${tutor.id}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AllTutors;
