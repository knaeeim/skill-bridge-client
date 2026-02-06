import React from "react";
import { adminService } from "@/Services/admin.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Calendar } from "lucide-react";
import AddCategoryDialog from "./AddCategoryDialog";

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const AdminAllCategoriesPage = async () => {
    // 1. Fetch Data
    const allCategoriesRes = await adminService.getAllCategories();
    // Handle response structure (assuming it returns { data: [...] } or just [...])
    const categories = Array.isArray(allCategoriesRes)
        ? allCategoriesRes
        : allCategoriesRes?.data || [];

    return (
        <div className="container mx-auto p-6 max-w-7xl space-y-8">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-3">
                        Categories
                        <Badge
                            variant="secondary"
                            className="bg-slate-800 text-slate-300 border-slate-700">
                            {categories.length} Total
                        </Badge>
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Manage the subject categories available on the platform.
                    </p>
                </div>

                {/* --- ADD BUTTON (Client Component) --- */}
                <AddCategoryDialog />
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category: any) => (
                    <Card
                        key={category.id}
                        className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all hover:shadow-lg group">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                                    <Layers className="h-5 w-5" />
                                </div>
                            </div>
                            <CardTitle className="mt-4 text-xl font-bold text-slate-100">
                                {category.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-400 line-clamp-2 min-h-[40px]">
                                {category.description || "No description provided."}
                            </p>

                            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-500">
                                <Calendar className="h-3 w-3" />
                                <span>Created: {formatDate(category.createdAt)}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Empty State */}
                {categories.length === 0 && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-xl">
                        <p className="text-slate-500">
                            No categories found. Create one to get started.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAllCategoriesPage;
