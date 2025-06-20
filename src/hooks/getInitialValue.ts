export const getInitialValue = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : "Значение по умолчанию";
  } catch (error) {
    console.error("Ошибка при чтении из localStorage:", error);
    return "Значение по умолчанию";
  }
};
