import { useEffect, useState } from "react";

const UseDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // console.log(`Debounced value set to: ${value} after ${delay}ms`);
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceTimer);
      // console.log(`Debounced value cleared: ${value}`);
    };
  }, [value, delay]);

  return debounceValue;
};

export default UseDebounce;
