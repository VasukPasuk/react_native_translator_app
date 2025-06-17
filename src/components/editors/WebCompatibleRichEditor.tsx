import ReactQuill from "react-quill-new";
import React, {useMemo} from "react";
import 'react-quill-new/dist/quill.snow.css';
import {COLORS} from "../../constants";
import {useTheme} from "../../hooks/useTheme";
import {RichEditor} from "react-native-pell-rich-editor";


interface WebCompatibleRichEditorProps {
  initialContentHTML: string,
  setTextToTranslate: (html: string) => void,
  richText: React.RefObject<RichEditor | null>
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
];


function WebCompatibleRichEditor({initialContentHTML, setTextToTranslate}: WebCompatibleRichEditorProps) {
  const {theme} = useTheme()
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'size': ['small', false, 'large', 'huge']}],
        ['bold', 'italic', 'underline', 'strike'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  }), []);
  return (
    <div>
      <ReactQuill
        theme={"snow"}
        value={initialContentHTML}
        onChange={(text) => setTextToTranslate(text)}
        modules={modules}
        formats={formats}
        style={{
          minHeight: 150,
          color: COLORS[theme].SECOND_COLOR
        }}
      />
    </div>

  );
}

export default WebCompatibleRichEditor;