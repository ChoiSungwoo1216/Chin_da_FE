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

import { useSelector } from "react-redux";
import useSound from "./shared/useSound.js";
import mainBgm from "./audios/main_bgm.mp3";
import React from "react";

function App() {
  const volume = useSelector((state) => state.user.sound);
  const [mbmute, setMbmute] = React.useState(false);
  useSound(mainBgm, volume.bgm, mbmute);
  const token = sessionStorage.getItem("Authorization");
  const logined = () =>{
    if (token === null){
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="App">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <TutorialBtn />
      <SoundSettingBtn />
      <Routes>
        {logined() ? (
          <>
            <Route path="/" element={<Start />} />
            <Route path="/github" element={<GitLogin />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
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
            <Route path="/*" element={<Navigate to="/selection" replace  />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;