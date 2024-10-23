export const getItemInLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || 'null');
  };
  
  export const removeItemInLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  