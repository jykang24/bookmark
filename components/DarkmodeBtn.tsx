'use client';

import useThemeStore from '@/app/store';
import { Moon, Sun } from 'lucide-react';

export default function DarkmodeBtn() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  return (
    <button onClick={toggleDarkMode}>{isDarkMode ? <Moon /> : <Sun />}</button>
  );
}
