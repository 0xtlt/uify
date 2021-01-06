# Img Component

## Introduction :

Simple img

## Usage :

```ts
Img(src: string, alt: string, params?: ImgParams);
```

## Img Params :

```ts
type ImgParams = {
  fit?: "contain" | "cover" | "fill" | "revert" | "scale-down";
  srcset?: { [key: string]: string };
  preset?: "coverAll";
};
```

### Preset :

`coverAll` will make your image style with :

```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
