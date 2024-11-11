const getMaxValue = (carrotTypes, capacity) => {
  const bag = new Array(capacity + 1).fill(0);

  for (let i = 1; i <= capacity; i++) {
    for (const carrot of carrotTypes) {
      const { weight, value } = carrot;
      if (weight <= i) {
        bag[i] = Math.max(bag[i], bag[i - weight] + value);
      }
    }
  }

  return bag[capacity];
};

module.exports = { getMaxValue };
