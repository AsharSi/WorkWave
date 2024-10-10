import { verifyUsersCompanyProfile } from "@/actions/userActions";
import { redirect } from "next/navigation";

export default async function NotVerifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await verifyUsersCompanyProfile();
  
  if (response === "verified") {
    redirect("/");
  } else {
    return <>{ children }</>;
  }
}
