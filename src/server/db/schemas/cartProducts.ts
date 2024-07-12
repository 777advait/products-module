import { decimal, integer, pgTable, text } from "drizzle-orm/pg-core";
import { carts } from "./carts";

export const cartProducts = pgTable("cart_products", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  cart_id: text("cart_id")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade" }),
  product_id: integer("product_id").notNull(),
  variant_id: integer("variant_id").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
});
