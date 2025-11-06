import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Main NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // Redirect users here if they visit /api/auth/signin directly
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Attach Google access token to JWT
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    // Make accessToken available in the client session
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

// Create and export the handler for Next.js App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
