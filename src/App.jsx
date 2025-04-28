import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPages from "./components/MainPages";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPages />} />
      </Routes>
      {/* <div
        id="footer"
        data-section="footer"
        className="flex flex-col bg-black w-full"
      >
        <Footer />
      </div> */}
    </div>
  );
}

export default App;
