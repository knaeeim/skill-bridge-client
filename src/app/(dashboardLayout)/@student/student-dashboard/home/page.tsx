import React from "react";
import { currentUserService } from "@/Services/curentUser.service";
import { studentService } from "@/Services/student.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CreditCard, Star, Wallet, CalendarDays, Mail, Shield } from "lucide-react";

const StudentDashboardOverview = async () => {
    // 1. Fetch Data in Parallel
    const [statsRes, profileRes] = await Promise.all([
        studentService.getStudentStats(),
        currentUserService.getCurrentUserStudent(),
    ]);

    // 2. Safe Data Extraction
    // Structure is: { data: { success: true, data: { ... } } }
    const stats = statsRes?.data?.data || {
        bookingsCount: 0,
        reviewsCount: 0,
        totalSpentAgg: null,
    };
    const user = profileRes?.data?.data || null;

    if (!user) {
        return <div className="p-4 text-red-500">Failed to load user profile.</div>;
    }

    // 3. Handle Total Spent Logic (Prisma Aggregation usually returns _sum)
    // Assuming the object structure is { _sum: { amount: 100 } } or similar
    // Adjust 'amount' to whatever field name is in your Booking model
    const totalSpent =
        stats.totalSpentAgg?._sum?.amount || stats.totalSpentAgg?._sum?.price || 0;

    return (
        <div className="space-y-8">
            {/* --- WELCOME HEADER --- */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-card p-6 rounded-xl border shadow-sm">
                <Avatar className="h-20 w-20 border-4 border-muted">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                        {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Welcome back, {user.name}!
                        </h2>
                        <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
                            {user.status}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4" /> {user.email}
                        <span className="text-gray-300">|</span>
                        <Shield className="h-4 w-4" /> {user.role} Account
                    </p>
                    <p className="text-xs text-muted-foreground pt-1">
                        Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Total Bookings */}
                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                        <BookOpen className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.bookingsCount}</div>
                        <p className="text-xs text-muted-foreground">Sessions booked so far</p>
                    </CardContent>
                </Card>

                {/* Card 2: Total Spent */}
                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <Wallet className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ৳ {totalSpent.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">Invested in learning</p>
                    </CardContent>
                </Card>

                {/* Card 3: Reviews */}
                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
                        <Star className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.reviewsCount}</div>
                        <p className="text-xs text-muted-foreground">Feedback provided</p>
                    </CardContent>
                </Card>
            </div>

            {/* --- RECENT ACTIVITY (Placeholder) --- */}
            {/* You can assume you'll fetch recent bookings here later */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-md">
                            Chart or Graph Placeholder
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <div className="text-sm text-muted-foreground">
                            Your latest actions
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Empty State for now */}
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Account Created
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(user.createdAt).toDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboardOverview;
