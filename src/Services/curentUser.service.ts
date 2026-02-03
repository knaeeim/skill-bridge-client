import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const currentUserService = {
    getCurrentUserStudent: async () => {
        try {
            const url = new URL(`${API_URL}/user/current-user`);
            const cookieStore = await cookies();
            const response = await fetch(url.toString(), {
                cache: 'no-store',
                headers : {
                    Cookie : cookieStore.toString()
                }
            });
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