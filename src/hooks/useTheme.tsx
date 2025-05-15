import {useContext} from "react";
import {ThemeContext} from "../components/ThemeProvider";

export function useTheme() {
  const {setTheme, theme} = useContext(ThemeContext);
  return {
    setTheme,
    theme
  }
}