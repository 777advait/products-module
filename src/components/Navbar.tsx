import { auth, signOut } from "@/server/auth";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default async function Navbar() {
  const session = await auth();
  return (
    <header className="flex items-center justify-between border-b px-8 py-4">
      <Link className="text-2xl font-semibold" href="/">
        Products
      </Link>
      {session?.user && (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button size="sm">Logout</Button>
        </form>
      )}
    </header>
  );
}
