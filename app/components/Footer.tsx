import React from "react";

export const Footer: React.FC = () => (
  <footer className="w-full flex flex-col items-center justify-center mt-12 mb-4 px-2">
    <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900 rounded-full px-4 py-3 shadow-lg text-pink-700 dark:text-pink-200 font-semibold text-base sm:text-lg mx-auto max-w-full">
      <span className="text-center">
        Built with <span className="animate-pulse">💖</span> for Hannah
      </span>
      <span className="mx-2 hidden sm:inline">|</span>
      <a
        href="https://guoyichen.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-500 transition flex items-center gap-1 break-all text-center"
      >
        <span role="img" aria-label="author">
          👨‍💻
        </span>{" "}
        guoyichen.netlify.app
      </a>
    </div>
  </footer>
);
