import { BREAKPOINTS, COLORS, Grid, HStack, Img, Text } from "../../../mod.ts";

export default Grid(
  {
    columns: [1, 2, 1],
    rows: 1,
    gapHorizontal: 15,
    gapVertical: 10,
  },
  HStack(
    Text("This is a text")
      .color(COLORS.Red)
      .selector(
        "focus",
        ((focused) => {
          focused.color(COLORS.Green);
        }),
      ),
  ),
  Img(
    "https://source.unsplash.com/random/800x600",
    "unsplash image",
    { preset: "coverAll" },
  ),
  HStack(
    Text("This is a centered text")
      .size(28)
      .align("center")
      .breakpoint(
        BREAKPOINTS.Mobile,
        (mobile) =>
          mobile
            .size(10)
            .color(COLORS.Red),
      ),
  ).background(COLORS.Green),
);
