import { Children, COLORS, Extension, Text, VStack } from "../../../mod.ts";

/* Liquid forloop */
const forLiquid = function (
  item: string,
  items: string,
  ...childrens: Children[]
): Extension {
  return new Extension({
    templateStart: `{%- for ${item} in ${items} -%}`,
    templateEnd: "{%- endfor -%}",
  }, ...childrens);
};

/* Liquid print */
const printLiquid = function (variable: string): string {
  return `{{${variable}}}`;
};

export default VStack(
  forLiquid(
    "product",
    "products",
    Text(printLiquid("product")).color(COLORS.Red),
  ),
);
