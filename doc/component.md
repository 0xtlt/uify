# Component ❄️

## List of all pre-built components :

- [Grid](/doc/components/Grid.md)
- [HStack](/doc/components/HStack.md)
- [Img](/doc/components/Img.md)
- [Text](/doc/components/Text.md)
- [VStack](/doc/components/VStack.md)

## List of all types

- [Size](/src/types/Size.ts)

## List of all pre-built constants :

- [Colors](/doc/constants/Colors.md)
- [Breakpoints](/doc/constants/Breakpoints.md)

## Component prototypes :

Align :

```ts
type alignment = "center";
new Component("div").align(alignment);
```

HMargin (horizontal margin) :

```ts
type value = Size;
new Component("div").HMargin(value);
```

VMargin (vertical margin) :

```ts
type value = Size;
new Component("div").VMargin(value);
```

marginLeft :

```ts
type value = Size;
new Component("div").marginLeft(value);
```

marginRight :

```ts
type value = Size;
new Component("div").marginRight(value);
```

marginTop :

```ts
type value = Size;
new Component("div").marginTop(value);
```

marginBottom :

```ts
type value = Size;
new Component("div").marginBottom(value);
```

alignText :

```ts
type alignment = "left" | "right" | "center";
new Component("div").alignText(alignment);
```

background :

```ts
type color = string;
new Component("div").background(color);
```

setAttribute :

```ts
new Component("div").setAttribute(
  key: string,
  value: string,
);
```

setStyle :

```ts
new Component("div").setStyle(
  key: string,
  value: string,
);
```

setHTML

```ts
new Component("div").setHTML(content: string);
```

breakpoint :

```ts
new Component("div").breakpoint(
  value: string | number,
  callbacks: (component: this) => any,
);

// ex :
new Component("div").breakpoint(
  370,
  (component) => {
      component.background("blue");
  }
);
```

CSS (return generated CSS) :

```ts
new Component("div").css;
```

HTML (return generated HTML) :

```ts
new Component("div").html;
```
