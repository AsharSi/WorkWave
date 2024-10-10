import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <div className="h-custom flex justify-center items-center">
        <Button>
          <Link href="/setup-profile">Create company's profile</Link>
        </Button>
      </div>
    </>
  );
}
