# UIFY

Make your next web app with Deno 🐱‍🐉

UIFY is the fusion of two ideas: the one which was to abandon react for "simple" interfaces and the one which consists in recreating a framework similar to the one that Apple created with SwiftUI

Exemple :

```typescript
export default Grid(
  {
    columns: [1, 2, 1],
    rows: 1,
    gapHorizontal: 15,
    gapVertical: 10,
  },
  HStack(Text("This is a text").color(COLORS.Red)),
  Img("https://source.unsplash.com/random/800x600", "unsplash image", {
    preset: "coverAll",
  }),
  HStack(
    Text("This is a centered text")
      .size(28)
      .align("center")
      .breakpoint(BREAKPOINTS.Mobile, (mobile) =>
        mobile.size(10).color(COLORS.Red),
      ),
  ).background(COLORS.Green),
);
```

Becomes

`HTML`

```html
<div class="c_3bf7863">
  <div class="c_15b25b7"><p class="c_9bf57a6">This is a text</p></div>
  <img
    src="https://source.unsplash.com/random/800x600"
    alt="unsplash image"
    class="c_cc3e443"
  />
  <div class="c_e7baf34"><p class="c_ab41293">This is a centered text</p></div>
</div>
```

`CSS`

```css
.c_3bf7863 {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px 15px;
}
.c_15b25b7 {
  display: flex;
}
.c_9bf57a6 {
  color: #ff6b6b;
}
.c_cc3e443 {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.c_e7baf34 {
  display: flex;
  background: #1dd1a1;
}
.c_ab41293 {
  font-size: 28px;
  margin: auto;
}
@media screen and (max-width: 375px) {
  .c_ab41293 {
    font-size: 10px;
    color: #ff6b6b;
  }
}
```

## Getting started

Getting started with UIFY is easy.

## Import UIFY

```ts
import * from "https://raw.githubusercontent.com/techtastet/uify/main/mod.ts"
```

## Component Working

Because everything is a component in UIFY, you need to know theses things before starting.

Component class initiation looks like this

### Component

```ts
new Component(type: string, ...childrens: Component[]);
// ex:
new Component("div");
new Component("div", new Component("div"), new Component("div", new Component("div")))
```

You can obviously create your own Component by extending the Component class.  
Exemple with the TextComponent

```ts
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
```

By the way, the Component class has many prototypes that will allow you to customize your elements as much as possible, and elements have already been created and optimized for you, here is the link leading to the doc :

[Component documentation](/doc/component.md)

## Default project organization

```
project folder/
├── dist/
├── src/
│   └── pages/
│       ├── index.ts
│       └── article.ts
│
└── blog.ts
```
