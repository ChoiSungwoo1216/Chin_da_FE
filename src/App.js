import { Routes, Route } from "react-router-dom"
import Start from "./pages/Start/Start"
import Main from "./pages/Main/Main"

import Battle from "./pages/Battle/Battle"
import Profile from "./pages/Profile/Profile"
import Selection from "./pages/Selection/Selection"
import Tutorial from './pages/Tutorial/Tutorial'
import GitLogin from "./pages/Start/GitLogin"
function App() {
  return (
     <div className="App">
        <Routes>
           <Route path="/" element={<Start />}/>
           <Route path="/github" element={<GitLogin/>}/>
           
           <Route path="/Main" element={<Main />}></Route>
           
           <Route path="/Battle" element={<Battle />}></Route>
           <Route path="/Profile" element={<Profile />}></Route>
           <Route path="/Selection" element={<Selection />}></Route>
           <Route path="/Tutorial" element={<Tutorial />}></Route>
        </Routes>
     </div>
  );
}

export default App;
