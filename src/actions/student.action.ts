'use server'

import { currentUserService } from "@/Services/curentUser.service";
import { reviewData, reviewService } from "@/Services/review.service";
import { BookingPayload, StudentFormData, studentService } from "@/Services/student.service";
import { revalidatePath } from "next/cache";

export async function createStudentProfileAction(studentData: StudentFormData) {
    const response = await studentService.createStudent(studentData);
    return response;
}

export async function updateStudentProfileAction(userId: string, profileData: {name?: string, image?: string, bio?: string}) {
    const response = await studentService.updateStudentProfile(userId, profileData);
    return response;
}

export async function getCurrentUserAction(){
    const response = await currentUserService.getCurrentUser();
    return response;
}

export async function createStudentBookingAction(bookingData: BookingPayload) {
    try {
        const response = await studentService.createBooking(bookingData);
        return response;
    } catch (error : unknown) {
        if(error instanceof Error) {
            return { data: null, error: error.message }
        }
        return { data: null, error: 'An unknown error occurred' }
    }
}

export async function cancelStudentBookingAction(bookingId : string) {
    try {
        const response = await studentService.cancelBooking(bookingId);
        revalidatePath("/student-dashboard/my-bookings");
        return response;
    } catch (error : unknown) {
        if(error instanceof Error) {
            return { data: null, error: error.message }
        }
        return { data: null, error: 'An unknown error occurred' }
    }
}

export async function getStudentBookingAction() {
    try {
        const response = await studentService.getStudentBooking();
        revalidatePath("/student-dashboard/my-bookings");
        return response;
    } catch (error : unknown) {
        if(error instanceof Error) {
            return { data: null, error: error.message }
        }
        return { data: null, error: 'An unknown error occurred' }
    }
}

export async function giveAReview(reviewData : reviewData) {
    try {
        const response = await reviewService.createReview(reviewData);
        revalidatePath("/student-dashboard/my-bookings");
        console.log(response);
        return response;
    } catch (error : unknown) {
        if(error instanceof Error) {
            return { data: null, error: error.message }
        }
        return { data: null, error: 'An unknown error occurred' }
    }
}