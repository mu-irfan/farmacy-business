import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//base url
export const baseUrlForAuth =
  "https://normal-recently-viper.ngrok-free.app/api";
