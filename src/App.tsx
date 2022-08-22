import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Profile from "./components/Profile";
import SettingPage from "./components/Setting";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/setting" element={<SettingPage/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
