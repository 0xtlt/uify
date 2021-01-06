import Component from "./component.ts";

function VStack(...childrens: Component[]): Component {
  return new Component("div", ...childrens);
}

export default VStack;
