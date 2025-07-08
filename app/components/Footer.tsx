import React from "react";

export const Footer: React.FC = () => (
  <footer className="w-full flex flex-col items-center justify-center mt-12 mb-4 px-2">
    <div className="max-w-xs w-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900 rounded-full px-4 py-3 shadow-lg flex flex-col sm:flex-row items-center justify-center gap-2 text-pink-700 dark:text-pink-200 font-semibold text-base sm:text-lg mx-auto">
      Built with <span className="animate-pulse">💖</span> for Hannah
      <span className="mx-2">|</span>
      <a
        href="https://guoyichen.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-500 transition flex items-center gap-1"
      >
        <span role="img" aria-label="author">
          👨‍💻
        </span>{" "}
        guoyichen.netlify.app
      </a>
    </div>
  </footer>
);
