import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme(); // proviene de context

  return (
    <button
      onClick={toggleTheme}
      className=" rounded-lg text-black hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
    >
      {theme === "light" ? (
        <FaMoon className="text-black dark:text-white" />
      ) : (
        <FaSun className="text-black dark:text-white" />
      )}
    </button>
  );
}
