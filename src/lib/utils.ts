import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueInt8Id(): number {
  const randomInt = crypto.getRandomValues(new Uint8Array(1))[0];
  return randomInt;
}
