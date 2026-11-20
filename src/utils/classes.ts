import clsx, { type ClassValue } from "clsx";

// Assemble des classes Tailwind conditionnelles.
export function cx(...classes: ClassValue[]): string {
  return clsx(classes);
}
