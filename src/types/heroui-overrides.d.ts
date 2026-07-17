// src/types/heroui-overrides.d.ts
import "@heroui/react";
import type { ReactNode } from "react";

declare module "@heroui/react" {
  interface TableBodyProps<T extends object = object> {
    emptyContent?: ReactNode;
  }
}