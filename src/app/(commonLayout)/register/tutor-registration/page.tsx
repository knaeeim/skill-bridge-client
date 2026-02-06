import { TutorSignupForm } from "@/components/tutor-signup-form";

const TutorRegistrationPage = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="max-w-3xl w-full">
                <TutorSignupForm />
            </div>
        </div>
    );
};

export default TutorRegistrationPage;
