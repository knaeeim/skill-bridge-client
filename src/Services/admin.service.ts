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
                console.error("Error fetching stats:", error.message);
            } else {
                console.error("An unknown error occurred while fetching stats.");
            }
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
                console.error("Error fetching all bookings:", error.message);
            } else {
                console.error("An unknown error occurred while fetching all bookings.");
            }
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
                console.error("Error fetching all users:", error.message);
            } else {
                console.error("An unknown error occurred while fetching all users.");
            }
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
                console.error("Error updating user status:", error.message);
            } else {
                console.error("An unknown error occurred while updating user status.");
            }
        }
    }
}