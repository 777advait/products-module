CREATE TABLE IF NOT EXISTS "cart_products" (
	"id" text PRIMARY KEY NOT NULL,
	"cart_id" text NOT NULL,
	"product_id" text NOT NULL,
	"variant_id" text NOT NULL,
	"price" numeric(10, 2)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_products" ADD CONSTRAINT "cart_products_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
