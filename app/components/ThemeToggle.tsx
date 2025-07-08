import React, { useEffect, useState } from "react";

const THEME_KEY = "theme-preference";
type Theme = "light" | "dark" | "system";

const icons = {
  light: (
    <span role="img" aria-label="light" className="text-yellow-400 text-xl">
      🌞
    </span>
  ),
  dark: (
    <span role="img" aria-label="dark" className="text-green-700 text-xl">
      🌙
    </span>
  ),
  system: (
    <span role="img" aria-label="system" className="text-yellow-600 text-xl">
      💻
    </span>
  ),
};

function applyTheme(theme: Theme) {
  const root = window.document.documentElement;
  if (theme === "system") {
    localStorage.removeItem(THEME_KEY);
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  } else if (theme === "dark") {
    root.classList.add("dark");
    localStorage.setItem(THEME_KEY, "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem(THEME_KEY, "light");
  }
}

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(THEME_KEY) as Theme) || "system";
    }
    return "system";
  });

  useEffect(() => {
    applyTheme(theme);

    let mq: MediaQueryList;
    const systemHandler = (e: MediaQueryListEvent) => {
      if ((localStorage.getItem(THEME_KEY) as Theme) === "system") {
        applyTheme("system");
      }
    };

    if (theme === "system") {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", systemHandler);
      return () => mq.removeEventListener("change", systemHandler);
    }
  }, [theme]);

  return (
    <div className="flex items-center justify-center gap-2 bg-white dark:bg-gray-900 rounded-full shadow px-2 py-1 border-2 border-yellow-300 dark:border-green-700">
      {(["light", "system", "dark"] as Theme[]).map((t) => (
        <button
          key={t}
          className={`transition px-3 py-1 rounded-full font-bold flex items-center gap-1 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            theme === t
              ? "bg-yellow-200 dark:bg-green-800 shadow"
              : "hover:bg-yellow-100 dark:hover:bg-green-900"
          }`}
          onClick={() => setTheme(t)}
          aria-pressed={theme === t}
        >
          {icons[t]}
          <span className="hidden sm:inline capitalize text-yellow-700 dark:text-green-200 text-base">
            {t}
          </span>
        </button>
      ))}
    </div>
  );
};
