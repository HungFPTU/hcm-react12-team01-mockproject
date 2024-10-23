export const getItemInLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || 'null');
  };
  
  export const removeItemInLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  export const setItemInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};