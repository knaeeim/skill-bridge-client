import { Route } from "@/types";

export const studentRoutes: Route[] = [
    {
        title: "Student Overview",
        items: [
            {
                title: "Student Home",
                url: "/student-dashboard"
            }
        ]
    },
    {
        title: "Bookings Management",
        items: [
            {
                title: "My Bookings",
                url: "/student-dashboard/my-bookings"
            }
        ]
    },
    {
        title: "Student Profile",
        items: [
            {
                title: "My Profile",
                url: "/student-dashboard/my-profile"
            }
        ]
    }
]