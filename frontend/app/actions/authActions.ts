"use server"

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";


export async function handleCredentialsSignIn({ email, password }: { email: string, password: string }) {
    try {
        await signIn("credentials", { email: email, password: password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Invalid credentials",
                    }
                default:
                    return {
                        message: "An error occurred",
                    }
            }
        }
        throw error;
    }
}