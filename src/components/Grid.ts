import arrayGenerator from "../functions/arrayGenerator.ts";
import CSSValue from "../functions/CSSValue.ts";
import { Children } from "../types/Children.ts";
import { Size } from "../types/Size.ts";
import Component from "./component.ts";

type GridParams = {
  columns?: Size[] | number;
  rows?: Size[] | number;
  gapHorizontal?: Size;
  gapVertical?: Size;
};

function Grid(params: GridParams, ...childrens: Children[]): Component {
  const grid = new Component("div", ...childrens);
  grid.setStyle("display", "grid");

  if (params.columns) {
    grid.setStyle(
      "grid-template-columns",
      typeof params.columns === "number"
        ? arrayGenerator("1fr", params.columns).join(" ")
        : params.columns.map((c) => CSSValue(c, "fr"))
          .join(" "),
    );
  }

  if (params.rows) {
    grid.setStyle(
      "grid-template-rows",
      typeof params.rows === "number"
        ? arrayGenerator("1fr", params.rows).join(" ")
        : params.rows.map((r) => CSSValue(r, "fr"))
          .join(" "),
    );
  }

  if (params.gapHorizontal && params.gapVertical) {
    grid.setStyle(
      "grid-gap",
      `${CSSValue(params.gapVertical)} ${CSSValue(params.gapHorizontal)}`,
    );
  } else if (params.gapHorizontal) {
    grid.setStyle(
      "grid-column-gap",
      CSSValue(params.gapHorizontal),
    );
  } else if (params.gapVertical) {
    grid.setStyle(
      "grid-column-row",
      CSSValue(params.gapVertical),
    );
  }

  return grid;
}

export default Grid;
