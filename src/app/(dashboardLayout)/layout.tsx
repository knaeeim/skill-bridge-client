import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { sessionService } from "@/Services/session.service";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default async function DashboardLayout({
    admin,
    tutor,
    student,
    children,
}: {
    admin: ReactNode;
    tutor: ReactNode;
    student: ReactNode;
    children: ReactNode;
}) {
    const { data } = await sessionService.getSession();
    const userRole = data?.user.role;

    return (
        <SidebarProvider>
            <AppSidebar userRole={userRole} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Button variant={"outline"}>
                        {" "}
                        <ArrowBigLeft />
                        <Link href={"/"}>Back to Home Page</Link>
                    </Button>

                    <h1 className="text-xl font-bold text-muted-foreground">
                        {userRole === "ADMIN"
                            ? "Admin"
                            : userRole === "TUTOR"
                              ? "Tutor"
                              : "Student"}{" "}
                        Dashboard
                    </h1>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {userRole === "ADMIN" ? admin : userRole === "TUTOR" ? tutor : student}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
