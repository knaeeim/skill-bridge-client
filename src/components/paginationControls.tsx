"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Standard Shadcn Button
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
    pagination: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
    };
}

const PaginationControls = ({ pagination }: PaginationProps) => {
    // Default safe values
    const { page: currentPage = 1, totalPages = 1 } = pagination || {};

    const searchParams = useSearchParams();
    const pathName = usePathname();

    // Helper: Generate URL
    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `${pathName}?${params.toString()}`;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* 1. PREVIOUS BUTTON */}
            <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                className={cn(currentPage <= 1 && "opacity-50 pointer-events-none")}
                asChild
            >
                <Link href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}>
                    <ChevronLeft className="h-4 w-4" />
                </Link>
            </Button>

            {/* 2. PAGE NUMBERS LOOP */}
            {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                const isActive = currentPage === pageNumber;

                return (
                    <Button
                        key={pageNumber}
                        variant={isActive ? "default" : "outline"} // Filled if active, outline if not
                        size="icon"
                        asChild>
                        <Link href={createPageURL(pageNumber)}>{pageNumber}</Link>
                    </Button>
                );
            })}

            {/* 3. OPTIONAL: ELLIPSIS (Example logic: show if more than 8 pages) */}
            {/* You can remove this block if you want to show ALL numbers always */}
            {totalPages > 8 && (
                <div className="flex items-center justify-center w-9 h-9">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
            )}

            {/* 4. NEXT BUTTON */}
            <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                className={cn(currentPage >= totalPages && "opacity-50 pointer-events-none")}
                asChild>
                <Link href={currentPage < totalPages ? createPageURL(currentPage + 1) : "#"}>
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>
    );
};

export default PaginationControls;
