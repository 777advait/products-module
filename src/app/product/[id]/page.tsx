import Container from "@/components/Container";
import { getProductById } from "@/lib/get-products";
import Image from "next/image";
import VariantForm from "@/components/Product/VariantForm";
import {
  ArrowLeftToLineIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function VariantCard(props: { title: string; image: string; price: string }) {
  return (
    <div className="rounded-md border border-gray-100 bg-gray-400 bg-opacity-10 bg-clip-padding p-4 backdrop-blur-md backdrop-filter">
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={props.image}
            alt={props.title}
            width={200}
            height={200}
            className="rounded-md"
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold">{props.title}</h1>
          <p className="text-sm text-muted-foreground">{props.price}</p>
        </div>
      </div>
    </div>
  );
}

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
      product_id: number;
      name: string;
      image: string;
      price: string;
    }[];
  } = await getProductById(parseInt(params.id));

  if (!product) return <Container>Product not found</Container>;

  return (
    <Container>
      <Link
        href="/"
        className={`${buttonVariants({ variant: "link" })} !px-0 pb-8 text-xs !text-muted-foreground`}
      >
        <ArrowLeftToLineIcon className="mr-1.5 h-3.5 w-3.5" />
        Back to catalog
      </Link>
      <div className="space-y-12">
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
            
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-lg font-semibold">Variants Preview</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {product.variants.map((variant) => (
              <VariantCard
                key={variant.id}
                title={variant.name}
                image={variant.image}
                price={`${product.product.currency} ${variant.price}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
