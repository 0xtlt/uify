import { Children } from "../types/Children.ts";
import Component from "./component.ts";

function VStack(...childrens: Children[]): Component {
  return new Component("div", ...childrens);
}

export default VStack;
