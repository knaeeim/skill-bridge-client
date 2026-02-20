"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";

export default function CommonError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <h1 className="text-6xl font-extrabold text-muted/30 mb-4">OPS!</h1>
            <h2 className="text-3xl font-bold">Unexpected Error</h2>
            <p className="mt-4 text-muted-foreground">
                An error occurred on this page. Our team has been notified.
            </p>

            <div className="mt-10 flex gap-4">
                <Button onClick={() => reset()} size="lg" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </Button>

                <Button asChild variant="ghost" size="lg" className="gap-2">
                    <Link href="/">
                        <Home className="h-4 w-4" />
                        Go back to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
