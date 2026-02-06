import React from "react";
import { adminService } from "@/Services/admin.service";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Copy, MoreHorizontal, Search, CreditCard } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

// --- Helper Functions ---
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 0,
    }).format(amount);
};

// Updated Colors for Dark Theme
const getStatusColor = (status: string) => {
    switch (status) {
        case "CONFIRMED":
            return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20";
        case "PENDING":
            return "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20";
        case "CANCELLED":
            return "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20";
        default:
            return "bg-slate-800 text-slate-400 border-slate-700";
    }
};

const AdminAllBookingPage = async () => {
    const bookingsRes = await adminService.getAllBookingsAdmin();
    const bookings = bookingsRes?.data || [];

    return (
        <div className="container mx-auto p-6 max-w-7xl space-y-8">
            {/* --- PAGE HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100">
                        All Bookings
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Manage and monitor all tuition sessions.
                    </p>
                </div>
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                        type="search"
                        placeholder="Search by ID or Subject..."
                        className="pl-10 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-slate-600"
                    />
                </div>
            </div>

            {/* --- BOOKINGS TABLE CARD --- */}
            <Card className="border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
                <CardHeader className="border-b border-slate-800 bg-slate-900/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-semibold text-slate-200">
                                Booking History
                            </CardTitle>
                            <CardDescription className="text-slate-500">
                                A list of all recent bookings on the platform.
                            </CardDescription>
                        </div>
                        <Badge
                            variant="secondary"
                            className="bg-slate-800 text-slate-300 border-slate-700">
                            Total: {bookings.length}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-950/50">
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="w-[200px] text-slate-400 font-medium">
                                    Date & Time
                                </TableHead>
                                <TableHead className="text-slate-400 font-medium">
                                    Subject
                                </TableHead>
                                <TableHead className="text-slate-400 font-medium">
                                    Tutor ID
                                </TableHead>
                                <TableHead className="text-slate-400 font-medium">
                                    Student ID
                                </TableHead>
                                <TableHead className="text-slate-400 font-medium">
                                    Amount
                                </TableHead>
                                <TableHead className="text-slate-400 font-medium">
                                    Status
                                </TableHead>
                                <TableHead className="text-right text-slate-400 font-medium">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.length > 0 ? (
                                bookings.map((booking: any) => (
                                    <TableRow
                                        key={booking.id}
                                        className="border-slate-800 hover:bg-slate-800/50 transition-colors group">
                                        {/* Date & Time */}
                                        <TableCell>
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                                                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                                                    {formatDate(booking.date)}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Clock className="h-3.5 w-3.5 text-slate-600" />
                                                    {booking.startTime} - {booking.endTime}
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Subject */}
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="font-medium text-xs bg-slate-950/50 text-slate-300 border-slate-700 py-1">
                                                {booking.subject}
                                            </Badge>
                                        </TableCell>

                                        {/* Tutor ID */}
                                        <TableCell>
                                            <div className="flex items-center gap-2 group/copy">
                                                <span className="font-mono text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                                    {booking.tutorId.slice(0, 8)}...
                                                </span>
                                                <Copy className="h-3 w-3 text-slate-600 cursor-pointer hover:text-slate-300 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                                            </div>
                                        </TableCell>

                                        {/* Student ID */}
                                        <TableCell>
                                            <div className="flex items-center gap-2 group/copy">
                                                <span className="font-mono text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                                    {booking.studentId.slice(0, 8)}...
                                                </span>
                                                <Copy className="h-3 w-3 text-slate-600 cursor-pointer hover:text-slate-300 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                                            </div>
                                        </TableCell>

                                        {/* Price */}
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                                                <CreditCard className="h-3.5 w-3.5 text-slate-500" />
                                                {formatCurrency(booking.price)}
                                            </div>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Badge
                                                className={`font-semibold border text-[11px] px-2.5 py-0.5 ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </Badge>
                                        </TableCell>

                                        {/* Actions Menu */}
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800">
                                                        <span className="sr-only">
                                                            Open menu
                                                        </span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="bg-slate-900 border-slate-800 text-slate-300">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                                        Copy Booking ID
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-32 text-center text-slate-500 bg-slate-900/50">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Search className="h-8 w-8 opacity-20" />
                                            <p>No bookings found.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminAllBookingPage;
