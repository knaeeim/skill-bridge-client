"use client";

import { useEffect, useState } from "react"; // Import useState & useEffect
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    className?: string;
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
        className?: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: { title: string; url: string };
        signup: { title: string; url: string };
    };
}

const Navbar = ({
    logo = {
        url: "/",
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
        alt: "logo",
        title: "Mentora",
    },
    menu = [
        { title: "Home", url: "/" },
        { title: "Tutors", url: "/tutors" },
        { title: "About us", url: "/about-us" },
        { title: "Contact Us", url: "/contact-us" },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
    className,
}: Navbar1Props) => {
    const { data: session } = authClient.useSession();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogOut = async () => {
        await authClient.signOut();
    };

    const dashboardUrlSetter = (role?: string) => {
        switch (role) {
            case "ADMIN":
                return "/admin-dashboard";
            case "TUTOR":
                return "/tutor-dashboard";
            case "STUDENT":
                return "/student-dashboard";
            default:
                return "/dashboard"; // Fallback if role is missing
        }
    };

    const dashboardLink = dashboardUrlSetter((session?.user as any)?.role);
    console.log(dashboardLink);

    return (
        <section
            className={cn("py-4 sticky top-0 z-50 bg-background shadow-sm", className)}
            suppressHydrationWarning={true}>
            <div className="container mx-auto px-4">
                {/* Desktop Menu */}
                <nav className="hidden items-center justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        <Link href={logo.url} className="flex items-center gap-2">
                            <img
                                src={logo.src}
                                className="max-h-8 dark:invert"
                                alt={logo.alt}
                            />
                            <span className="text-lg font-semibold tracking-tighter">
                                {logo.title}
                            </span>
                        </Link>
                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {menu.map((item) => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <ModeToggle />

                        {/* ✅ Only render auth buttons after component mounts on client */}
                        {isMounted && session?.user ? (
                            <>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={dashboardLink}>Go to Dashboard</Link>
                                </Button>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={"/login"} onClick={handleLogOut}>
                                        Logout
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            /* Show Login buttons by default (Server Side Safe) or if no session */
                            <div className={!isMounted ? "invisible" : ""}>
                                {/* ^ Prevents layout shift/flash while checking auth */}
                                <Button asChild variant="outline" size="sm" className="mr-2">
                                    <Link href={auth.login.url}>{auth.login.title}</Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link href={logo.url} className="flex items-center gap-2">
                            <img
                                src={logo.src}
                                className="max-h-8 dark:invert"
                                alt={logo.alt}
                            />
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild id="navbar-dropdown-trigger">
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link
                                            href={logo.url}
                                            className="flex items-center gap-2">
                                            <img
                                                src={logo.src}
                                                className="max-h-8 dark:invert"
                                                alt={logo.alt}
                                            />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4">
                                        {menu.map((item) => renderMobileMenuItem(item))}
                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        {isMounted && session?.user ? (
                                            <>
                                                {/* ✅ FIX 2: Updated Mobile Link to use Dynamic Variable */}
                                                <Button asChild variant="outline">
                                                    <Link href={dashboardLink}>
                                                        Go to Dashboard
                                                    </Link>
                                                </Button>
                                                <Button asChild variant="outline" size="sm">
                                                    <Link
                                                        href={"/login"}
                                                        onClick={handleLogOut}>
                                                        Logout
                                                    </Link>
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button asChild variant="outline">
                                                    <Link href={auth.login.url}>
                                                        {auth.login.title}
                                                    </Link>
                                                </Button>
                                                <Button asChild>
                                                    <Link href={auth.signup.url}>
                                                        {auth.signup.title}
                                                    </Link>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                asChild
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
                <Link href={item.url}>{item.title}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    return (
        <Link key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </Link>
    );
};

export { Navbar };
