import { Routes, Route } from "react-router-dom"
import Start from "./pages/Start/Start"
import Main from "./pages/Main/Main"
import Login from "./pages/Login/Login"
import Battle from "./pages/Battle/Battle"
import Profile from "./pages/Profile/Profile"
import Selection from "./pages/Selection/Selection"
import Tutorial from './pages/Tutorial/Tutorial'
import './App.css';
function App() {
  return (
     <div className="App">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <Routes>
           <Route path="/" element={<Login />}>
           </Route>
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
