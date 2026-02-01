"use server"

import { tutorServices } from "@/Services/tutor.services"

export const getCategories = async () => {
    try {
        const res = await tutorServices.getAllCategories();
        return res.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to fetch categories', error);
        }
        return [];
    }
}