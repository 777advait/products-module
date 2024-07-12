-- First, add new integer columns
ALTER TABLE "cart_products" ADD COLUMN "product_id_new" INTEGER;
ALTER TABLE "cart_products" ADD COLUMN "variant_id_new" INTEGER;

-- Convert existing data to integers
UPDATE "cart_products" SET "product_id_new" = "product_id"::INTEGER;
UPDATE "cart_products" SET "variant_id_new" = "variant_id"::INTEGER;

-- Drop the old columns
ALTER TABLE "cart_products" DROP COLUMN "product_id";
ALTER TABLE "cart_products" DROP COLUMN "variant_id";

-- Rename the new columns to the original names
ALTER TABLE "cart_products" RENAME COLUMN "product_id_new" TO "product_id";
ALTER TABLE "cart_products" RENAME COLUMN "variant_id_new" TO "variant_id";

-- Set NOT NULL constraint if it was present in the original columns
ALTER TABLE "cart_products" ALTER COLUMN "product_id" SET NOT NULL;
ALTER TABLE "cart_products" ALTER COLUMN "variant_id" SET NOT NULL;