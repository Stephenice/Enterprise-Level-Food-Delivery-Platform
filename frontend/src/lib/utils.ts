import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class strings or objects into a single class string,
 * merging Tailwind CSS classes using twMerge and applying additional class transformations
 * using clsx.
 * 
 * @param inputs - An array of class strings, objects, or arrays to be combined.
 * @returns {string} - A single class string representing the merged classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
