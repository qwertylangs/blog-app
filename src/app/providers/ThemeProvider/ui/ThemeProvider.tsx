import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { getUserInited, useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    initialTheme,
    children,
  } = props;

  const userInited = useSelector(getUserInited);
  const { theme: defaultTheme } = useJsonSettings();

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.LIGHT);

  useEffect(() => {
    if (userInited) {
      setTheme(defaultTheme || Theme.LIGHT);
    }
  }, [defaultTheme, userInited]);

  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
