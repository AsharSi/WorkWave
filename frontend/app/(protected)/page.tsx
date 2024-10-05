
import { signIn, signOut, auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  console.log(session);

  if (session?.user)
    return (
      <>
        <h1>Hello, {session?.user?.name}!</h1>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </>
    );
  else
    return (
      <>
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button type="submit">Sign in</button>
        </form>
      </>
    );
}
