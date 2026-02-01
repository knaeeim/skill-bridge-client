'use server'

import { StudentFormData, studentService } from "@/Services/student.service";

export async function createStudentProfileAction(studentData: StudentFormData) {
    const response = await studentService.createStudent(studentData);
    return response;
}