import { useState, useEffect } from "react";

export default function WelcomeModal({ empresa }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window === "undefined") return;
    
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (hasSeenWelcome) return;

    setTimeout(() => setIsVisible(true), 100);

    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem("hasSeenWelcome", "true");
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ease-in-out ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-[90%] sm:max-w-sm mx-4 text-center transition-opacity duration-300 ease-in-out ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
      >
        <h2 className="text-xl sm:text-2xl font-sans font-semibold text-gray-800 mb-2 tracking-tight">
          {empresa.slogan ?? "Bienvenido"}
        </h2>
        <p className="text-xs sm:text-sm font-sans font-normal text-gray-600">
          {empresa.nombre}
        </p>
      </div>
    </div>
  );
}

