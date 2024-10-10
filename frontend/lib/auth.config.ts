import { saltAndHashPassword } from "@/utils/password";
import client from "@/lib/mongodb";
import LinkedIn from "next-auth/providers/linkedin";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const authConfig = {
  providers: [
    LinkedIn({
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        let user = null;

        const pwHash = await saltAndHashPassword(
          credentials.password as string
        );

        user = await client.db("mylampai-company").collection("users").findOne({
          email: credentials.email,
          password: pwHash,
        });

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        console.log("user", user);

        return {
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
};


export default authConfig;