import { Extension } from "../../mod.ts";
import CSSValue from "../functions/CSSValue.ts";
import { Children } from "../types/Children.ts";
import { Size } from "../types/Size.ts";

const AUTOCLOSURE: string[] = ["img", "br"];
// Normal UUID format :
// xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
function create_UUID(): string {
  let dt = new Date().getTime();
  let uuid = "xxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
    },
  );
  return uuid;
}

class Component {
  private stylesheet: {
    [key: string]: { [key: string]: { [key: string]: string } };
  };
  private attributes: { [key: string]: string };
  private childrens: Children[];
  private type: string;
  private className: string;
  private HTML: string;
  private actualBreakpoint: string;
  private actualSelector: string;
  private javascript: { [key: string]: string[] };
  private ID: string;

  constructor(type: string, ...childrens: (Component | Extension)[]) {
    this.stylesheet = {};
    this.attributes = {};
    this.childrens = childrens;
    this.type = type;
    this.className = "c_" + create_UUID();
    this.HTML = "";
    this.actualBreakpoint = "default";
    this.actualSelector = "";
    this.javascript = {};
    this.ID = "";
  }

  id(id: string): this {
    this.ID = id;
    return this;
  }

  align(alignment: "center"): this {
    this.setStyle("margin", alignment === "center" ? "auto" : alignment);
    return this;
  }

  HMargin(value: Size): this {
    this.marginRight(value);
    this.marginLeft(value);
    return this;
  }
  VMargin(value: Size): this {
    this.marginTop(value);
    this.marginBottom(value);
    return this;
  }

  marginLeft(value: Size): this {
    this.setStyle("margin-left", CSSValue(value, "px"));
    return this;
  }
  marginRight(value: Size): this {
    this.setStyle("margin-right", CSSValue(value, "px"));
    return this;
  }
  marginTop(value: Size): this {
    this.setStyle("margin-top", CSSValue(value, "px"));
    return this;
  }
  marginBottom(value: Size): this {
    this.setStyle("margin-bottom", CSSValue(value, "px"));
    return this;
  }

  alignText(alignment: "left" | "right" | "center"): this {
    this.setStyle("text-align", alignment);
    return this;
  }

  background(color: string): this {
    this.setStyle("background", color);
    return this;
  }

  setAttribute(
    key: string,
    value: string,
  ): this {
    this.attributes[key] = value;
    return this;
  }

  setStyle(
    key: string,
    value: string,
  ): this {
    if (!this.stylesheet[this.actualBreakpoint]) {
      this.stylesheet[this.actualBreakpoint] = {};
    }
    if (!this.stylesheet[this.actualBreakpoint][this.actualSelector]) {
      this.stylesheet[this.actualBreakpoint][this.actualSelector] = {};
    }

    this.stylesheet[this.actualBreakpoint][this.actualSelector][key] = value;
    return this;
  }

  addJS(
    type: string,
    func: (element: any, event: any) => any | Promise<any>,
  ): this {
    if (!this.javascript[type]) {
      this.javascript[type] = [];
    }
    this.javascript[type].push(func.toString());
    return this;
  }

  onLoad(callback: (element: any, event: any) => any | Promise<any>): this {
    return this.addJS("DOMContentLoaded", callback);
  }

  onClick(callback: (element: any, event: any) => any | Promise<any>): this {
    return this.addJS("click", callback);
  }

  setHTML(content: string): this {
    this.HTML = content;
    return this;
  }

  breakpoint(
    value: string | number,
    callbacks: (component: this) => any,
  ): this {
    this.actualBreakpoint = value.toString();

    callbacks(this);

    this.actualBreakpoint = "default";
    return this;
  }

  selector(value: string, callbacks: (component: this) => any): this {
    this.actualSelector = value;
    callbacks(this);
    this.actualSelector = "";
    return this;
  }

  get cssFormat(): string {
    return Object.entries(this.stylesheet).map((stylesheet) => {
      if (stylesheet[0] === "default") {
        return Object.entries(stylesheet[1]).map((selector) => {
          return "." + this.className +
            (selector[0].length ? ":" + selector[0] : "") + "{" +
            Object.entries(selector[1]).map((style) => {
              return style[0] + ":" + style[1] + ";";
            }).join("") + "}";
        }).join("");
      } else {
        return "@media screen and (max-width:" + stylesheet[0] + "){" +
          Object.entries(stylesheet[1]).map((selector) => {
            return "." + this.className +
              (selector[0].length ? ":" + selector[0] : "") + "{" +
              Object.entries(selector[1]).map((style) => {
                return style[0] + ":" + style[1] + ";";
              }).join("") + "}";
          }).join("") +
          "}";
      }
    }).join(
      "",
    );
  }

  get css(): string {
    return `${
      Object.keys(this.stylesheet).length
        ? `${this.cssFormat}${
          this.childrens.map((child) => child.css).join("")
        }`
        : ""
    }`;
  }

  get html(): string {
    let result = `<${this.type}${
      this.ID.length ? ' id="' + this.ID + '"' : ""
    }${
      Object.keys(this.attributes).length
        ? ` ${
          Object.entries(this.attributes).map((value) =>
            `${value[0]}="${value[1]}"`
          ).join(" ")
        }`
        : ""
    }${
      Object.keys(this.stylesheet).length ? ` class="${this.className}"` : ""
    }>${
      AUTOCLOSURE.includes(this.type)
        ? ""
        : `${this.HTML}${
          this.childrens.map((child) => child.html).join("")
        }</${this.type}>`
    }`;

    return result;
  }

  get js(): string {
    return Object.entries(this.javascript).map((entry) => {
      return 'document.querySelector(".' + this.className +
        '").addEventListener("' + entry[0] + '", function(event) {' +
        entry[1].map((func) => {
          return "(" + func + ')(document.querySelector(".' + this.className +
            '"), event);';
        }).join("") +
        "})";
    }).join(" ") + this.childrens.map((child) => child.js).join(" ");
  }
}

export default Component;
