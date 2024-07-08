import { getProducts } from "@/lib/get-products";
import Image from "next/image";
import React from "react";
import Link from "next/link";

function ProductCard(props: {
  id: number;
  title: string;
  image: string;
  description: string;
}) {
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
          <Link
            href={`/product/${props.id}`}
            className="font-semibold underline-offset-4 hover:underline"
          >
            {props.title}
          </Link>
          <p className="truncate text-sm text-muted-foreground">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function ProductsGrid() {
  const products = await getProducts();

  if (!products) {
    return (
      <p className="text-center font-medium text-muted-foreground">
        Failed to fetch products
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
