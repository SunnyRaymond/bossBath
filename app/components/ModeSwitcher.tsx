import React from "react";

interface ModeSwitcherProps {
  mode: "raymond" | "hannah";
  onToggle: (mode: "raymond" | "hannah") => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  mode,
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-full p-1 shadow-lg">
        <button
          className={`transition-all duration-300 px-4 py-2 rounded-full font-semibold focus:outline-none ${
            mode === "raymond"
              ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md scale-105"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => onToggle("raymond")}
        >
          Raymond
        </button>
        <div className="w-2" />
        <button
          className={`transition-all duration-300 px-4 py-2 rounded-full font-semibold focus:outline-none ${
            mode === "hannah"
              ? "bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-md scale-105"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => onToggle("hannah")}
        >
          Hannah
        </button>
      </div>
    </div>
  );
};
