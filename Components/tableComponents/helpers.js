export const sortArray = (arr = [], oKey, oDir = "asc") => {
  if (!oKey) return arr;
  return arr.sort((obj1, obj2) => {
    if (oDir.toLocaleLowerCase() === "asc") {
      return obj1[oKey] > obj2[oKey] ? 1 : -1;
    } else {
      return obj1[oKey] > obj2[oKey] ? -1 : 1;
    }
  });
};

export const searchArray = (arr, term, onlyKeys = null) => {
  if (!term || term.length < 1) return arr;
  const regx = new RegExp(term.trim(), "i");
  return arr.filter((obj) => {
    const objKeys =
      onlyKeys && onlyKeys.length > 0 ? onlyKeys : Object.keys(obj);
    return objKeys
      .map((k) => obj[k])
      .join("|")
      .match(regx);
  });
};
