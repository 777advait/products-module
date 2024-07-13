import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCartItems } from "@/server/db/queries";
import { getProductById } from "@/lib/get-products";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { db } from "@/server/db";
import { cartProducts } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function CartPreview() {
  const cartItems = await getCartItems();
  if (!cartItems) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
        <CardDescription>Review your order before checkout</CardDescription>
      </CardHeader>
      <CardContent className="h-fit max-h-[450px] space-y-4 overflow-x-hidden overflow-y-scroll">
        {cartItems.map(async (item) => {
          const product = (await getProductById(item.product_id)).variants.find(
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

                    revalidatePath("/checkout");
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
        })}
      </CardContent>
      <Separator />
      <CardFooter className="mt-4">
        <p className="font-semibold">
          Total Amount:{" "}
          {cartItems
            .reduce(
              (acc, product) => acc + parseFloat(product.price as string),
              0,
            )
            .toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  );
}
