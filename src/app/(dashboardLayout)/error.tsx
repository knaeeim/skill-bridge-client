"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home, AlertTriangle } from "lucide-react";

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center border-2 border-dashed rounded-lg bg-muted/20">
            <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
            <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
            <p className="mt-2 text-muted-foreground max-w-sm">
                We encountered an error while loading your dashboard data. Please try
                refreshing this section.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button onClick={() => reset()} variant="default" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Try Again
                </Button>

                <Button asChild variant="outline" className="gap-2">
                    <Link href="/">
                        <Home className="h-4 w-4" />
                        Go back to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
