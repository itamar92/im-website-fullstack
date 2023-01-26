
const setItem = async (key: string, item: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(item));
    return Promise.resolve(item);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getItem = async (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (err) {
    return err;
  }
};

const removeItem = async (key: string) => {
  try {
    localStorage.removeItem(key);
    return Promise.resolve(key);
  } catch (err) {
    return Promise.reject(err);
  }
};

const clear = async () => {
  localStorage.clear();
  return Promise.resolve();
};

export { setItem, getItem, removeItem, clear };
