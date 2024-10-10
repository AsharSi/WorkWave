import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NotVerifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log("session in verified layout", session);

  if (!session?.user?.emailVerified) {   
    redirect("/get-started");
  }

  return <>{children}</>;
}