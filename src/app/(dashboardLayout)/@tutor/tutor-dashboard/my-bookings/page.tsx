"use client";
import React, { useEffect, useState } from "react";
import { tutorServices } from "@/Services/tutor.service";
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
import {
    CalendarDays,
    Clock,
    BookOpen,
    MoreHorizontal,
    Check,
    X,
    User,
    Banknote,
    DeleteIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getTutorBookingAction, markAsCompleted } from "@/actions/tutor.action";
import { Spinner } from "@/components/ui/spinner";
import { cancelStudentBookingAction } from "@/actions/student.action";

// 1. Type Definitions matching your JSON
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
    student: UserProfile; // We need Student info for Tutor View
}

const TutorsBookingPage = () => {
    const [bookings, setBooking] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // 2. Fetch Data

    const fetchingBookingData = async () => {
        const response = await getTutorBookingAction();
        console.log(response);
        setBooking(response.data?.data);
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

    const handleMarkAsCompleted = async (bookingId: string) => {
        const toastId = toast.loading("Marking booking as completed...");
        try {
            const { data, error } = await markAsCompleted(bookingId);
            if (error) {
                return toast.error(`Failed to mark booking as completed: ${error}`, {
                    id: toastId,
                });
            }
            fetchingBookingData();
            toast.success("Booking marked as completed successfully!", { id: toastId });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return toast.error(`Failed to mark booking as completed: ${error.message}`, {
                    id: toastId,
                });
            }
            return toast.error("An unknown error occurred", { id: toastId });
        }
    };

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
                    <h1 className="text-3xl font-bold tracking-tight">Booking Requests</h1>
                    <p className="text-muted-foreground">
                        Manage incoming requests and scheduled classes.
                    </p>
                </div>
                <Badge variant="secondary" className="px-4 py-1 text-sm">
                    Total: {bookings.length}
                </Badge>
            </div>

            <Card className="shadow-sm border-none bg-card/50">
                <CardContent className="p-0">
                    {bookings.length > 0 ? (
                        <div className="rounded-md border bg-background">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="w-75">Student</TableHead>
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
                                            {/* Student Column */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border">
                                                        <AvatarImage
                                                            className="object-cover object-top"
                                                            src={booking.student?.image || ""}
                                                            alt={booking.student?.name}
                                                        />
                                                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">
                                                            {booking.student?.name?.[0] || "S"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-sm">
                                                            {booking.student?.name ||
                                                                "Unknown"}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {booking.student?.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Subject Column */}
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-orange-50 p-1.5 rounded text-orange-600">
                                                        <BookOpen className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-medium capitalize text-sm">
                                                        {booking.subject
                                                            ?.replace(/_/g, " ")
                                                            .toLowerCase()}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Schedule Column */}
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span>
                                                            {booking.date
                                                                ? format(
                                                                      new Date(booking.date),
                                                                      "EEE, dd MMM yyyy",
                                                                  )
                                                                : "N/A"}
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
                                                <div className="flex items-center gap-1 font-mono font-medium text-sm">
                                                    <span>
                                                        ৳{booking.price?.toLocaleString()}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Status Badge */}
                                            <TableCell>
                                                {getStatusBadge(booking.status)}
                                            </TableCell>

                                            {/* Actions Menu */}
                                            <TableCell className="text-right">
                                                {booking.status === "COMPLETED" || booking.status === "CANCELLED" ? (
                                                    <>
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
                                                                    <User className="mr-2 h-4 w-4" />{" "}
                                                                    No actions available
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </>
                                                ) : (
                                                    <>
                                                        {booking.status === "CONFIRMED" && (
                                                            <>
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger
                                                                        asChild>
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
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleMarkAsCompleted(
                                                                                    booking.id,
                                                                                )
                                                                            }>
                                                                            <User className="mr-2 h-4 w-4" />{" "}
                                                                            Mark as Completed
                                                                        </DropdownMenuItem>

                                                                        {booking.status ===
                                                                            "CONFIRMED" && (
                                                                            <DropdownMenuItem
                                                                                onClick={() =>
                                                                                    handleBookingCancel(
                                                                                        booking.id,
                                                                                    )
                                                                                }
                                                                                className="text-red-600 focus:text-red-600">
                                                                                <X className="mr-2 h-4 w-4" />{" "}
                                                                                Cancel Class
                                                                            </DropdownMenuItem>
                                                                        )}
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        // Empty State
                        <div className="flex flex-col items-center justify-center py-16 text-center border rounded-md bg-background">
                            <div className="bg-muted/50 p-4 rounded-full mb-4">
                                <CalendarDays className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold">No booking requests</h3>
                            <p className="text-muted-foreground max-w-sm mt-2">
                                You don't have any upcoming classes or pending requests from
                                students yet.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default TutorsBookingPage;
