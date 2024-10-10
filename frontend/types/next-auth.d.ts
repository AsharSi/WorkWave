import "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    emailVerified?: boolean | null;
  }

  interface Session {
    user: User;
  }
}
