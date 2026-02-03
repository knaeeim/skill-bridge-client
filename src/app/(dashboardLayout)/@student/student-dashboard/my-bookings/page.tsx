import React from "react";
import { studentService } from "@/Services/student.service";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarDays, Clock, BookOpen, MoreHorizontal, Video } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 1. Updated Type Definitions based on your JSON
interface UserProfile {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string;
    status: string;
}

interface Booking {
    id: string;
    studentId: string;
    tutorId: string;
    subject: string;
    date: string; // "2026-02-04T00:00:00.000Z"
    startTime: string; // "5:30 PM"
    endTime: string; // "6:30 PM"
    price: number;
    status: string; // "CONFIRMED"
    createdAt: string;
    updatedAt: string;
    tutor: UserProfile; // Nested Tutor Object
    student: UserProfile;
}

const StudentAllBookings = async () => {
    // 2. Fetch Data
    const response = await studentService.getStudentBooking();

    // Extract data safely based on your JSON structure: { data: { success: true, data: [...] } }
    const bookings: Booking[] = response.data?.data || [];

    // 3. Status Badge Helper
    const getStatusBadge = (status: string) => {
        const normalizedStatus = status.toUpperCase();
        switch (normalizedStatus) {
            case "CONFIRMED":
                return (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                        Confirmed
                    </Badge>
                );
            case "PENDING":
                return (
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">
                        Pending
                    </Badge>
                );
            case "CANCELLED":
                return (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
                        Cancelled
                    </Badge>
                );
            case "COMPLETED":
                return <Badge variant="secondary">Completed</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
                    <p className="text-muted-foreground">
                        Manage your upcoming and past tuition sessions.
                    </p>
                </div>
                <Badge variant="secondary" className="px-4 py-1 text-sm">
                    Total Sessions: {bookings.length}
                </Badge>
            </div>

            <Card className="shadow-sm border-none bg-card/50">
                <CardContent className="p-0">
                    {bookings.length > 0 ? (
                        <div className="rounded-md border bg-background">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="w-[250px]">Tutor</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <TableRow
                                            key={booking.id}
                                            className="hover:bg-muted/5">
                                            {/* Tutor Column (Avatar + Name) */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border">
                                                        <AvatarImage
                                                            src={booking.tutor.image || ""}
                                                            alt={booking.tutor.name}
                                                        />
                                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                                            {booking.tutor.name[0]}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-sm">
                                                            {booking.tutor.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {booking.tutor.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Subject */}
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-blue-50 p-1.5 rounded text-blue-600">
                                                        <BookOpen className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-medium capitalize text-sm">
                                                        {booking.subject.toLowerCase()}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Schedule */}
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span>
                                                            {format(
                                                                new Date(booking.date),
                                                                "EEE, dd MMM yyyy",
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        <span>
                                                            {booking.startTime} -{" "}
                                                            {booking.endTime}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Price */}
                                            <TableCell>
                                                <span className="font-mono font-medium">
                                                    ৳{booking.price.toLocaleString()}
                                                </span>
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                {getStatusBadge(booking.status)}
                                            </TableCell>

                                            {/* Actions Menu */}
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0">
                                                            <span className="sr-only">
                                                                Open menu
                                                            </span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            View Details
                                                        </DropdownMenuItem>
                                                        {booking.status === "CONFIRMED" && (
                                                            <DropdownMenuItem className="text-blue-600">
                                                                <Video className="mr-2 h-4 w-4" />{" "}
                                                                Join Meeting
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                            Cancel Booking
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center border rounded-md bg-background">
                            <div className="bg-muted/50 p-4 rounded-full mb-4">
                                <BookOpen className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold">No bookings found</h3>
                            <p className="text-muted-foreground max-w-sm mt-2">
                                You haven't booked any tuition sessions yet. Find a tutor to
                                get started.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentAllBookings;
