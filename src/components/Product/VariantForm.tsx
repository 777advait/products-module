"use client";

import React, { use } from "react";
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

const schema = z.object({
  variant: z.string(),
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
    name: string;
    image: string;
    price: string;
  }[];
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-2">
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
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
              <div className="px-2">
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
      </form>
    </Form>
  );
}
