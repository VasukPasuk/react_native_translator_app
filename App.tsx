import {Animated, Button, StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import {useEffect, useRef, useState} from "react";
import DropDownSelectLanguage from "./src/components/DropDownSelectLanguage";
import {SafeAreaView} from 'react-native-safe-area-context';
import translate from "./src/api/translate.api";

type Config = {
  outputLang: string,
  translatedText: string,
  textToTranslate: string,
};

export default function App() {
  const [config, setConfig] = useState<Config>({
    outputLang: 'en',
    textToTranslate: '',
    translatedText: '',
  });

  const richText = useRef<RichEditor>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, width: '100%', padding: 15}}>
        <View style={{flexDirection: 'row', columnGap: 15}}>
          <DropDownSelectLanguage
            onLanguageChange={(language) =>
              setConfig(prev => ({...prev, outputLang: language}))
            }
          />
        </View>

        <View style={{rowGap: 15, marginTop: 5}}>
          <TextInput
            placeholder="Текст до перекладу"
            multiline
            editable
            numberOfLines={8}
            maxLength={1000}
            textAlignVertical="top"
            onChangeText={(text) =>
              setConfig(prev => ({...prev, textToTranslate: text}))
            }
            style={styles.input}
            value={config.textToTranslate}
          />
          <Button
            title="Перевести"
            onPress={async () => {
              try {
                const res = await translate({
                  text: config.textToTranslate,
                  outputLang: config.outputLang,
                });
                setConfig(prev => ({
                  ...prev,
                  translatedText: res.data[0][0][0],
                }));
                richText.current?.setContentHTML(res.data[0][0][0]);
              } catch (error) {
                console.error('Translation error:', error);
              }
            }}
          />
        </View>

        <View style={styles.richEditorContainer}>
          <RichEditor
            ref={richText}
            placeholder="Start writing here..."
            initialHeight={200}
            editorStyle={{
              backgroundColor: '#fff',
              color: '#000',
            }}
            initialContentHTML={config.translatedText}
            onChange={(html) =>
              setConfig(prev => ({...prev, translatedText: html}))
            }
          />
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.undo,
              actions.redo,
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
});
