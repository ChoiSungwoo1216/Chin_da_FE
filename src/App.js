import { Routes, Route } from "react-router-dom"
import Start from "./pages/Start/Start"
import Main from "./pages/Main/Main"
import Login from "./pages/Login/Login"
import Battle from "./pages/Battle/Battle"
import Profile from "./pages/Profile/Profile"
import Selection from "./pages/Selection/Selection"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />}> </Route>
        <Route path="/Main" element={<Main />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Battle" element={<Battle />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Selection" element={<Selection />}></Route>
      </Routes>
    </div>
  );
}

export default App;
