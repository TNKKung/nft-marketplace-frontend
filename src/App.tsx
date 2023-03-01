import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import SettingPage from "./components/Setting";
import CreateNFT from "./components/CreateNFT";
import ViewNFT from "./components/ViewNFT";
import MyCollection from "./components/MyCollection";
import Collection from "./components/Collection";
import SellNFT from "./components/SellNFT";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/setting" element={<SettingPage />}></Route>
          <Route path="/createNFT" element={<CreateNFT />}></Route>
          <Route path="/myCollection" element={<MyCollection />}></Route>
          <Route
            path="/collection/:collectionId"
            element={<Collection />}
          ></Route>
          <Route path="/viewNFT/:tokenID" element={<ViewNFT />}></Route>
          <Route path="/sellNFT/:tokenID" element={<SellNFT />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
