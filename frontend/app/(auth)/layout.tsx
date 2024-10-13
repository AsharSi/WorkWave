import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <div className="bg-default-foreground flex flex-col items-center justify-center md:h-screen relative p-4 md:p-0 h-screen">
        <Link href="/" className="absolute top-2 left-8 max-w-[300px]">
          <Image
            src={"/general/wizelogo.jpg"}
            width={300}
            height={120}
            alt="Logo"
            className="w-full h-auto mix-blend-multiply"
          />
        </Link>
        <div className="bg-[#fcfcfc] rounded-lg md:rounded-tr-[3rem] md:rounded-bl-[3rem] p-3 gap-2 w-full max-w-5xl flex flex-col md:flex-row md:min-h-[50vh] 3xl:min-h-[750px] 3xl:max-w-[1300px] shadow-md items-center xl:h-[46vw] lg:h-[50vw] 2xl:h-[35vw] lg:min-h-[612px]">
          <div className="hidden md:flex justify-center items-start p-6 h-full w-full md:max-w-[350px] bg-default rounded-lg md:rounded-tr-[2.5rem] md:rounded-bl-[2.5rem]">
            <Image
              src={"/auth/globe.svg"}
              alt="Globe"
              width={1000}
              height={1000}
              className="w-full mt-4"
            />
          </div>

          <div className="w-full  md:h-full md:min-h-[80vh] p-4 md:p-6 flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
