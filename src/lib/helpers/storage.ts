export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

// Session storage utils
export const getSessionStorage = (key: string) => {
  const item = sessionStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
};

export const setSessionStorage = (
  key: string,
  value: object | string | number | boolean
) => sessionStorage.setItem(key, JSON.stringify(value));

export const removeSessionStorage = (key: string) =>
  sessionStorage.removeItem(key);

export const clearSessionStorage = () => sessionStorage.clear();

// Local storage utils
export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
};

export const setLocalStorage = (
  key: string,
  value: object | string | number | boolean
) => localStorage.setItem(key, JSON.stringify(value));

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

export const clearLocalStorage = () => localStorage.clear();
