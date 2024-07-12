"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { addToCart } from "@/server/actions/add-to-cart";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  variantId: z.string(),
});

export default function VariantForm({
  variant_count,
  variants,
  currency,
}: {
  variant_count: number;
  currency: string;
  variants: {
    id: number;
    product_id: number;
    name: string;
    image: string;
    price: string;
  }[];
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(
    data: z.infer<typeof schema>,
    event: React.BaseSyntheticEvent,
  ) {
    const variant = variants.find((v) => v.id === parseInt(data.variantId));

    if (!variant) return null;

    const res = await addToCart({
      productId: variant.product_id,
      variantId: variant.id,
      price: variant.price,
    });

    if (res.error) {
      toast({
        title: res.error,
        variant: "destructive",
      });
      return;
    }

    const submitter = event.nativeEvent.submitter as HTMLButtonElement;
    if (submitter.getAttribute("data-action") === "buy-now") {
      router.push("/checkout");
      return;
    }

    toast({
      title: res.success,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
        <FormField
          control={form.control}
          name="variantId"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Available variants: {variant_count}</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your variant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {variants.map((variant) => (
                    <SelectItem key={variant.id} value={String(variant.id)}>
                      {variant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              <div className="">
                <h2 className="text-lg font-semibold">
                  Price:{" "}
                  <span className="font-normal">
                    {field.value === undefined
                      ? "Select a variant"
                      : currency +
                        " " +
                        variants.find((v) => v.id === parseInt(field.value))
                          ?.price}
                  </span>
                </h2>
              </div>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4">
          <Button
            data-action="buy-now"
            disabled={form.formState.isSubmitting}
            size="sm"
          >
            <ShoppingBagIcon className="mr-1.5 h-3.5 w-3.5" />
            Buy Now
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            size="sm"
            variant="outline"
            data-action="add-to-cart"
          >
            <ShoppingCartIcon className="mr-1.5 h-3.5 w-3.5" />
            Add to Cart
          </Button>
        </div>
      </form>
    </Form>
  );
}
