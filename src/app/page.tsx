import Container from "@/components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsGrid from "@/components/Listing/ProductsGrid";
import ProductsList from "@/components/Listing/ProductsList";
import { auth, signIn } from "@/server/auth";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="">
        <Container>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-center text-3xl font-medium">
              Log in to proceed
            </h1>
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <Button>Sign in with GitHub</Button>
            </form>
          </div>
        </Container>
      </main>
    );
  }

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
