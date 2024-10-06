import { signIn, auth } from "@/lib/auth";

export default async function SignIn() {
  const session = await auth();

  console.log("session", session);
  if (session?.user) return <p>Already signed in</p>;

  return (
    <form
      action={async (formdata) => {
        "use server";
        await signIn("credentials", formdata);
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
