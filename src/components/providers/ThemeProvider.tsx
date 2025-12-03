"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// A correção é remover o "/dist/types" do final
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}