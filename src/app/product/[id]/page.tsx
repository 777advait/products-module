import Container from "@/components/Container";
import { getProductById } from "@/lib/get-products";
import Image from "next/image";
import VariantForm from "@/components/Product/VariantForm";

import React from "react";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const product: {
    product: {
      image: string;
      title: string;
      description: string;
      variant_count: number;
      currency: string;
    };
    variants: {
      id: number;
      name: string;
      image: string;
      price: string;
    }[];
  } = await getProductById(parseInt(params.id));

  if (!product) return <Container>Product not found</Container>;

  return (
    <Container>
      <div className="space-y-8">
        <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-center md:gap-12">
          <div className="md:w-1/2">
            <Image
              src={product.product.image}
              alt={product.product.title}
              width={450}
              height={450}
              className="rounded-md"
            />
          </div>
          <div className="space-y-4 md:w-3/4">
            <div className="h-fit space-y-4 border-b-2 px-2 py-4">
              <h1 className="text-2xl font-semibold">
                {product.product.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {product.product.description}
              </p>
            </div>
            <VariantForm
              variants={product.variants}
              variant_count={product.product.variant_count}
              currency={product.product.currency}
            />
            <div className="flex items-center gap-2 px-2">
              <Button size="sm">Buy Now</Button>
              <Button size="sm" variant="outline">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-lg font-semibold">Variants Preview</h1>
        </div>
      </div>
    </Container>
  );
}
