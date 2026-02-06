import { env } from "@/env";
import { cookies } from "next/headers";


const API_URL = env.API_URL;

export interface reviewData {
    bookingId: string;
    studentId: string;
    tutorId: string;
    rating: number;
    comment?: string;
}

export const reviewService = {
    createReview: async (reviewData : reviewData) => {
        try {
            const url = new URL(`${API_URL}/review/create-review`);
            const cookieStore = await cookies();
            const response = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(reviewData)
            })
            const data = await response.json();
            return { data, error: null };
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    }
}