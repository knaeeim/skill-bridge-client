enum UserRole {
    TUTOR = "TUTOR", 
    STUDENT = "STUDENT",
    ADMIN = "ADMIN"
}

enum Status {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED",
    PENDING = "PENDING"
}

enum Subjects {
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
        subjects : Subjects[];
        createdAt: string;
        updatedAt: string;
    }
}