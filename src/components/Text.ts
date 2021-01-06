import Component from "./component.ts";

class TextComponent extends Component {
  color(color: string): this {
    this.setStyle("color", color);
    return this;
  }

  size(size: number | string): this {
    this.setStyle("font-size", typeof size === "string" ? size : `${size}px`);
    return this;
  }
}

function Text(content: string, ...childrens: Component[]): TextComponent {
  return new TextComponent("p", ...childrens).setHTML(content);
}

export default Text;
