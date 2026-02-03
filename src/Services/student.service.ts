import { env } from "@/env";
import { cookies } from "next/headers";

export interface StudentFormData {
    name: string;
    email: string;
    password: string;
    role: string;
    profile: {
        bio?: string;
    }
}

export interface BookingPayload {
    studentId: string;
    tutorId: string;
    subject: string;
    date: string;      // format: "YYYY-MM-DD"
    startTime: string; // "10:00 PM"
    endTime: string;   // "11:00 PM"
    price: number;
}

const API_URL = env.API_URL;

export const studentService = {
    createStudent: async (studentData: StudentFormData) => {
        try {
            const url = new URL(`${API_URL}/user/register`);
            const response = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            })
            const data = await response.json();
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
    getStudentStats: async () => {
        try {
            const url = new URL(`${API_URL}/student/student-profile/stats`);
            const response = await fetch(url.toString(), {
                cache: 'no-store'
            });
            const data = await response.json();
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
    getStudentBooking: async () => {
        try {
            const url = new URL(`${API_URL}/booking/user-bookings`);
            const cookieStore = await cookies();
            const response = await fetch(url.toString(), {
                cache: 'no-store',
                headers: {
                    Cookie: cookieStore.toString()
                }
            })
            const data = await response.json();
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
    updateStudentProfile: async (userId: string, profileData: { name?: string, image?: string, bio?: string }) => {
        try {
            const url = new URL(`${API_URL}/student/update-student-profile/${userId}`);
            const cookieStore = await cookies();
            const response = await fetch(url.toString(), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(profileData)
            })
            const data = await response.json();
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },

    createBooking: async (bookingData: BookingPayload) => {
        try {
            const url = new URL(`${API_URL}/booking/create-booking`);
            const cookieStore = await cookies();
            const response = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(bookingData)
            })
            const data = await response.json();
            console.log(data);
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    }

}