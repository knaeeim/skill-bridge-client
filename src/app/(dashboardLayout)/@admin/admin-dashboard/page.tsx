import React from "react";
import { adminService } from "@/Services/admin.service";
import { currentUserService } from "@/Services/curentUser.service";
import {
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    Layers,
    DollarSign,
    TrendingUp,
    Ban,
    ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = async () => {
    const [statsRes, userRes] = await Promise.all([
        adminService.getAllStats(),
        currentUserService.getCurrentUser(),
    ]);

    const stats = statsRes?.data;
    const user = userRes?.data;

    const formatCurrency = (amount: number | null) => {
        return new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 0,
        }).format(amount || 0);
    };

    return (
        <div className="container mx-auto p-8 space-y-8">
            {/* --- 1. WELCOME HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-linear-to-r from-slate-900 to-slate-800 p-8 rounded-2xl text-white shadow-xl border border-slate-700">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {user?.name || "Admin"} 👋
                    </h1>
                    <p className="text-slate-400">
                        Here is an overview of your platform's performance today.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                    <Avatar className="h-12 w-12 border-2 border-slate-600">
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback className="bg-slate-700 text-white font-bold">
                            {user?.name?.[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-slate-200">{user?.email}</p>
                        <Badge
                            variant="secondary"
                            className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 mt-1">
                            <ShieldCheck className="w-3 h-3 mr-1" /> {user?.role}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* --- 2. FINANCIAL STATS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Revenue"
                    value={formatCurrency(stats?.totalSale?._sum?.price)}
                    icon={DollarSign}
                    description="Lifetime platform revenue"
                    // Removed washed-out background, kept consistent dark card
                    iconClassName="text-emerald-400 bg-emerald-400/10"
                    valueClassName="text-emerald-500"
                />
                <StatsCard
                    title="Average Booking"
                    value={formatCurrency(stats?.avgSale?._avg?.price)}
                    icon={TrendingUp}
                    description="Average price per session"
                    iconClassName="text-blue-400 bg-blue-400/10"
                    valueClassName="text-blue-500"
                />
                <StatsCard
                    title="Total Bookings"
                    value={stats?.totalBookings || 0}
                    icon={Calendar}
                    description="Sessions scheduled"
                    iconClassName="text-purple-400 bg-purple-400/10"
                />
                <StatsCard
                    title="Active Categories"
                    value={stats?.totalCategories || 0}
                    icon={Layers}
                    description="Subjects available"
                    iconClassName="text-amber-400 bg-amber-400/10"
                />
            </div>

            {/* --- 3. USER STATS --- */}
            <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-200">
                    <Users className="h-5 w-5 text-slate-400" /> User Analytics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Users"
                        value={stats?.totalUser || 0}
                        icon={Users}
                        description="All registered accounts"
                        iconClassName="text-slate-200 bg-slate-700"
                    />
                    <StatsCard
                        title="Tutors"
                        value={stats?.totalTutors || 0}
                        icon={GraduationCap}
                        description="Verified instructors"
                        iconClassName="text-indigo-400 bg-indigo-400/10"
                    />
                    <StatsCard
                        title="Students"
                        value={stats?.totalStudents || 0}
                        icon={BookOpen}
                        description="Active learners"
                        iconClassName="text-sky-400 bg-sky-400/10"
                    />
                    <StatsCard
                        title="Banned Users"
                        value={stats?.totalBanUsers || 0}
                        icon={Ban}
                        description="Restricted accounts"
                        // Making the banned card distinct but not ugly
                        className="border-red-900/30 bg-red-900/5"
                        iconClassName="text-red-400 bg-red-400/10"
                        valueClassName="text-red-400"
                    />
                </div>
            </div>
        </div>
    );
};

// --- Reusable Small Component ---
interface StatsCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: any;
    className?: string;
    iconClassName?: string;
    valueClassName?: string;
}

function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    className,
    iconClassName,
    valueClassName,
}: StatsCardProps) {
    return (
        <Card
            className={`shadow-sm border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all hover:border-slate-700 ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
                <div
                    className={`p-2.5 rounded-xl ${iconClassName || "bg-slate-800 text-slate-400"}`}>
                    <Icon className="h-4 w-4" />
                </div>
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${valueClassName || "text-slate-100"}`}>
                    {value}
                </div>
                <p className="text-xs text-slate-500 mt-1">{description}</p>
            </CardContent>
        </Card>
    );
}

export default AdminDashboard;
