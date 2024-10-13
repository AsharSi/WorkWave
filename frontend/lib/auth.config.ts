import { saltAndHashPassword } from "@/utils/password";
import client from "@/lib/mongodb";
import LinkedIn from "next-auth/providers/linkedin";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";

const publicRoutes = ["/signin", "/signup"];
const authRoutes = ["/signin", "/signup"];

const authConfig = {
  providers: [
    LinkedIn({
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        let user = null;

        const pwHash = await saltAndHashPassword(
          credentials.password as string
        );

        user = await client.db("mylampai-company").collection("users").findOne({
          email: credentials.email,
          password: pwHash,
        });

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        console.log("user", user);

        return {
          id: user._id.toString(),
          name: user.name as string,
          email: user.email as string,
          emailVerified: user.emailVerified as Date,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Allow access to public routes for all users
      if (publicRoutes.includes(pathname)) {
        return true;
      }

      // Redirect logged-in users away from auth routes
      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true; // Allow access to auth pages if not logged in
      }

      // Allow access if the user is authenticated
      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.emailVerified = user.emailVerified as Date;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.emailVerified = token.emailVerified;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;

export default authConfig;