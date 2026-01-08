'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Language, translations } from '@/lib/i18n';
import Link from 'next/link';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'tr')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.cookie = `language=${lang}; path=/; max-age=31536000`; // 1 year
    window.location.reload();
  };

  const t = (key: string) => translations[language][key as keyof typeof translations[typeof language]] || key;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className=" flex h-14 items-center justify-between px-4">
          <Link
            href="/"
            className="text-sm font-medium text-text-gray-900 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <h1 className="text-lg font-semibold">{t('title')}</h1>
          </Link>
          <nav className=" ml-12 hidden md:flex items-center space-x-4 ">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/app"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {t('calculator')}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {t('contact')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <Select value={language} onValueChange={handleSetLanguage}>
            <SelectTrigger className="w-[100px]">
              <Languages className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="tr">Türkçe</SelectItem>
            </SelectContent>
          </Select>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}