'use client';

import useThemeStore from '@/app/store';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

export default function DarkmodeBtn() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <button onClick={toggleDarkMode}>{isDarkMode ? <Moon /> : <Sun />}</button>
  );
}
