import { authClient } from "@/lib/auth-client"

export const sessionService = {
    getSession: async () => {
        const response = await authClient.getSession(); 
        return response
    }
}