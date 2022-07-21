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
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
const StartTemp = [JavaDefault, JsDefault, PythonDefault]


export const AceEditorPlayer = (props) => {
    const { mode, setCode } = props;
    const selected = useSelector((state) => state.user.selected)
    function onChangeOne(newValue) {
        setCode(newValue);
    }

    const DefaultTemp = "//함수와 변수를 임의로 변경하지 마세요" + `\n` + StartTemp[parseInt(selected.language)];

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
                    // fontFamily:"Neo",
                }}
                value={DefaultTemp}
                placeholder="Placeholder Text"
            />
        </>
    );
};

export const AceEditorOpp = (props) => {
    const { mode, opCode } = props;
    const selected = useSelector((state) => state.user.selected)
    function onChangeTwo(newValue) {
        console.log('2:', newValue);
    }

    const DefaultTempTwo =
        '//함수와 변수를 임의로 변경하지 마세요' + `\n` + StartTemp[parseInt(selected.language)];
    return (
        <>
            <AceEditor
                width="100%"
                height="100%"
                style={{ borderRadius: '3px' }}
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
                value={DefaultTempTwo}
                // {opCode}
                placeholder="Placeholder Text"
            />
        </>
    );
};
