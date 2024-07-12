import { eq } from "drizzle-orm";
import { db } from "./index";
import { carts } from "./schemas";
import { auth } from "../auth";

export async function getCart() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session.user.id;
  return await db.query.carts.findFirst({ where: eq(carts.user_id, userId) });
}
