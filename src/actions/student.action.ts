'use server'

import { currentUserService } from "@/Services/curentUser.service";
import { StudentFormData, studentService } from "@/Services/student.service";

export async function createStudentProfileAction(studentData: StudentFormData) {
    const response = await studentService.createStudent(studentData);
    return response;
}

export async function updateStudentProfileAction(userId: string, profileData: {name?: string, image?: string, bio?: string}) {
    const response = await studentService.updateStudentProfile(userId, profileData);
    return response;
}

export async function getCurrentUserStudentAction(){
    const response = await currentUserService.getCurrentUserStudent();
    return response;
}