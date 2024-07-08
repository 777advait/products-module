"use server";

export async function getProducts(): Promise<
  {
    id: number;
    title: string;
    image: string;
    description: string;
  }[]
> {
  const response = await fetch("https://api.printful.com/products", {
    cache: "no-store",
  });
  const products = await response.json();
  return products.code !== 200 ? null : products.result;
}
