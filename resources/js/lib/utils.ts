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
export function secondsToDateTime(seconds:number) {
    const date = new Date(seconds * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const secondsPart = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${secondsPart}`;
}

export function getContrastColor(hex: string) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // luminance formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "black" : "white";
}

export function textFormatter(value:string):string {
    let res = value.split("_").map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")
    return res;
}

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
