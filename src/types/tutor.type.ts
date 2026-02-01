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
    daysOfWeek: string[]; // e.g. ["MONDAY", "TUESDAY"]
    startTime: string;
    endTime: string;
}

export enum Subjects {
    // General
    MATH,
    ENGLISH,
    SCIENCE,

    // Specific Math
    CALCULUS,
    ALGEBRA,
    GEOMETRY,

    // Science
    PHYSICS,
    CHEMISTRY,
    BIOLOGY,
    ICT,

    // Business
    ACCOUNTING,
    FINANCE,
    ECONOMICS,
    MARKETING,

    // Tech
    PROGRAMMING,
    WEB_DEVELOPMENT,
    DATA_SCIENCE,

    // Prep
    IELTS,
    ADMISSION_TEST
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