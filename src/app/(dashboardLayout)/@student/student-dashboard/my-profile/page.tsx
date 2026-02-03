"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { User, Mail, Pencil, Save, X, ImageIcon, Loader2 } from "lucide-react";
import {
    getCurrentUserStudentAction,
    updateStudentProfileAction,
} from "@/actions/student.action";


const StudentProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // User Data State
    const [user, setUser] = useState<any>(null);

    // Form Data State
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        bio: "",
    });

    // 1. Fetch User Data
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await getCurrentUserStudentAction();
            // আপনার রেসপন্স স্ট্রাকচার { data: { success: true, data: user } }
            if (res.data?.success) {
                const userData = res.data.data;
                setUser(userData);

                // ফর্ম ডাটা সেট করা
                setFormData({
                    name: userData.name || "",
                    image: userData.image || "",
                    bio: userData.studentProfile?.bio || "",
                });
            } else {
                toast.error("Failed to load user data");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error while loading profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // 2. Handle Input Change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ---------------------------------------------------------
    // 3. Handle Save (UPDATED for your Service Implementation)
    // ---------------------------------------------------------
    const handleSave = async () => {
        if (!user?.id) return; // আইডি না থাকলে রিটার্ন

        try {
            setSaving(true);

            const payload: { name?: string; image?: string; bio?: string } = {};

            if (formData.name && formData.name.trim() !== "") {
                payload.name = formData.name;
            }

            if (formData.image && formData.image.trim() !== "") {
                payload.image = formData.image;
            }

            if (formData.bio && formData.bio.trim() !== "") {
                payload.bio = formData.bio;
            }

            if(Object.keys(payload).length === 0){
                toast.info("No changes to save.");
                setSaving(false);
                return;
            }

            // আপনার সার্ভিস ফাংশন কল করা হচ্ছে (userId, data)
            const result = await updateStudentProfileAction(user.id, payload);
            
            console.log(result);
            // আপনার সার্ভিস { data, error } রিটার্ন করে, তাই error চেক করছি
            if (result.error) {
                toast.error(result.error);
                return;
            }

            // সাকসেস হলে
            if (result.data?.success) {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
                fetchProfile(); // ডাটা রিফ্রেশ
            } else {
                toast.error("Failed to update profile.");
            }
        } catch (error: any) {
            toast.error("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    // 4. Cancel Edit
    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            name: user?.name || "",
            image: user?.image || "",
            bio: user?.studentProfile?.bio || "",
        });
    };

    if (loading) return <ProfileSkeleton />;
    if (!user) return <div className="p-8 text-center">User not found.</div>;

    return (
        <div className="container mx-auto p-4 max-w-4xl space-y-8">
            <Card className="overflow-hidden border-none shadow-lg">
                {/* --- HEADER BACKGROUND --- */}
                <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600 relative">
                    <div className="absolute -bottom-16 left-8">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-md bg-white">
                            <AvatarImage className="object-cover object-top" src={isEditing ? formData.image : user.image} />
                            <AvatarFallback className="text-4xl">
                                {user.name?.[0]?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <CardHeader className="pt-20 px-8 flex flex-row justify-between items-start">
                    <div>
                        {!isEditing ? (
                            <>
                                <h1 className="text-3xl font-bold flex items-center gap-2">
                                    {user.name}
                                    <Badge variant="secondary" className="text-xs">
                                        {user.role}
                                    </Badge>
                                </h1>
                                <div className="text-muted-foreground flex items-center gap-2 mt-1">
                                    <Mail className="h-4 w-4" /> {user.email}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-1">
                                <h1 className="text-2xl font-bold">Edit Profile</h1>
                                <p className="text-sm text-muted-foreground">
                                    Update your personal information
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div>
                        {!isEditing ? (
                            <Button
                                onClick={() => setIsEditing(true)}
                                variant="outline"
                                className="gap-2">
                                <Pencil className="h-4 w-4" /> Edit Profile
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={handleCancel}
                                    disabled={saving}>
                                    <X className="h-4 w-4 mr-1" /> Cancel
                                </Button>
                                <Button onClick={handleSave} disabled={saving}>
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" /> Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="px-8 pb-8 pt-4">
                    {!isEditing ? (
                        /* --- VIEW MODE --- */
                        <div className="space-y-6 mt-4">
                            <div className="bg-muted/30 p-6 rounded-lg border">
                                <h3 className="font-semibold text-lg mb-2">About Me</h3>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {user.studentProfile?.bio || "No bio added yet."}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 border rounded-md">
                                    <span className="text-xs text-muted-foreground uppercase font-bold">
                                        Account Status
                                    </span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div
                                            className={`h-2 w-2 rounded-full ${user.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}`}
                                        />
                                        <span className="font-medium">{user.status}</span>
                                    </div>
                                </div>
                                <div className="p-4 border rounded-md">
                                    <span className="text-xs text-muted-foreground uppercase font-bold">
                                        Joined On
                                    </span>
                                    <p className="font-medium mt-1">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* --- EDIT MODE --- */
                        <div className="space-y-6 mt-2 max-w-2xl">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Profile Image URL</Label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="image"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="resize-none"
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

const ProfileSkeleton = () => (
    <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="h-32 bg-muted rounded-t-xl w-full" />
        <div className="px-8 -mt-16 space-y-4">
            <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-32 w-full rounded-lg" />
        </div>
    </div>
);

export default StudentProfilePage;
