import { Children } from "../types/Children.ts";
import Component from "./component.ts";

function HStack(...childrens: Children[]): Component {
  return new Component("div", ...childrens).setStyle("display", "flex");
}

export default HStack;
