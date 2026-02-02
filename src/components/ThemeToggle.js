import React from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full 
                 bg-white/10 backdrop-blur-md
                 border border-orange-300/50 dark:border-purple-400/30
                 transition-all duration-300 ease-in-out
                 hover:scale-110 hover:bg-white/20
                 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-purple-400"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>

        
      {theme === 'dark' ? (
        <BsSun className="w-5 h-5 text-yellow-300 animate-spin-slow transition-all duration-300" style={{ animation: 'spin 20s linear infinite' }}/>) 
        : (
        <BsMoon className="w-5 h-5 text-purple-600 transition-all duration-300"/>)}
    </button>
  );
}

export default ThemeToggle;
