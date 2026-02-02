import { Route } from "@/types";
import { title } from "process";

export const studentRoutes: Route[] = [
    {
        title: "Student Home",
        items: [
            {
                title: "Student Overview",
                url: "/student-dashboard/home"
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
                url: "/student-dashboard/profile"
            }
        ]
    }
]