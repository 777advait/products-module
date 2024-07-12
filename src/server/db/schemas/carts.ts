import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { create } from "domain";

export const carts = pgTable("carts", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
});
