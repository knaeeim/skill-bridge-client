"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Ideally import this from your components/ui folder for consistent styling
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { giveAReview } from "@/actions/student.action";

// Helper to render stars
function StarRating({
    rating,
    setRating,
}: {
    rating: number;
    setRating: (r: number) => void;
}) {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className="focus:outline-none transition-transform hover:scale-110"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}>
                    <Star
                        className={`h-8 w-8 ${
                            star <= (hover || rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300 fill-transparent"
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}

interface ReviewModalProps {
    booking: any;
    children?: React.ReactNode;
}

export default function ReviewModal({ booking, children }: ReviewModalProps) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log(booking);

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please select a star rating");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                bookingId: booking.id,
                studentId: booking.studentId,
                tutorId: booking.tutor.tutorProfile.id,
                rating: rating,
                comment: comment,
            };

            const res = await giveAReview(payload);
            console.log(res);
            if (res) {
                toast.success("Review submitted successfully!");
                setOpen(false);
                setRating(0);
                setComment("");
            } else {
                toast.error("Failed to submit review");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* FIX 1: Removed onClick={handleSubmit}. We want to OPEN here, not submit.
                   FIX 2: Added onSelect={(e) => e.preventDefault()}. This stops the dropdown 
                          from closing immediately, allowing the Dialog to open correctly.
                */}
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-amber-600 focus:text-amber-600 cursor-pointer w-full flex items-center">
                    <Star className="mr-2 h-4 w-4" /> Leave a Review
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rate your session</DialogTitle>
                    <DialogDescription>
                        How was your experience with <strong>{booking.tutor?.name}</strong>?
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Tutor Info Preview */}
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border">
                        <Avatar>
                            <AvatarImage src={booking.tutor?.image} />
                            <AvatarFallback>{booking.tutor?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">{booking.subject}</p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(booking.date).toDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Star Rating Input */}
                    <div className="flex flex-col items-center gap-2">
                        <Label>Tap to Rate</Label>
                        <StarRating rating={rating} setRating={setRating} />
                        <p className="text-sm font-medium text-amber-600 h-5">
                            {rating > 0
                                ? ["Poor", "Fair", "Good", "Very Good", "Excellent"][
                                      rating - 1
                                  ]
                                : ""}
                        </p>
                    </div>

                    {/* Comment Input */}
                    <div className="grid gap-2">
                        <Label htmlFor="comment">Your Feedback</Label>
                        <Textarea
                            id="comment"
                            placeholder="Write a few words about your learning experience..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                </div>

                <DialogFooter>
                    {/* Submit happens HERE, not on the trigger */}
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                            </>
                        ) : (
                            "Submit Review"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
