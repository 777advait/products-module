import { decimal, integer, pgTable, text } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const orderProducts = pgTable("order_products", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  order_id: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  product_id: integer("product_id").notNull(),
  variant_id: integer("variant_id").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});
