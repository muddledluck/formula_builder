const sign = ["+", "-", "*", "/"];
export const validateArthmaticString = (str) => {
  const validBracket = validateBrackets(str);
  if (!validBracket.isValid) {
    return {
      validate: false,
      message: "invalid breacket",
      idx: validBracket.idx,
    };
  }
  const isValid = validateSign(str);
  if (!isValid) {
    return { validate: false, message: "invalid sign" };
  }
  return { validate: true, message: "Valid string" };
};

const validateBrackets = (str) => {
  const bracketStack = [];
  for (let i = 0; i < str.length; i++) {
    let val = str[i];
    if (val === "(") {
      bracketStack.push({ val, idx: i });
    } else if (val === ")") {
      if (bracketStack.length) {
        bracketStack.pop();
        continue;
      } else {
        return { isValid: false, idx: i };
      }
    }
  }
  if (bracketStack.length) {
    return { isValid: false, idx: bracketStack[bracketStack.length - 1].idx };
  } else {
    return { isValid: true };
  }
};

const validateSign = (str) => {
  if (sign.includes(str[0]) || sign.includes(str[str.length - 1])) {
    return false;
  }
  let prev = "";
  for (let i = 0; i < str.length; i++) {
    if (sign.includes(prev) && sign.includes(str[i])) {
      return false;
    }
    prev = str[i];
  }
  return true;
};
