import { Navbar } from "@/components/layout/Navbar";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default CommonLayout;
