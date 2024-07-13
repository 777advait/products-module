import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import { auth } from "@/server/auth";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { getCartItems } from "@/server/db/queries";
import { getProductById } from "@/lib/get-products";
import Link from "next/link";
import { TrashIcon } from "lucide-react";
import { db } from "@/server/db";
import { cartProducts } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export default async function Cart() {
  const session = await auth();
  const cartItems = await getCartItems();

  if (!cartItems) return null;

  return (
    <div className={`${session?.user ? "fixed" : "hidden"} bottom-8 left-8`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="rounded-full shadow-md">
            <ShoppingCartIcon className="h-4 w-4 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>View the contents of your cart</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-4">
            {cartItems?.length > 0 ? (
              cartItems.map(async (item) => {
                const product = (
                  await getProductById(item.product_id)
                ).variants.find(
                  (v: { id: number }) => v.id === item.variant_id,
                );

                return (
                  <div className="space-y-2 border-b pb-4">
                    <h1 className="font-semibold">{product.name}</h1>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">
                        Price: {product.price}
                      </p>
                      <form
                        action={async () => {
                          "use server";

                          await db
                            .delete(cartProducts)
                            .where(eq(cartProducts.id, item.id));

                          revalidateTag("Sheet");
                        }}
                      >
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-7 gap-1 text-sm"
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                          Remove
                        </Button>
                      </form>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No items in cart</h1>
            )}
          </div>
          <SheetFooter>
            <Link
              aria-disabled={cartItems.length === 0}
              className={`${buttonVariants({ size: "sm" })}`}
              href="/checkout"
            >
              <ShoppingCartIcon className="mr-1.5 h-3.5 w-3.5" />
              Checkout
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
