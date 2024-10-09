import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { COMMON_CONFIG } from "../config";

async function login(credentials: Record<string, string>) {
  if (!credentials?.email || !credentials?.password) return null;
  const { email, password } = credentials;
  const res = await fetch(COMMON_CONFIG.SERVER_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status == 401) {
    console.log(res.statusText);

    return null;
  }
  const user = await res.json();
  return user;
}

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(COMMON_CONFIG.SERVER_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          return await login(credentials!);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
