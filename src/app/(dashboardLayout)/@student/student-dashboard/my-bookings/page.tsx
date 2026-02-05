"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
// Added 'Star' icon for reviews
import { CalendarDays, Clock, BookOpen, MoreHorizontal, Video, Star } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cancelStudentBookingAction, getStudentBookingAction } from "@/actions/student.action";
import { Spinner } from "@/components/ui/spinner";
import ReviewModal from "./ReviewModal";

// ... (Interfaces remain the same)
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
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    tutor: UserProfile;
    student: UserProfile;
}

const StudentAllBookings = () => {
    const [bookings, setBooking] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchingBookingData = async () => {
        const response = await getStudentBookingAction();
        setBooking(response.data?.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchingBookingData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner className="size-5"></Spinner>
            </div>
        );
    }

    const handleBookingCancel = async (bookingId: string) => {
        const toastId = toast.loading("Cancelling your booking...");
        try {
            const { data, error } = await cancelStudentBookingAction(bookingId);
            if (error) {
                return toast.error(`Failed to cancel booking: ${error}`, { id: toastId });
            }
            // Optimistic update or refetch
            fetchingBookingData();
            toast.success("Booking cancelled successfully!", { id: toastId });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return toast.error(`Failed to cancel booking: ${error.message}`, {
                    id: toastId,
                });
            }
            return toast.error("An unknown error occurred", { id: toastId });
        }
    };

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
                                        <TableHead className="w-62.5">Tutor</TableHead>
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
                                            {/* Tutor Column */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border">
                                                        <AvatarImage
                                                            className="object-cover object-top"
                                                            src={booking.tutor.image || ""}
                                                            alt={booking.tutor.name}
                                                        />
                                                        <AvatarFallback className="bg-primary/15 text-primary font-bold">
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

                                            {/* --- ACTIONS MENU --- */}
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
                                                        {booking.status === "CANCELLED" && (
                                                            <>
                                                                <DropdownMenuItem>
                                                                    No Action is Available
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}

                                                        {/* JOIN MEETING: Only if Confirmed */}
                                                        {booking.status === "CONFIRMED" && (
                                                            <DropdownMenuItem className="text-blue-600 focus:text-blue-600">
                                                                <Video className="mr-2 h-4 w-4" />{" "}
                                                                Join Meeting
                                                            </DropdownMenuItem>
                                                        )}

                                                        {/* LEAVE REVIEW: Only if Completed */}
                                                        {booking.status === "COMPLETED" && (
                                                            <ReviewModal
                                                                booking={
                                                                    booking
                                                                }></ReviewModal>
                                                        )}
                                                        {/* CANCEL: Only if NOT Completed AND NOT Cancelled */}
                                                        {booking.status !== "COMPLETED" &&
                                                            booking.status !== "CANCELLED" && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleBookingCancel(
                                                                            booking.id,
                                                                        )
                                                                    }
                                                                    className="text-red-600 focus:text-red-600">
                                                                    Cancel Booking
                                                                </DropdownMenuItem>
                                                            )}
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
