"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [variant, setVariant] = React.useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="space-y-4 px-2">
        <h2 className="font-medium">Available variants: {variant_count}</h2>
        {variant_count !== 0 && (
          <div className="">
            <Select onValueChange={(value) => setVariant(parseInt(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your variant" />
              </SelectTrigger>
              <SelectContent>
                {variants.map((variant) => (
                  <SelectItem key={variant.id} value={String(variant.id)}>
                    {variant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="px-2">
        <h2 className="text-lg font-semibold">
          Price:{" "}
          <span className="font-normal">
            {variant === null
              ? "Select a variant"
              : currency + " " + variants.find((v) => v.id === variant)?.price}
          </span>
        </h2>
      </div>
    </div>
  );
}
