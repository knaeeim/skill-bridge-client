"use server"

import { tutorServices } from "@/Services/tutor.service";
import { TutorFormData } from "@/types";

export async function createTutorProfile(TutorData : TutorFormData) {
    const response = await tutorServices.createTutorProfile(TutorData);
    return response
}