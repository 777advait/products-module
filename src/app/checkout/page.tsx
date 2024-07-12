import AddressForm from "@/components/Checkout/AddressForm";
import CartPreview from "@/components/Checkout/CartPreview";
import Container from "@/components/Container";
import { getCartItems } from "@/server/db/queries";
import React from "react";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cart = await getCartItems();

  return (
    <Container>
      {cart?.length === 0 ? (
        <h1 className="text-center text-2xl font-semibold text-muted-foreground">
          Your cart is empty
        </h1>
      ) : (
        <div className="flex items-center justify-between gap-x-16">
          <div className="w-1/2">
            <AddressForm />
          </div>
          <div className="w-1/2">
            <CartPreview />
          </div>
        </div>
      )}
    </Container>
  );
}
