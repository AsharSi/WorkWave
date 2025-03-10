import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleSignOut } from "@/actions/authActions";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="bg-background border-b sticky top-0 z-30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link
            href={"/"}
            className="flex-shrink-0 flex items-center overflow-hidden"
          >
            <Image
              src={"/general/wizelogo.png"}
              alt="logo"
              width={300}
              height={64}
              className="h-auto w-full max-w-[300px]"
            ></Image>
          </Link>
          <div className="flex items-center">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-default" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  aria-label="User menu"
                >
                  <User className="h-5 w-5 text-default" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <form action={handleSignOut}>
                  <Button
                    variant={"ghost"}
                    className="h-auto p-0 font-normal w-full"
                    type="submit"
                  >
                    <DropdownMenuItem className="w-full">
                      Sign out
                    </DropdownMenuItem>
                  </Button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="text-default hover:text-default"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
