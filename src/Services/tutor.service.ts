import { env } from "@/env";
import { TutorFormData } from "@/types";
import { cx } from "class-variance-authority";

export interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export interface GetTutorsParams {
    subject?: string;
    experienceYears?: number;
    hourlyRate?: number
    setOrder?: string;
    page?: number;
    limit?: number;
    isFeatured?: string;
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
    }
}