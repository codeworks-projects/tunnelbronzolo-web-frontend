export const sleep = (ms: number): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
};

export const deleteTypename = (item: any) => {
  delete item.__typename;
  return item;
};

export const isAnyKeyEmpty = (obj: any) => {
  return Object.values(obj).some((value) => !value && value !== false);
};

export const resetContactForm = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "boolean") {
        obj[key] = false;
      } else {
        obj[key] = "";
      }
    }
  }
};
