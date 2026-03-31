import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatTime = (totalSeconds:number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  // padStart(2, '0') turns "5" into "05"
  return [h, m, s]
    .map(v => v.toString().padStart(2, '0'))
    .join(':');
};

export const colors : Record<string,string> = {
    "easy":"border-green-300 [text-shadow:-1px_-1px_0_theme(colors.green.300),1px_-1px_0_theme(colors.green.300),-1px_1px_0_theme(colors.green.300),1px_1px_0_theme(colors.green.300)]",
    "normal":"border-yellow-300 [text-shadow:-1px_-1px_0_theme(colors.yellow.300),1px_-1px_0_theme(colors.yellow.300),-1px_1px_0_theme(colors.yellow.300),1px_1px_0_theme(colors.yellow.300)]",
    "hard":"border-red-300 [text-shadow:-1px_-1px_0_theme(colors.red.300),1px_-1px_0_theme(colors.red.300),-1px_1px_0_theme(colors.red.300),1px_1px_0_theme(colors.red.300)]",
}

export const colorsWithHover : Record<string,string> = {
    "easy":"border-green-300 hover:bg-green-300 [text-shadow:-1px_-1px_0_theme(colors.green.300),1px_-1px_0_theme(colors.green.300),-1px_1px_0_theme(colors.green.300),1px_1px_0_theme(colors.green.300)]",
    "normal":"border-yellow-300 hover:bg-yellow-300 [text-shadow:-1px_-1px_0_theme(colors.yellow.300),1px_-1px_0_theme(colors.yellow.300),-1px_1px_0_theme(colors.yellow.300),1px_1px_0_theme(colors.yellow.300)]",
    "hard":"border-red-300 hover:bg-red-300 [text-shadow:-1px_-1px_0_theme(colors.red.300),1px_-1px_0_theme(colors.red.300),-1px_1px_0_theme(colors.red.300),1px_1px_0_theme(colors.red.300)]",
}

export const diffRotaion : Record<string,string> = {
    "easy":"normal",
    "normal":"hard",
    "hard":"easy",
}
