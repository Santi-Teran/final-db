"use client";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
      if (savedMode === "true") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", !darkMode);
  };

  return (
    <div
      className="flex items-center justify-between p-2 w-20 bg-gray-200 dark:bg-gray-800 rounded-full cursor-pointer"
      onClick={toggleDarkMode}
    >
      <FaSun
        className={`${
          !darkMode ? "text-yellow-400 bg-white" : "text-gray-400"
        } p-1 rounded-full transition duration-300`}
        size={24}
      />
      <FaMoon
        className={`${
          darkMode ? "text-blue-400 bg-white" : "text-gray-400"
        } p-1 rounded-full transition duration-300`}
        size={24}
      />
    </div>
  );
};

export default ThemeToggle;
