import { auth, signOut } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        {session?.user ? `Hello, ${session?.user?.name}!` : "Please sign in"}
      </p>
      <p>{session?.user?.email ? session.user.email : ""}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};