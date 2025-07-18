import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from "react-native-element-dropdown";
import {useState} from "react";
import {LANGUAGES, LanguageCode} from "../constants/languages";
import {COLORS} from "../constants";
import {useTheme} from "../hooks/useTheme";

interface DropDownSelectLanguageProps {
  onLanguageChange: (language: LanguageCode) => void;
}


export default function DropDownSelectLanguage({onLanguageChange}: DropDownSelectLanguageProps) {
  const [value, setValue] = useState<string>("Оберіть мову");
  const [isFocus, setIsFocus] = useState(false);
  const {theme} = useTheme()

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, {borderColor: COLORS[theme].SECOND_COLOR}, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={{...styles.placeholderStyle, color: COLORS[theme].SECOND_COLOR}}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={{...styles.inputSearchStyle, color: COLORS[theme].SECOND_COLOR}}
        containerStyle={{backgroundColor: COLORS[theme].APP_MAIN_BG_COLOR,}}
        iconStyle={styles.iconStyle}
        itemTextStyle={{color: COLORS[theme].SECOND_COLOR}}
        data={LANGUAGES}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Англійська' : '...'}
        searchPlaceholder="Пошук..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onLanguageChange(item.value)
          setValue(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 0.5
  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});