import Image from "next/image";
import {
  handleCredentialsSignIn,
  handleGoogleSignIn,
  handleLinkedInSingIn,
} from "@/actions/authActions";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="text-popover-foreground flex flex-col">
        <div className="text-[#666] font-medium text-sm mb-1 mt-3">
          Hey Champ!
        </div>
        <div className="font-semibold text-[#444] text-2xl mb-4 ">
          Welcome Back to wiZe!
          <div className="h-[2px] my-2 bg-gradient-to-r from-white to-gray-400 max-w-[300px] rounded-full mt-3 "></div>
        </div>
      </div>

      <form action={handleGoogleSignIn} className="mb-2">
        <button
          type="submit"
          className="flex items-center justify-center w-full bg-white text-gray-500 md:shadow p-3 border-1 rounded-l space-x-2  font-semibold transition-all duration-300 hover:shadow-sm hover:transform hover:scale-[1.02] text-lg"
        >
          <Image
            src={"/auth/google.svg"}
            alt="Google"
            width={100}
            height={100}
            className="w-6 h-6"
          />
          <span className="text-gray-600 font-bold">Login with Google</span>
        </button>
      </form>

      <form action={handleLinkedInSingIn}>
        <button
          type="submit"
          className="flex items-center justify-center w-full bg-white text-gray-500 md:shadow p-3 border-1 rounded-l space-x-2  font-semibold transition-all duration-300 hover:shadow-sm hover:transform hover:scale-[1.02] text-lg"
        >
          <Image
            src={"/auth/linkedin.svg"}
            alt="Google"
            width={100}
            height={100}
            className="w-6 h-6"
          />
          <span className="text-gray-600 font-bold">Login with LinkedIn</span>
        </button>
      </form>

      <div className="flex items-center justify-center my-4">
        <div className="w-1/3 border-b border-gray-300 mr-4"></div>
        <span className="text-gray-400 font-semibold text-center text-sm">
          Or login with email
        </span>
        <div className="w-1/3 border-b border-gray-300 ml-4 "></div>
      </div>

      <form action={handleCredentialsSignIn}>
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="border-1 bg-white p-3 rounded-md text-black placeholder-gray-400 placeholder-semibold focus:border-default-foreground focus:font-semibold  hover:border-default-foreground transition-all duration-300"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="border-1 bg-white p-3 rounded-md text-black placeholder-gray-400 placeholder-semibold focus:border-default-foreground focus:font-semibold  hover:border-default-foreground transition-all duration-300"
          />
        </div>
        <div className="flex justify-between items-center mt-12 mb-4">
          <Button
            type="submit"
            className="bg-default text-white pl-4 pr-2 py-6 rounded-full flex items-center gap-3 hover:scale-105 hover:bg-default transition-all duration-200  "
          >
            <span className="font-bold md:text-xl">Sign In</span>
            <Image
              src={"/auth/arrow.svg"}
              alt="arrow"
              className="w-8 h-8 -rotate-90"
              width={100}
              height={100}
            />
          </Button>
        </div>
      </form>

      {children}
    </>
  );
}
