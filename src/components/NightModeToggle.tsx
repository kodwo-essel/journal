import { useState, useEffect } from 'react';

export default function NightModeToggle() {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nightMode');
    if (saved === 'true') {
      setIsNightMode(true);
      document.body.classList.add('night-mode');
    }
  }, []);

  const toggleNightMode = () => {
    const newMode = !isNightMode;
    setIsNightMode(newMode);
    localStorage.setItem('nightMode', newMode.toString());
    
    if (newMode) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
  };

  return (
    <button
      onClick={toggleNightMode}
      className="w-10 h-10 flex items-center justify-center border border-neutral-200 hover:border-black transition-colors cursor-pointer"
    >
      <i className={isNightMode ? "ri-sun-line" : "ri-moon-line"}></i>
    </button>
  );
}