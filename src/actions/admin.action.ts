"use server";

import { adminService } from "@/Services/admin.service";
import { Status } from "@/types";

export const updateUserStatusAction = async (userId: string, newStatus: Status) => {
    try {
        const response = await adminService.updateUserStatus(userId, newStatus)
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error updating user status:", error.message);
        } else {
            console.error("An unknown error occurred while updating user status.");
        }
    }
}

export async function createCategoryAction(name: string, description?: string) {
    try {
        const response = await adminService.createCategory(name, description);
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { data: null, error: error.message }
        }
        return { data: null, error: 'An unknown error occurred' }
    }
}