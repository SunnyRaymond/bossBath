import { useState } from "react";
import { ModeSwitcher } from "../components/ModeSwitcher";
import { RaymondView } from "../raymond/RaymondView";
import { HannahView } from "../hannah/HannahView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [mode, setMode] = useState<"raymond" | "hannah">("raymond");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mt-10 mb-2 text-center bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        BossBath
      </h1>
      <ModeSwitcher mode={mode} onToggle={setMode} />
      <div className="w-full max-w-2xl px-4">
        {mode === "raymond" ? <RaymondView /> : <HannahView />}
      </div>
    </main>
  );
}
