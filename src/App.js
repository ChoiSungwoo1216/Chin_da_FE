import React from "react";
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

import MainB from "./shared/MainB"

function App() {
  const [mbmute, setMbmute] = React.useState(false);
  const token = sessionStorage.getItem("Authorization");
  const logined = () => {
    if (token === null) {
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
      {/* <Routes> */}
      {logined() ? (
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/github" element={<GitLogin />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
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
      {/* </Routes> */}
    </div>
  );
}

export default App;