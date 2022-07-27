import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Start from "./pages/Start/Start.js";
import Main from "./pages/Main/Main.js";
import Battle from "./pages/Battle/Battle.js";
import Selection from "./pages/Selection/Selection.js";
import "./App.css";
import "./animation.css";
import GitLogin from "./pages/Start/components/GitLogin.js";
import TutorialBtn from "./pages/Tutorial/TutorialBtn.js";
import SoundSettingBtn from "./shared/SoundSettingBtn.js";

import { MainB, MainA } from "./shared/MainBgm"
import { useDispatch } from "react-redux";
import { editsound } from "./redux/modules/user.js";

function App() {
  const dispatch = useDispatch();
  const [mMute, setMMute] = React.useState(false);
  const [mbmute, setMbmute] = React.useState(false);
  const token = sessionStorage.getItem("Authorization");
  const logined = () => {
    if (token === null) {
      return true;
    } else {
      return false;
    }
  }
  //소리 로컬화
  useEffect(() => {
    if (localStorage.getItem("bgm") && localStorage.getItem("es")) {
      dispatch((editsound({ "bgm": Number(localStorage.getItem("bgm")), "es": Number(localStorage.getItem("es"))})))
    } else {
      localStorage.setItem("bgm", 0.1)
      localStorage.setItem("es", 0.5)
      dispatch((editsound({ bgm: Number(localStorage.getItem("bgm"))})))
      dispatch((editsound({ es: Number(localStorage.getItem("es"))})))
    }
  }, [])

  return (
    <div className="App">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <TutorialBtn />
      <SoundSettingBtn />
      {logined() ? (
        <>
          <MainA mMute={mMute} />
          <Routes>
            <Route path="/" element={<Start setMMute={setMMute} />} />
            <Route path="/github" element={<GitLogin setMMute={setMMute} />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      ) : (
        <>
          <MainB mbmute={mbmute} />
          <Routes>
            <Route path="/selection" element={<Selection />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route
              path="/battle/"
              element={<Battle setMbmute={setMbmute} />}
            ></Route>
            <Route
              path="/battle/:id"
              element={<Battle setMbmute={setMbmute} />}
            ></Route>
            <Route path="/*" element={<Navigate to="/selection" replace />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;