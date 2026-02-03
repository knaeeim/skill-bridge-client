import { Route } from "@/types";

export const tutorRoutes : Route[] = [
    {
        title : "DashBoard Home", 
        items : [
            {
                title : "Tutor Home",
                url : "/tutor-dashboard"
            }
        ]
    }, 
    {
        title : "Manage availabilities", 
        items : [
            {
                title : "My Availabilities",
                url : "/tutor-dashboard/availabilities"
            }
        ]
    }, 
    {
        title : "Tutor Profile", 
        items : [
            {
                title : "My Profile",
                url : "/tutor-dashboard/profile"
            }
        ]
    }, 
    {
        title : "Booking", 
        items : [
            {
                title : "My Bookings", 
                url : "/tutor-dashboard/bookings"
            }
        ]
    }
]