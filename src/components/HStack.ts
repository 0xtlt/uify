import Component from "./component.ts";

function HStack(...childrens: Component[]): Component {
  return new Component("div", ...childrens).setStyle("display", "flex");
}

export default HStack;
