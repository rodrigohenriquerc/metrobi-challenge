const checkBrackets = (input) => {
  const brackets = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  const open = [];

  let isValid = true;

  for (let bracket of input) {
    if (brackets[bracket]) {
      open.push(bracket);
    } else {
      const lastOpen = open.pop();

      if (brackets[lastOpen] === bracket) {
        continue;
      } else {
        isValid = false;
        break;
      }
    }
  }

  if (open.length) {
    isValid = false;
  }

  return isValid;
};
