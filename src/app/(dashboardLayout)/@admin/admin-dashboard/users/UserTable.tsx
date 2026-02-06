"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    MoreHorizontal,
    ShieldAlert,
    CheckCircle2,
    Shield,
    GraduationCap,
    User as UserIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner"; // Import your action
import { updateUserStatusAction } from "@/actions/admin.action";
import { Status } from "@/types";

// --- HELPERS ---
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const getRoleBadge = (role: string) => {
    switch (role) {
        case "ADMIN":
            return (
                <Badge className="bg-rose-500/15 text-rose-400 border-rose-500/20 hover:bg-rose-500/25">
                    <Shield className="w-3 h-3 mr-1" /> Admin
                </Badge>
            );
        case "TUTOR":
            return (
                <Badge className="bg-indigo-500/15 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/25">
                    <GraduationCap className="w-3 h-3 mr-1" /> Tutor
                </Badge>
            );
        default:
            return (
                <Badge className="bg-slate-700/50 text-slate-400 border-slate-700 hover:bg-slate-700">
                    <UserIcon className="w-3 h-3 mr-1" /> Student
                </Badge>
            );
    }
};

export default function UsersTable({ users }: { users: any[] }) {
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleStatusChange = async (userId: string, currentStatus: Status) => {
        const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";

        setLoadingId(userId);
        const res = await updateUserStatusAction(userId, newStatus as any);
        setLoadingId(null);
        if (res) {
            toast.success(
                `User ${newStatus === "ACTIVE" ? "activated" : "banned"} successfully`,
            );
        } else {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="rounded-md border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-950/50">
                    <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="text-slate-400">User</TableHead>
                        <TableHead className="text-slate-400">Role</TableHead>
                        <TableHead className="text-slate-400">Status</TableHead>
                        <TableHead className="text-slate-400">Joined</TableHead>
                        <TableHead className="text-right text-slate-400">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            className="border-slate-800 hover:bg-slate-800/50 transition-colors">
                            {/* User Info */}
                            <TableCell className="flex items-center gap-3">
                                <Avatar className="h-9 w-9 border border-slate-700">
                                    <AvatarImage src={user.image} />
                                    <AvatarFallback className="bg-slate-800 text-slate-300 font-bold">
                                        {user.name?.[0]?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-200">
                                        {user.name}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {user.email}
                                    </span>
                                </div>
                            </TableCell>

                            {/* Role */}
                            <TableCell>{getRoleBadge(user.role)}</TableCell>

                            {/* Status */}
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`
                                    border ${
                                        user.status === "ACTIVE"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                    }
                                `}>
                                    {user.status === "ACTIVE" ? "Active" : "Banned"}
                                </Badge>
                            </TableCell>

                            {/* Date */}
                            <TableCell className="text-slate-400 text-sm">
                                {formatDate(user.createdAt)}
                            </TableCell>

                            {/* Actions */}
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="bg-slate-900 border-slate-800 text-slate-300">
                                        <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
                                        <DropdownMenuItem
                                            className="cursor-pointer focus:bg-slate-800 focus:text-white"
                                            onClick={() =>
                                                navigator.clipboard.writeText(user.id)
                                            }>
                                            Copy User ID
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            disabled={
                                                loadingId === user.id || user.role === "ADMIN"
                                            }
                                            onClick={() =>
                                                handleStatusChange(user.id, user.status)
                                            }
                                            className={`cursor-pointer focus:bg-slate-800 focus:text-white ${
                                                user.status === "ACTIVE"
                                                    ? "text-red-400 focus:text-red-400"
                                                    : "text-emerald-400 focus:text-emerald-400"
                                            }`}>
                                            {loadingId === user.id ? (
                                                "Updating..."
                                            ) : user.status === "ACTIVE" ? (
                                                <>
                                                    <ShieldAlert className="mr-2 h-4 w-4" />{" "}
                                                    Ban User
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
                                                    Activate User
                                                </>
                                            )}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
