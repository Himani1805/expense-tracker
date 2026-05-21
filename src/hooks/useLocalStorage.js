import { useState, useEffect } from 'react';

/**
 * Custom hook to manage synchronization with window.localStorage
 * Provides a stateful interface for persistent storage
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("LocalStorage read error: ", error);
      return initialValue;
    }
  });

  // Keep localStorage updated whenever storedValue or key changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("LocalStorage write error: ", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}