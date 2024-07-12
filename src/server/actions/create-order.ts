"use server";

import { getProductById } from "@/lib/get-products";
import { auth } from "../auth";
import { getCartItems } from "../db/queries";
import { addresses, cartProducts, orders } from "../db/schemas";
import { db } from "../db";
import { orderProducts } from "../db/schemas/order_products";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function createOrder(addressData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}) {
  const session = await auth();
  const cartItems = await getCartItems();

  if (!session?.user?.id || !cartItems) return { error: "Not logged in" };

  const productPromises = cartItems.map(async (item) =>
    (await getProductById(item.product_id)).variants.find(
      (v: { id: number }) => v.id === item.variant_id,
    ),
  );

  const products: {
    id: number;
    product_id: number;
    price: string;
    name: string;
  }[] = await Promise.all(productPromises);

  const price = products
    .reduce((acc, product) => acc + parseFloat(product.price), 0)
    .toFixed(2);

  try {
    const order = await db
      .insert(orders)
      .values({ userId: session?.user?.id as string, total_amount: price })
      .returning({ order_id: orders.id });

    const orderId = order[0]?.order_id as string;

    if (!orderId) return { error: "Error creating order" };

    await db.insert(addresses).values({
      order_id: orderId,
      address: addressData.address,
      city: addressData.city,
      state: addressData.state,
      zip: addressData.zip,
      country: addressData.country,
      first_name: addressData.firstName,
      last_name: addressData.lastName,
      phone: addressData.phone,
      email: addressData.email,
    });

    products.forEach(async (product) => {
      console.log(product);
      await db.insert(orderProducts).values({
        order_id: orderId,
        product_id: product.product_id,
        variant_id: product.id,
        price: product.price,
      });

      await db
        .delete(cartProducts)
        .where(eq(cartProducts.variant_id, product.id));
    });

    revalidateTag("Sheet")

    return { success: "Order created" };
  } catch (error) {
    console.log(error);
    return { error: "Error creating order" };
  }
}
