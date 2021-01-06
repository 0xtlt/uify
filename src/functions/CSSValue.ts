import { Size } from "../types/Size.ts";

function CSSValue(size: Size, unit?: string): string {
  return typeof size === "number" ? `${size}${unit || "px"}` : size;
}

export default CSSValue;
