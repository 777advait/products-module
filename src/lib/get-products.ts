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

export async function getProductById(id: number) {
  const response = await fetch(`https://api.printful.com/products/${id}`, {
    cache: "no-store",
  });
  const product = await response.json();
  return product.code !== 200 ? null : product.result;
}
