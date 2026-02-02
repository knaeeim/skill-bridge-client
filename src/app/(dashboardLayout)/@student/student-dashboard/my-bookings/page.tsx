import { studentService } from '@/Services/student.service';
import React from 'react';

const StudentAllBookings = async() => {

    const allbbokings = await studentService.getStudentBooking();

    console.log(allbbokings);

    return (
        <div>
            <h1>Here Will come all student Bookings....</h1>
        </div>
    );
};

export default StudentAllBookings;