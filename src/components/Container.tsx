import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[80%] py-12">{children}</div>;
}
