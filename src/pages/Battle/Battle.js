import React from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import AceEditor from 'react-ace';
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

import Modal from 'react-modal';
import CountDown from './components/CountDown';
import Accordion from './components/Accordion';

Modal.setAppElement('#root');

const Battle = () => {
    const [showModal, setShowModal] = React.useState(true);
    const [modeOne, setModeOne] = React.useState('java');
    const [themeOne, setThemeOne] = React.useState('monokai');
    const [modeTwo, setModeTwo] = React.useState('javascript');

    const onChangethemeOne = (e) => {
    e.preventDefault();
    setThemeOne(e.target.value);
    };

    const onChangeModeOne = (e) => {
    e.preventDefault();
    setModeOne(e.target.value);
    };
    const onChangeModeTwo = (e) => {
    e.preventDefault();
    setModeTwo(e.target.value);
    };

    function onChangeOne(newValue) {
    console.log('1: ', newValue);
    }
    function onChangeTwo(newValue) {
    console.log('2 :', newValue);
    }

    function valueType(mode) {
    if (mode === 'java') {
        return JavaPlace;
    } else if (mode === 'javascript') {
        return JsPlace;
    } else {
        return '';
    }
    }

    const JsPlace = `function solution(num) { 
        var answer = '';
        return answer;
    }`;
    const JavaPlace = `class Solution { 
        public String solution(int num) {
        String answer = '';
            return answer;
    } 
    }`;
    
    return (
       <>
          <Container>
             {showModal ? (
                <Modal
                   isOpen={showModal}
                   onRequestClose={() => setShowModal(false)}
                   style={{
                      width: '70%',
                   }}
                >
                   <ModalBtn
                      src="/img/X_btn_white_50.png"
                      onClick={() => setShowModal(false)}
                   >
                      Close
                   </ModalBtn>
                </Modal>
             ) : (
                <>
                   <Section>
                      <div>
                         {/* <select
                      type="text"
                      value={modeOne}
                      onChange={onChangeModeOne}
                   >
                      <option value="java">java</option>
                      <option value="javascript">javascript</option>
                   </select>
                   <select
                      type="text"
                      value={themeOne}
                      onChange={onChangethemeOne}
                   >
                      <option value="monokai">monokai</option>
                      <option value="github">github</option>
                      <option value="tomorrow">tomorrow</option>
                      <option value="kuroir">kuroir</option>
                      <option value="twilight">twilight</option>
                      <option value="xcode">xcode</option>
                      <option value="textmate">textmate</option>
                      <option value="solarized_dark">solarized_dark</option>
                      <option value="solarized_light">solarized_light</option>
                      <option value="terminal">terminal</option>
                   </select> */}
                         <AceEditor
                            style={{
                               width: 700,
                               margin: 5,
                            }}
                            mode={modeOne}
                            theme={themeOne}
                            onChange={onChangeOne}
                            fontSize={15}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                            highlightActiveLine={true}
                            setOptions={{
                               enableBasicAutocompletion: true,
                               enableLiveAutocompletion: true,
                               enableSnippets: true,
                               tabSize: 4,
                            }}
                            value={valueType(modeOne)}
                            placeholder="Placeholder Text"
                         />
                      </div>
                      <div>
                         <h5></h5>
                         {/* <select type="text" value={modeTwo} onChange={onChangeModeTwo}>
                   <option value="javascript">javascript</option>
                   <option value="java">java</option>
                </select> */}
                         <AceEditor
                            style={{
                               width: 700,
                               height: 300,
                               margin: 5,
                            }}
                            mode={modeTwo}
                            theme="github"
                            onChange={onChangeTwo}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                            highlightActiveLine={true}
                            setOptions={{
                               enableBasicAutocompletion: true,
                               enableLiveAutocompletion: true,
                               enableSnippets: true,
                            }}
                            value={valueType(modeTwo)}
                            placeholder="Placeholder Text"
                         />
                      </div>
                   </Section>
                   <Accordion />
                   <Aside>
                      <Input />
                   </Aside>
                   <CountDown />
                </>
             )}
          </Container>
       </>
    );
}

export default Battle;

const ModalBtn = styled.button`
   position: absolute;
   width: 30px;
   height: 30px;
   left: 919px;
   top: 135px;
`;

const Container = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   margin: auto;
`;

const Section = styled.section`
   display: flex;
   justify-content: center;
   margin: auto;
`;

const Aside = styled.aside`
   margin: auto;
   width: 300px;
   height: 500px;
   border: 1px solid;
`;

const Input = styled.input`
   align-items: center;
   justify-content: center;
`;