import { pgTable, text, timestamp, pgEnum, decimal } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { sql } from "drizzle-orm";

// Corrected enum definitions
const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid"]);
const orderStatusEnum = pgEnum("order_status", [
  "dispatched",
  "fulfilled",
  "cancelled",
]);

export const orders = pgTable("orders", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  payment_status: paymentStatusEnum("payment_status")
    .notNull()
    .default("pending"),
  order_status: orderStatusEnum("order_status").notNull().default("dispatched"),
  total_amount: decimal("total_amount").notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
