import Component from "./component.ts";

type ImgParams = {
  fit?: "contain" | "cover" | "fill" | "revert" | "scale-down";
  srcset?: { [key: string]: string };
  preset?: "coverAll";
};

function Img(src: string, alt: string, params?: ImgParams): Component {
  const img = new Component("img");

  img.setAttribute("src", src);
  img.setAttribute("alt", alt);

  if (params?.fit) {
    img.setStyle("object-fit", params.fit);
  }

  if (params?.srcset) {
    img.setAttribute(
      "srcset",
      Object.entries(params.srcset).map((value) => `${value[1]} ${value[0]}`)
        .join(","),
    );
  }

  if (params?.preset === "coverAll") {
    img.setStyle("object-fit", "cover");
    img.setStyle("width", "100%");
    img.setStyle("height", "100%");
  }

  return img;
}

export default Img;
