"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { db } from "../db";
import { getCart } from "../db/queries";
import { cartProducts } from "../db/schemas";

export async function addToCart({
  productId,
  variantId,
  price,
}: {
  productId: number;
  variantId: number;
  price: string;
}) {
  const cart = await getCart();
  const session = await auth();

  if (!cart?.id || !session?.user?.id) {
    return { error: "Not logged in" };
  }

  try {
    await db.insert(cartProducts).values({
      cart_id: cart.id,
      product_id: productId,
      variant_id: variantId,
      price: price,
    });

    return { success: "Added to cart" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to add to cart" };
  }
}
