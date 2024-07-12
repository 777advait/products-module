import { auth } from "@/server/auth";

const privatePages = ["/product(?:/.*)?", "/checkout(?:/.*)?"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isPrivatePage = privatePages.some((page) =>
    new RegExp(`^${page}$`).test(pathname),
  );

  if (!req.auth && isPrivatePage) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
