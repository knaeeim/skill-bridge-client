import { env } from "@/env";
import { Status } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface AllUserAdminParams {
    page?: string;
    limit?: string;
}

export const adminService = {
    getAllStats: async () => {
        try {
            const url = new URL(`${API_URL}/admin/stats`)
            const cookiesStore = await cookies()
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiesStore.toString()
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },

    getAllBookingsAdmin: async () => {
        try {
            const url = new URL(`${API_URL}/admin/all-bookings`)
            const cookiesStore = await cookies()
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiesStore.toString()
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch all bookings: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },

    getAllUsers: async (params?: AllUserAdminParams) => {
        try {
            const url = new URL(`${API_URL}/admin/all-users`)

            if(params){
                Object.entries(params).forEach(([key, value]) => {
                    if(value !== undefined && value !== null && value !== ""){
                        url.searchParams.append(key, value)
                    }
                })
            }
            const cookiesStore = await cookies()
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiesStore.toString()
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch all users: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
    updateUserStatus: async (userId: string, newStatus: Status) => {
        try {
            const url = new URL(`${API_URL}/admin/manage-user/${userId}`)
            const cookiesStore = await cookies()
            const response = await fetch(url.toString(), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiesStore.toString()
                },
                body: JSON.stringify({ status: newStatus })
            })

            if (!response.ok) {
                throw new Error(`Failed to update user status: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            revalidatePath("/admin-dashboard/users");
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    }, 

    createCategory : async (name : string, description? : string) => {
        try {
            const url = new URL(`${API_URL}/admin/create-category`)
            const cookiesStore = await cookies()
            const response = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiesStore.toString()
                },
                body: JSON.stringify({ name, description })
            })

            if (!response.ok) {
                throw new Error(`Failed to create category: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            revalidatePath("/admin-dashboard/all-categories");
            return data;
        } catch (error : unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    }, 
    getAllCategories : async () => {
        try {
            const url = new URL(`${API_URL}/admin/all-categories`)
            const cookiesStore = await cookies()
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiesStore.toString()
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch all categories: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error : unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    }
}