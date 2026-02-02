import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const sessionService = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();
            const session = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: 'no-store'
            });
            if (session === null) {
                return { data: null, error: 'No session found' }
            }
            const response = await session.json();
            return { data: response, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return {
                data: null, error: 'An unknown error occurred'
            }
        }
    }
}