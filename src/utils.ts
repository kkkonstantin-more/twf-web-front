const createArrayWithOneValue = (value: any, length: number): any[] => {
  const arr = [];
  for (let i: number = 0; i < length; i++) arr.push(value);
  return arr;
};

export { createArrayWithOneValue };
