'use server'

import { currentUserService } from "@/Services/curentUser.service";
import { BookingPayload, StudentFormData, studentService } from "@/Services/student.service";

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