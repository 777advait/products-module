import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b px-8 py-4">
      <Link className="text-2xl font-semibold" href="/">
        Products
      </Link>
    </header>
  );
}
