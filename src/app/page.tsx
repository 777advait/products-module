import Container from "@/components/Container";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsGrid from "@/components/Listing/ProductsGrid";
import ProductsList from "@/components/Listing/ProductsList";

async function getProducts() {
  const response = await fetch("https://api.printful.com/products");
  const products = await response.json();
  return products.code !== 200 ? null : products.result;
}

export default async function HomePage() {
  const products = JSON.stringify((await getProducts()).result, null, 2);
  return (
    <main className="">
      <Container>
        <Tabs defaultValue="grid" className="space-y-8">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="grid">
            <ProductsGrid />
          </TabsContent>
          <TabsContent value="list">
            <ProductsList />
          </TabsContent>
        </Tabs>
      </Container>
    </main>
  );
}
