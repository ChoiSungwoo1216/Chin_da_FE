import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start/Start";
import Main from "./pages/Main/Main";
import { LoginCheck } from "./shared/sessionStorage";

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
  const [mbmute, setMbmute] = React.useState(true);
  useSound(mainBgm, volume.bgm, mbmute);

  return (
    <div className="App">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <TutorialBtn />
      <SoundSettingBtn />
      <Routes>
        {LoginCheck === true ? (
          <>
            <Route path="/" element={<Start />} />
            <Route path="/github" element={<GitLogin />} />
            <Route path="/*" element={<Start />} />
          </>
        ) : (
          <>
            <Route path="/main" element={<Main />}></Route>
            <Route
              path="/battle/"
              element={<Battle setMbmute={setMbmute} />}
            ></Route>
            <Route
              path="/battle/:id"
              element={<Battle setMbmute={setMbmute} />}
            ></Route>
            <Route path="/selection" element={<Selection />}></Route>
            <Route path="/*" element={<Selection />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
// 대충 나중에 적용
/* <Routes>
   {뭐 대충 로그인 체크 변수 ? (
      <>
         <Route path="/" element={<Start />}/>
         <Route path="/github" element={<GitLogin/>}/>
         <Route path="*" element={<Start />}/>      
      </>
      ) : (
      <>
         <Route path="/Main" element={<Main />}></Route>
         <Route path="/Battle" element={<Battle />}></Route>
         <Route path="/Profile" element={<Profile />}></Route>
         <Route path="/Selection" element={<Selection />}></Route>
      </>
      )
   }
</Routes> */
