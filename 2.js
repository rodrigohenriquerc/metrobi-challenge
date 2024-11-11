const writeAsync = (arr, i = 0, delay = 1) => {
  if (!arr[i]) {
    return;
  }

  setTimeout(() => {
    console.log(arr[i]);
  }, delay * 1000);

  writeAsync(arr, i + 1, delay * 2);
};
