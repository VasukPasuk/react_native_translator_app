import {StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from "../hooks/useTheme";
import {Theme} from "./ThemeProvider";
import {COLORS} from "../constants";

export default function SelectTheme({onThemeChange}: { onThemeChange?: (theme: Theme) => void }) {
  const {setTheme, theme} = useTheme()

  const themeElement = {
    [Theme.light]: {
      icon: 'sun',
      next: Theme.dark,
    },
    [Theme.dark]: {
      icon: 'moon',
      next: Theme.pink,
    },
    [Theme.pink]: {
      icon: 'heart',
      next: Theme.light,
    },
  }[theme]

  return (
    <View style={{...styles.container}}>
      <Icon
        color={COLORS[theme].SECOND_COLOR}
        size={22}
        name={themeElement.icon}
        onPress={() => {
          setTheme(prev => themeElement.next)
          onThemeChange && onThemeChange(themeElement.next)
        }}
        style={{...styles.icon, borderColor: COLORS[theme].SECOND_COLOR}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',

  },
  icon: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 0.25,

  }
});
