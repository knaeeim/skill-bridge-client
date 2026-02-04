import React from "react";
import { adminService } from "@/Services/admin.service"; // Import the client component
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import UsersTable from "./UserTable";
import PaginationControls from "@/components/paginationControls";

const AdminAllUsersPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    // Fetch data
    const { page } = await searchParams;
    const usersRes = await adminService.getAllUsers({ page }); // Assuming this returns { data: [...] }
    const users = usersRes?.data.data || [];

    const pagination = usersRes?.data.pagination;

    return (
        <div className="container mx-auto p-6 max-w-7xl space-y-8">
            {/* --- PAGE HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-3">
                        All Users
                        <Badge
                            variant="secondary"
                            className="bg-slate-800 text-slate-300 border-slate-700">
                            {users.length} Total
                        </Badge>
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Manage user accounts, roles, and access statuses.
                    </p>
                </div>
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-10 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-slate-600"
                    />
                </div>
            </div>

            {/* Render Client Table */}
            <UsersTable users={users} />
            <PaginationControls pagination={pagination} />
        </div>
    );
};

export default AdminAllUsersPage;
