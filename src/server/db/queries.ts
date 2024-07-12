import { eq } from "drizzle-orm";
import { db } from "./index";
import { cartProducts, carts } from "./schemas";
import { auth } from "../auth";

export async function getCart() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return await db.query.carts.findFirst({
    where: eq(carts.user_id, session.user.id),
  });
}

export async function getCartItems() {
  const session = await auth();
  const cartId = (await getCart())?.id;
  if (!session?.user?.id || !cartId) return null;

  return await db.query.cartProducts.findMany({
    where: eq(cartProducts.cart_id, cartId),
  });
}
