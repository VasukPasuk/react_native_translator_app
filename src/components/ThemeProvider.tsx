import React, {createContext, useState} from 'react';

export enum Theme {
  light = 'light',
  dark = 'dark',
  pink = 'pink',
}

export const ThemeContext = createContext<{
  theme: Theme,
  setTheme: React.Dispatch<React.SetStateAction<Theme>>,
}>({
  theme: Theme.light,
  setTheme: () => {},
});


export function ThemeProvider({children}: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(Theme.light)

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}