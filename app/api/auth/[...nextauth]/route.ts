import { authOptions } from "@/app/auth/authOptions";
import NextAuth from "next-auth";


const handle = NextAuth(authOptions)
export {
    handle as GET,
    handle as POST,
};
