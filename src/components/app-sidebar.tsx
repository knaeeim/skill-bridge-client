import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Route } from "@/types";
import { Roles } from "@/proxy";
import { adminRoutes } from "@/routes/adminRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { studentRoutes } from "@/routes/studentRoutes";

// This is sample data.
const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Getting Started",
            url: "#",
            items: [
                {
                    title: "Installation",
                    url: "#",
                },
                {
                    title: "Project Structure",
                    url: "#",
                },
            ],
        },
    ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    userRole: "ADMIN" | "TUTOR" | "STUDENT";
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
    let routes: Route[] = [];

    switch (userRole) {
        case Roles.admin:
            routes = adminRoutes;
            break;
        case Roles.tutor:
            routes = tutorRoutes;
            break;
        case Roles.student:
            routes = studentRoutes;
            break;
        default:
            routes = [];
            break;
    }

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <h1 className="text-lg m-3 font-bold text-muted-foreground">
                    {userRole === Roles.admin
                        ? "Admin"
                        : userRole === Roles.tutor
                          ? "Tutor"
                          : "Student"}{" "}
                    Dashboard
                </h1>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>{item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
