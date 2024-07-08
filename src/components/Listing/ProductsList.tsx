import React from "react";
import Container from "../Container";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/get-products";

function ProductItem(props: {
  id: number;
  title: string;
  image: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-12">
      <div className="">
        <Image
          src={props.image}
          alt={props.title}
          width={350}
          height={350}
          className="rounded-md"
        />
      </div>
      <div className="w-1/2 space-y-2">
        <Link
          href={`/product/${props.id}`}
          className="text-lg font-semibold underline-offset-4 hover:underline"
        >
          {props.title}
        </Link>
        <p className="line-clamp-6 text-ellipsis text-sm text-muted-foreground">
          {props.description}
        </p>
      </div>
    </div>
  );
}

export default async function ProductsList() {
  const products = await getProducts();

  if (!products) {
    return (
      <p className="text-center font-medium text-muted-foreground">
        Failed to fetch products
      </p>
    );
  }
  return (
    <Container>
      <ul className="flex flex-col gap-8">
        {products.map((product) => (
          <li key={product.id}>
            <ProductItem {...product} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
