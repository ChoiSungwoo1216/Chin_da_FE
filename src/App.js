import { Routes, Route } from "react-router-dom"
import Start from "./pages/Start/Start"
import Main from "./pages/Main/Main"

import Battle from "./pages/Battle/Battle"
import Profile from "./pages/Profile/Profile"
import Selection from "./pages/Selection/Selection"
import './App.css';
import GitLogin from "./pages/Start/components/GitLogin"
import TutorialBtn from "./pages/Tutorial/TutorialBtn"

function App() {
  return (
     <div className="App">
      
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <TutorialBtn/>
        <Routes>
           <Route path="/" element={<Start />}/>
           <Route path="/github" element={<GitLogin/>}/>
           <Route path="/Main" element={<Main />}></Route>
           <Route path="/Battle" element={<Battle />}></Route>
           <Route path="/Profile" element={<Profile />}></Route>
           <Route path="/Selection" element={<Selection />}></Route>
        </Routes>
        
     </div>
  );
}

export default App;
// 대충 나중에 적용
{/* <Routes>
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
</Routes> */}
