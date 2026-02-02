import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Ban/Unban Users",
                url: "/admin-dashboard/users"
            },
        ]
    },
    {
        title: "Booking Management",
        items: [
            {
                title: "All Bookings",
                url: "/admin-dashboard/all-bookings"
            }
        ]
    },
    {
        title: "Manage Category",
        items: [
            {
                title: "All Categories",
                url: "/admin-dashboard/categories"
            }
        ]
    }
]