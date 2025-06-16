import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import {COLORS} from "../../constants";
import {useRef} from "react";
import {useTheme} from "../../hooks/useTheme";

interface MobileCompatibleRichEditorProps {
  initialContentHTML: string,
  setTextToTranslate: (html: string) => void,
}

function MobileCompatibleRichEditor({setTextToTranslate, initialContentHTML}: MobileCompatibleRichEditorProps) {
  const {theme} = useTheme()
  const richText = useRef<RichEditor>(null);
  return (
    <>
      <RichEditor
        ref={richText}
        initialHeight={200}
        editorStyle={{
          backgroundColor: COLORS[theme].APP_MAIN_BG_COLOR,
          color: COLORS[theme].SECOND_COLOR,
        }}
        initialContentHTML={initialContentHTML}
        onChange={(html) => {
          setTextToTranslate(html)
          // setConfig(prev => ({...prev, textToTranslate: html}))
        }}
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
        style={{
          backgroundColor: COLORS[theme].THIRD_COLOR,
        }}
      />
    </>
  )
}

export default MobileCompatibleRichEditor;