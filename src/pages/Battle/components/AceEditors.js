import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

export const AceEditorPlayer = (props) => {
  const { mode, codeRef } = props;

  function onChangeOne(newValue) {
    codeRef.current = newValue;
  }
  return (
    <>
      <AceEditor
        height="93%"
        width="100%"
        style={{ borderRadius: "3px" }}
        mode={mode}
        theme="monokai"
        onChange={onChangeOne}
        fontSize={15}
        showPrintMargin={false}
        editorProps={{ $blockScrolling: true }}
        highlightActiveLine={true}
        cursorStart={2}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          tabSize: 4,
        }}
        value={codeRef.current}
        placeholder="게임 시작 후 나옵니다."
      />
    </>
  );
};

export const AceEditorOpp = (props) => {
  const { mode, opCode } = props;
  function onChangeTwo(newValue) {
    console.log("2:", newValue);
  }

  return (
    <>
      <AceEditor
        width="100%"
        height="100%"
        style={{ borderRadius: "3px" }}
        mode={mode}
        theme="monokai"
        fontSize={15}
        onChange={onChangeTwo}
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        readOnly={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={opCode.current}
        placeholder="상대방 코드가 입력될 것입니다."
      />
    </>
  );
};
