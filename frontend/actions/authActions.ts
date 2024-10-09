"use server";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function handleCredentialsSignIn({
  email,
  password,
}: {
  email: string,
  password: string
}) {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("AuthError", error);
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "An error occurred",
          };
      }
    }
    throw error;
  }
}

export async function handleGoogleSignIn() {
  await signIn("google", { callbackUrl: "/" });
}

export async function handleLinkedInSingIn() {
  await signIn("linkedin", { callbackUrl: "/" });
}

export async function handleSignOut() {
  await signOut();
}
