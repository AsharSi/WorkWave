import { Plus, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SidebarCSS from "./Sidebar.module.css"

export default function SlimSidebar() {
  return (
    <div className="flex flex-col items-center w-16 h-custom py-8 bg-background border-r">
      <Link href={"/profiles/new-profile"}>
        <Button
          variant="ghost"
          size="icon"
          className="mb-8"
          aria-label="Add new"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
      
      <div className="flex-grow flex items-center">
        <p className={`${SidebarCSS.verticalText} text-sm font-medium text-muted-foreground`}>
          All listing
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="mt-8"
        aria-label="Customer support"
      >
        <HeadphonesIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}