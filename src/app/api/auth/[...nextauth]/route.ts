import NextAuth from "next-auth";
import authOptions from "./options"; // Import the configuration

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };