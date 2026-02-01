"use server"

import { sessionService } from "@/Services/session.service"

export async function getSession() {
    const res = await sessionService.getSession();
    return res;
} 