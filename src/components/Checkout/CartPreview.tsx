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
import { ShoppingCartIcon } from "lucide-react";
import { Separator } from "../ui/separator";

export default async function CartPreview() {
  const cartItems = await getCartItems();
  if (!cartItems) return null;

  const productPromises = cartItems.map(async (item) =>
    (await getProductById(item.product_id)).variants.find(
      (v: { id: number }) => v.id === item.variant_id,
    ),
  );

  const products = await Promise.all(productPromises);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
        <CardDescription>Review your order before checkout</CardDescription>
      </CardHeader>
      <CardContent className="h-fit max-h-[450px] space-y-4 overflow-x-hidden overflow-y-scroll">
        {products.map((product) => (
          <div className="pb-4" key={product.id}>
            <h1 className="font-semibold">{product.name}</h1>
            <p className="text-sm font-medium text-muted-foreground">
              Price: {product.price}
            </p>
          </div>
        ))}
      </CardContent>
      <Separator />
      <CardFooter className="mt-4">
        <p className="font-semibold">
          Total Amount:{" "}
          {products
            .reduce((acc, product) => acc + parseFloat(product.price), 0)
            .toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  );
}
