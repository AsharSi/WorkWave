import { verifyUsersCompanyProfile } from "@/actions/userActions";
import { redirect } from "next/navigation";

export default async function NotVerifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await verifyUsersCompanyProfile();

  console.log("session in verified layout", response);

  if (response !== "verified") { 
    redirect("/get-started");
  }

  return <>{children}</>;
}