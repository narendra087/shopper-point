export const denominal = (value:number) => {
  const labels = ["rb", "jt", "M", "+M"];
  let checker = 1000;
  let result = 0;

  if (value < checker || !value) {
    return { index: 1, label: labels[0], result };
  }

  for (let i = 1; i < 4; i++) {
    result = Number((value / Math.pow(1000, i)).toFixed(0));
    if (i === 3) {
      checker = 100;
    }
    if (result < checker) {
      return { index: i, label: labels[i - 1], result };
    }
  }

  return { index: 3, label: labels[3], result: 100 };
};
