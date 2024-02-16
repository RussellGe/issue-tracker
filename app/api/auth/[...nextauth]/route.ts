import NextAuth from "next-auth";
const handle = NextAuth({
    providers: []
})
export {
    handle as GET,
    handle as POST,
};
