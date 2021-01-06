# Grid Component

## Introduction :

Generate a simple grid

## Usage :

```ts
Grid(params: GridParams, ...childrens: Component[]);
```

## Grid Params :

```ts
type GridParams = {
  columns?: Size[] | number;
  rows?: Size[] | number;
  gapHorizontal?: Size;
  gapVertical?: Size;
};
```

### Columns and Rows :

It can be a number to directly define the number of columns (ex : `2 = 1fr 1fr`)

Or an array with number and string, `number = fr`

### GapHorizontal and GapVertical

it can be a string or a number, `number = px`
