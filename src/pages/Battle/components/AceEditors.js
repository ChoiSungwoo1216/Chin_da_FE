import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';

export const AceEditorPlayer = (props) => {
    const { mode, theme } = props;
    function onChangeOne(newValue) {
        console.log('1:', newValue);
    }
    const JsDefault = `function solution(num) { 
    var answer = '';
        return answer;
}`;
    const JavaDefault = `public String solution(int num) {
    String answer = '';
        return answer;
}`
    const PythonDefault = `def solution(num):
        answer = ''
        return answer`;
    const DefaultTemp = "//함수와 변수를 임의로 변경하지 마세요" + `\n` + JavaDefault;

    return (
        <>
            <AceEditor
                height="93%"
                width="100%"
                style={{borderRadius:"3px"}}
                mode={mode}
                theme={theme}
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
                    // fontFamily:"Neo",
                }}
                value={DefaultTemp}
                placeholder="Placeholder Text"
            />
        </>
    );
};

export const AceEditorOpp = (props) => {
   const { mode, theme } = props;

   function onChangeTwo(newValue) {
      console.log('2:', newValue);
   }

   const JsDefault = `function solution(num) { 
        var answer = '';
           return answer;
     }`;

   const JavaDefault = `public String solution(int num) {
    String answer = '';
        return answer;
}`;

   const PythonDefault = `def solution(num):
        answer = ''
        return answer`;

   const DefaultTempTwo =
      '//함수와 변수를 임의로 변경하지 마세요' + `\n` + JavaDefault;
   return (
      <>
         <AceEditor
            width="100%"
            height="100%"
            style={{ borderRadius: '3px' }}
            mode={mode}
            theme={theme}
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
            value={DefaultTempTwo}
            placeholder="Placeholder Text"
         />
      </>
   );
};
