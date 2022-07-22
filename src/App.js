import { Routes, Route, Navigate } from "react-router-dom";
import Start from "./pages/Start/Start";
import Main from "./pages/Main/Main";

import Battle from "./pages/Battle/Battle";
import Selection from "./pages/Selection/Selection";
import "./App.css";
import "./animation.css";
import GitLogin from "./pages/Start/components/GitLogin";
import TutorialBtn from "./pages/Tutorial/TutorialBtn";
import SoundSettingBtn from "./shared/SoundSettingBtn";

import { useSelector } from "react-redux";
import useSound from "./shared/useSound";
import mainBgm from "./audios/main_bgm.mp3";
import React from "react";

function App() {
  const volume = useSelector((state) => state.user.sound);
  const [mbmute, setMbmute] = React.useState(false);
  useSound(mainBgm, volume.bgm, mbmute);
  const token = sessionStorage.getItem("Authorization");
  const logined = () => {
    if (token === null) {
      return true;
    } else {
      return false;
    }
  };

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
