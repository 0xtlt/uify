import { Children } from "../types/Children.ts";
import { ExtensionParams } from "../types/Extension.ts";

class Extension {
  private childrens: Children[];
  private Params: ExtensionParams;

  constructor(params: ExtensionParams, ...childrens: Children[]) {
    this.childrens = childrens;
    this.Params = params;
  }

  get css(): string {
    return this.childrens.map((child) => child.css).join("");
  }

  get html(): string {
    let result = `${this.Params.templateStart || ""}${
      this.childrens.map((child) => child.html).join("")
    }${this.Params.templateEnd || ""}`;

    return result;
  }
}

export default Extension;
