import React from "react";
import "@/styles/globals.css"
import type { ComponentProps } from "@/types/component";

export default function Component({ children }: ComponentProps) {
  return <div className="component">{children}</div>;
}
