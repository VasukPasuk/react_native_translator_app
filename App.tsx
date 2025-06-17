import {Button, Image, Platform, StyleSheet, Text, View} from 'react-native';
import {RichEditor} from "react-native-pell-rich-editor";
import {useRef, useState} from "react";
import DropDownSelectLanguage from "./src/components/DropDownSelectLanguage";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import translate from "./src/api/translate.api";
import {COLORS} from "./src/constants";
import SelectTheme from "./src/components/SelectTheme";
import {useTheme} from "./src/hooks/useTheme";
import {ThemeProvider} from "./src/components/ThemeProvider";

type Config = {
  outputLang: string,
  translatedText: string,
  textToTranslate: string,
};

const PlatformRichEditor = Platform.select({
  web: () => require('./src/components/editors/WebCompatibleRichEditor').default,
  default: () => require('./src/components/editors/MobileCompatibleRichEditor').default,
})();


function TranslateEditor() {
  const [config, setConfig] = useState<Config>({
    outputLang: 'en',
    textToTranslate: '',
    translatedText: '',
  });

  const {theme} = useTheme()

  const setConfigTranslatedText = (html: string) => setConfig(prev => ({...prev, textToTranslate: html}))

  const richText = useRef<RichEditor>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{...styles.container, backgroundColor: COLORS[theme].APP_MAIN_BG_COLOR}}>
        <View style={{flex: 1, width: '100%', padding: 15}}>
          <View style={{flexDirection: 'row', columnGap: 15, width: '100%'}}>
            <DropDownSelectLanguage
              onLanguageChange={(language) => {
                setConfig(prev => ({...prev, outputLang: language}))
              }}
            />
            <SelectTheme onThemeChange={(newTheme) => setConfig(prev => ({...prev, theme: newTheme}))}/>
          </View>


          <View style={styles.richEditorContainer}>
            <PlatformRichEditor
              setTextToTranslate={setConfigTranslatedText}
              initialContentHTML={config.textToTranslate}
              richText={Platform.OS === "web" ? null : richText}
            />
            <Button
              title="Перевести"
              color={COLORS[theme].FIRST_COLOR}
              onPress={async () => {
                try {
                  const res = await translate({
                    text: config.textToTranslate,
                    outputLang: config.outputLang,
                  });


                  setConfig(prev => ({
                    ...prev,
                    translatedText: res.data[0][0][0],
                    textToTranslate: res.data[0][0][0]
                  }));
                  richText.current?.setContentHTML(res.data[0][0][0]);
                } catch (error) {
                  console.error('Translation error:', error);
                }
              }}
            />
          </View>

          <View style={styles.footer}>
            <Text style={{fontStyle: 'italic', color: COLORS[theme].SECOND_COLOR}}>
              Made by mekoya
            </Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('./assets/logo.png')} style={{width: 45, height: 45}}>

              </Image>
              <Text style={{color: COLORS[theme].SECOND_COLOR}}>
                2025
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TranslateEditor/>
    </ThemeProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    minHeight: 75,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  richEditorContainer: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 15,
    marginTop: 15,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    paddingLeft: 20,
    paddingBottom: 15,
    bottom: 0,
    width: '100%',
  }
});
