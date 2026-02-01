import { env } from "@/env";

export interface StudentFormData {
    name: string;
    email: string;
    password: string;
    role: string;
    profile: {
        bio?: string;
    }
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
    }
}