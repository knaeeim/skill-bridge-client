import { string } from "zod"

export enum UserRole {
    TUTOR = "TUTOR",
    STUDENT = "STUDENT",
    ADMIN = "ADMIN"
}

export enum Status {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED",
    PENDING = "PENDING"
}

export interface Category {
    id: string
    name: string
    description?: string | null
    createdAt?: string
    updatedAt?: string
}

export interface AvailabilitySlot {
    dayOfWeek: string[]; // e.g. ["MONDAY", "TUESDAY"]
    startTime: string;
    endTime: string;
}

export enum Subjects {
    // General
    MATH = "MATH",
    ENGLISH = "ENGLISH",
    SCIENCE = "SCIENCE",

    // Specific Math
    CALCULUS = "CALCULUS",
    ALGEBRA = "ALGEBRA",
    GEOMETRY = "GEOMETRY",

    // Science
    PHYSICS = "PHYSICS",
    CHEMISTRY = "CHEMISTRY",
    BIOLOGY = "BIOLOGY",
    ICT = "ICT",

    // Business
    ACCOUNTING = "ACCOUNTING",
    FINANCE = "FINANCE",
    ECONOMICS = "ECONOMICS",
    MARKETING = "MARKETING",

    // Tech
    PROGRAMMING = "PROGRAMMING",
    WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
    DATA_SCIENCE = "DATA_SCIENCE",

    // Prep
    IELTS = "IELTS",
    ADMISSION_TEST = "ADMISSION_TEST"
}

export interface Tutor {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    role: UserRole;
    phone: string | null;
    status: Status;
    tutorProfile: {
        id: string;
        userId: string;
        bio: string;
        experienceYears: number;
        hourlyRate: number;
        rating: number;
        totalReviews: number;
        isApproved: boolean;
        isFeatured: boolean;
        category: Category[];
        subjects: Subjects[];
        availabilities: AvailabilitySlot[];
        createdAt: string;
        updatedAt: string;
    }
}

export interface TutorFormData {
    name: string;
    email: string;
    password: string;
    image?: string | null;
    role: string;
    phone?: string | null;
    profile: {
        bio: string;
        experienceYears: number;
        hourlyRate: number;
        category: string[];
        subjects: string[];
        availabilities: AvailabilitySlot[];
    }
}