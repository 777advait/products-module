import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import { auth } from "@/server/auth";

export default async function Cart() {
  const session = await auth();
  return (
    <div className={`${session?.user ? "fixed" : "hidden"} bottom-6 left-6`}>
      <div className="bg-primary p-3 shadow-md rounded-full">
        <ShoppingCartIcon className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}
