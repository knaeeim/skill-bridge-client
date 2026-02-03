"use server"

import { GetTutorsParams, ServiceOptions, tutorServices } from "@/Services/tutor.service";
import { TutorFormData } from "@/types";

export async function createTutorProfile(TutorData: TutorFormData) {
    const response = await tutorServices.createTutorProfile(TutorData);
    return response
}

export async function getAllTutors(params?: GetTutorsParams, option?: ServiceOptions) {
    const response = await tutorServices.getAllTutors(params, option);
    return response;
}

export async function getTutorDetails(tutorId: string) {
    try {
        const response = await tutorServices.getTutorProfile(tutorId);
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { data: null, error: error.message }
        }
        return { data: null, error: 'An unknown error occurred' }
    }
}