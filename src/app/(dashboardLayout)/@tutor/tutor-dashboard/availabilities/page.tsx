import { sessionService } from "@/Services/session.service";
import { tutorServices } from "@/Services/tutor.service";// Import the client form
import React from "react";
import AvailabilityForm from "./AvailabilityForm";

const AvailabilitiesUpdatePage = async () => {
    // 1. Fetch Session
    const sessionRes = await sessionService.getSession();
    const userId = sessionRes?.data?.user?.id;

    if (!userId) return <div>Please log in</div>;

    // 2. Fetch Tutor Profile
    const { data } = await tutorServices.getTutorProfile(userId);

    // Extract availabilities (Safety check in case it's empty)
    const existingAvailabilities = data?.data?.availabilities || [];

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Pass the data to the client component */}
            <AvailabilityForm initialData={existingAvailabilities} />
        </div>
    );
};

export default AvailabilitiesUpdatePage;
