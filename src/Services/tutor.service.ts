import { env } from "@/env";
import { AvailabilitySlot, TutorFormData } from "@/types";
import { cookies } from "next/headers";
import { sessionService } from "./session.service";

export interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export interface GetTutorsParams {
    subject?: string;
    experienceYears?: number;
    hourlyRate?: number
    setOrder?: string;
    page?: string;
    limit?: string;
    isFeatured?: string;
    isApproved?: string;
}

export interface TutorUpdateData {
    name?: string;
    image?: string;
    bio?: string;
    hourlyRate?: number;
}

const API_URL = env.API_URL;

export const tutorServices = {
    getAllTutors: async (params?: GetTutorsParams, option?: ServiceOptions) => {
        try {
            const url = new URL(`${API_URL}/tutor/all-tutors`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value)
                    }
                })
            }

            const config: RequestInit = {};

            if (option?.cache) {
                config.cache = option.cache;
            }

            if (option?.revalidate) {
                config.next = {
                    revalidate: option.revalidate
                }
            }

            config.next = {
                ...config.next,
                tags: ['tutors']
            }

            const response = await fetch(url.toString(), config);
            const data = await response.json();

            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
    getAllCategories: async () => {
        try {
            const url = new URL(`${API_URL}/admin/all-categories`);
            const response = await fetch(url.toString());
            const data = await response.json();
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
    createTutorProfile: async (tutorData: TutorFormData) => {
        try {
            const url = new URL(`${API_URL}/user/register`);
            const response = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tutorData)
            })
            const data = await response.json();
            console.log(data);
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return {
                data: null, error: 'An unknown error occurred'
            }
        }
    },
    getTutorProfile: async (tutorId: string) => {
        try {
            const url = new URL(`${API_URL}/tutor/profile/${tutorId}`);
            const response = await fetch(url.toString(), {
                cache: 'no-store'
            });
            const data = await response.json();
            // console.log(data);
            return { data: data, error: null };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('An unknown error occurred');
        }
    },

    getTutorStats: async () => {
        try {
            const url = new URL(`${API_URL}/tutor/tutor-stats`);
            const cookieStore = await cookies();
            const response = await fetch(url.toString(), {
                cache: "no-store",
                headers: {
                    Cookie: cookieStore.toString()
                }
            })
            const data = await response.json();
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
    updateTutorProfile: async (tutorData: TutorUpdateData) => {
        try {
            const url = new URL(`${API_URL}/tutor/update-tutor-profile`);
            const cookieStore = await cookies();
            const response = await fetch(url.toString(), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(tutorData)
            })
            const data = await response.json();
            console.log(data);
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
    updateTutorAvailability: async (availabilities: AvailabilitySlot[]) => {
        try {
            const url = new URL(`${API_URL}/tutor/update-tutor-availability`);
            const cookieStore = await cookies();
            const response = await fetch(url.toString(), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(availabilities)
            })
            const data = await response.json();
            console.log(data);
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
    getTutorBooking: async () => {
        try {
            const url = new URL(`${API_URL}/booking/user-bookings`);
            const cookieStore = await cookies();
            const response = await fetch(url.toString(), {
                cache: 'no-store',
                headers: {
                    Cookie: cookieStore.toString()
                }
            })
            const data = await response.json();
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: error.message }
            }
            return { data: null, error: 'An unknown error occurred' }
        }
    },
}