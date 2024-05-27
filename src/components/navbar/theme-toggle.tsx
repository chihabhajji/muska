'use client';

import { useTheme } from 'next-themes';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import * as m from '@/paraglide/messages';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={m.theme_toggle_label()}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Icons.sun className="dark:hidden" />
      <Icons.moon className="hidden dark:block" />
    </Button>
  );
};
