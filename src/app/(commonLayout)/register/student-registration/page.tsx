import { StudentSignupForm } from "@/components/student-signup-form";

const StudentRegistrationPage = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="max-w-3xl w-full">
                <StudentSignupForm/>
            </div>
        </div>
    );
};

export default StudentRegistrationPage;
