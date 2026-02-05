import { currentUserService } from "@/Services/curentUser.service";
import { tutorServices } from "@/Services/tutor.service";
import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    DollarSign,
    Users,
    Star,
    Clock,
    BookOpen,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

// --- Types ---
interface Stats {
    totalBooking: number;
    totalRevenue: {
        _sum: {
            price: number;
        };
    };
    totalReviews: number;
    averageRatings : number;
    totalCancelled: number;
}

interface TutorProfile {
    bio: string;
    experienceYears: number;
    hourlyRate: number;
    rating: number;
    isApproved: boolean;
    isFeatured: boolean;
    subjects: string[];
    createdAt: string;
}

interface UserData {
    name: string;
    email: string;
    image: string | null;
    role: string;
    tutorProfile: TutorProfile;
}

const TutorDashboardPage = async () => {
    // 1. Fetch Data
    const [userRes, statsRes] = await Promise.all([
        currentUserService.getCurrentUser(),
        tutorServices.getTutorStats(),
    ]);

    const user = userRes?.data?.data as UserData;
    const profile = user?.tutorProfile;
    const stats = statsRes?.data?.data as Stats;

    console.log(stats);

    const initials =
        user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2) || "TM";

    return (
        <div className="space-y-8 p-6 bg-background min-h-screen">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back, {user?.name}! Here&apos;s your daily overview.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {profile?.isApproved ? (
                        <Badge
                            variant="outline"
                            className="border-green-600 text-green-600 px-3 py-1 bg-green-500/10">
                            <CheckCircle2 className="w-3 h-3 mr-2" /> Verified Tutor
                        </Badge>
                    ) : (
                        <Badge variant="destructive" className="px-3 py-1">
                            Pending Approval
                        </Badge>
                    )}
                </div>
            </div>

            {/* --- ALERT (Pending) --- */}
            {!profile?.isApproved && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Account Under Review</AlertTitle>
                    <AlertDescription>
                        Your tutor profile is visible to you but hidden from students until
                        admin approval.
                    </AlertDescription>
                </Alert>
            )}

            {/* --- STATS CARDS --- */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <StatCard
                    title="Total Revenue"
                    value={`৳ ${stats?.totalRevenue._sum.price || 0}`}
                    subText="Lifetime earnings"
                    icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Total Cancelled Bookings"
                    value={stats?.totalCancelled}
                    subText="Sessions cancelled"
                    icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Total Bookings"
                    value={stats?.totalBooking}
                    subText="Sessions booked"
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Hourly Rate"
                    value={`৳ ${profile?.hourlyRate}`}
                    subText="Per hour charge"
                    icon={<Clock className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Rating"
                    value={stats.averageRatings || 0.0}
                    subText={`Based on ${stats?.totalReviews} reviews`}
                    icon={<Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                />
            </div>

            {/* --- DETAILS GRID --- */}
            <div className="grid gap-6 md:grid-cols-7">
                {/* Main Profile Card */}
                <Card className="col-span-4 bg-card text-card-foreground shadow-sm">
                    <CardHeader>
                        <CardTitle>Profile Overview</CardTitle>
                        <CardDescription>Your public profile information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* User Info */}
                        <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border border-border">
                                <AvatarImage
                                    className="object-cover object-top"
                                    src={user?.image || ""}
                                />
                                <AvatarFallback className="text-lg font-bold bg-muted text-muted-foreground">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h3 className="text-xl font-semibold text-foreground">
                                    {user?.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">{user?.email}</p>
                                {profile?.isFeatured && (
                                    <Badge
                                        variant="secondary"
                                        className="mt-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
                                        <Star className="w-3 h-3 mr-1 fill-yellow-500" />{" "}
                                        Featured
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Bio
                            </h4>
                            <div className="p-4 rounded-md bg-muted/50 border border-border text-sm text-foreground leading-relaxed">
                                {profile?.bio || "No bio added yet."}
                            </div>
                        </div>

                        {/* Subjects */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Subjects
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {profile?.subjects?.map((sub) => (
                                    <Badge key={sub} variant="secondary" className="px-3 py-1">
                                        <BookOpen className="w-3 h-3 mr-2 text-muted-foreground" />
                                        {sub}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Status Sidebar */}
                <Card className="col-span-3 h-fit bg-card text-card-foreground shadow-sm">
                    <CardHeader>
                        <CardTitle>Account Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <InfoRow
                            label="Joined"
                            value={new Date(
                                user?.tutorProfile?.createdAt,
                            ).toLocaleDateString()}
                        />
                        <InfoRow
                            label="Experience"
                            value={`${profile?.experienceYears} Years`}
                        />
                        <div className="flex justify-between items-center pb-2">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <Badge
                                variant={profile?.isApproved ? "outline" : "destructive"}
                                className={
                                    profile?.isApproved
                                        ? "text-green-500 border-green-500"
                                        : ""
                                }>
                                {profile?.isApproved ? "Active" : "Under Review"}
                            </Badge>
                        </div>

                        <Button className="w-full mt-4" variant="default">
                            Edit Profile
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// --- Helper Components for Cleaner Code ---

const StatCard = ({
    title,
    value,
    subText,
    icon,
}: {
    title: string;
    value: string | number;
    subText: string;
    icon: React.ReactNode;
}) => (
    <Card className="bg-card shadow-sm border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{subText}</p>
        </CardContent>
    </Card>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center border-b border-border pb-3 last:border-0 last:pb-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-medium text-sm text-foreground">{value}</span>
    </div>
);

export default TutorDashboardPage;
