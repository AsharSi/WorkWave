import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log("session in protected", session);

  if (!session?.user) redirect("/signin");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
