import { type NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { Adapter } from 'next-auth/adapters'
import clientPromise from "@/utils/mongodb";

import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";

import { sendVerificationRequest } from "@/utils/emailVerificationRequest";

const authOptions: NextAuthOptions = {
  adapter: <Adapter>MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: process.env.EMAIL_SERVER_PORT as string,
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string,
        }
      },
      from: process.env.EMAIL_FROM as string,
      sendVerificationRequest,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        profile(profile) {
          return {
              id: profile.sub,
              name: profile.name,
              username: "@" + profile.email.split("@")[0],
              email: profile.email,
              image: profile.picture,
              tier: profile.tier || "gold",
              role: profile.role || "user",
          };
        }
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
      version: "2.0", // opt-in to Twitter OAuth 2.0
        profile(profile) {
          return {
            id: profile.data.id, 
            name: profile.data.name,
            username: "@" + profile.data.username,
            email: profile.data.email, 
            image: profile.data.profile_image_url,
            tier: profile.tier || "gold",
            role: profile.role || "user",
          };
        }
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        profile(profile) {
          console.log(profile);
          return {
              id: profile.id,
              name: profile.username,
              username: "@" + profile.username,
              email: profile.email,
              image: profile.avatar,
              tier: profile.tier || "gold",
              role: profile.role || "user",
          };
        }
    }),
  ],

  pages: {
    // signIn: '/login/user',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/register', // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },

  callbacks: {
    async session({ session, user }:any) {
      if (session.user) {
        session.user.id = user.id;
        session.user.username = user.username;
        session.user.tier = user.tier || "gold";
        session.user.role = user.role || "user";
      }
      return session;
    },
  },

};

export default authOptions;

