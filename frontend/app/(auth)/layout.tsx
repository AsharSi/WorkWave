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

  console.log(session);

  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <div className="bg-default-foreground flex flex-col items-center justify-center md:h-screen relative p-4 md:p-0 h-screen">
        <div className="absolute top-2 left-0 max-w-[220px]">
          <Link href="/">
            <Image
              src={"/home/logo.svg"}
              width={180}
              height={100}
              alt="logo"
              className="w-full h-auto drop-shadow-md"
            />
          </Link>
        </div>
        <div className="bg-[#fcfcfc] rounded-lg md:rounded-tr-5xl md:rounded-bl-5xl p-3 gap-2 w-full max-w-5xl flex flex-col md:flex-row md:min-h-[50vh] 3xl:min-h-[750px] 3xl:max-w-[1300px] shadow-md items-center xl:h-[46vw] lg:h-[50vw] 2xl:h-[35vw] lg:min-h-[612px]">
          <div className="hidden md:block w-full md:max-w-[350px] bg-purple-500 rounded-lg md:rounded-tr-5xl md:rounded-bl-5xl p-4 mb-4 md:mb-0 relative h-full">
            <div className="flex justify-center p-4 items-center h-full">
              <Image
                src={"/images/Globe.svg"}
                alt="Carousel Image 1"
                className="w-4/5"
                width={100}
                height={100}
              />
            </div>
          </div>

          <div className="w-full  md:h-full md:min-h-[80vh] p-4 md:p-6 flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
