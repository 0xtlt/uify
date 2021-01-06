function arrayGenerator(value: any, times: number): any[] {
  const array: any[] = [];

  array.length = times;
  array.fill(value);

  return array;
}

export default arrayGenerator;
