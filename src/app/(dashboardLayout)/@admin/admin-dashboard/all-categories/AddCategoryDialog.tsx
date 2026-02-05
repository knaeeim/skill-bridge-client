"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner"; // Or your toast library
import { createCategoryAction } from "@/actions/admin.action";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { de } from "zod/v4/locales";

const categorySchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string(),
});

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
            ) : (
                "Create Category"
            )}
        </Button>
    );
}

export default function AddCategoryDialog() {
    const [open, setOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
        },
        validators: {
            onSubmit: categorySchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const {name, description} = value;
                const { data, error } = await createCategoryAction(name, description)
                if(error){
                    return toast.error(`Failed to create category: ${error}`);
                }
                toast.success("Category created successfully!");
                setOpen(false);
            } catch (error : unknown) {
                if (error instanceof Error) {
                    toast.error(`Failed to create category: ${error.message}`);
                } else {
                    toast.error("Failed to create category: Unknown error");
                }
            }
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                    <Plus className="h-4 w-4" /> Add Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25 bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Create a new category for tutors. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                        <form.Field
                            name="name"
                            children={(field) => {
                                return (
                                    <Field>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input
                                            name={field.name}
                                            placeholder="Category Name, i.g : IELTS"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-full"
                                        />
                                    </Field>
                                );
                            }}
                        />

                        <form.Field
                            name="description"
                            children={(field) => {
                                return (
                                    <Field>
                                        <FieldLabel>Description</FieldLabel>
                                        <Input
                                            name={field.name}
                                            placeholder="Category Description, i.g : IELTS preparation materials"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-full"
                                        />
                                    </Field>
                                );
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
