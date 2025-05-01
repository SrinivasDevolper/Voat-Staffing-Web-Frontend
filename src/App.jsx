import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Register from "./Landing/components/Register";
import Login from "./Landing/components/Login";
import MainPages from "./Landing/components/MainPages";
import StudentDashboard from "./studentsComponents/components/StudentDashboard";
import StudentProfile from "./studentsComponents/components/StudentProfile";

import "./App.css";
function App() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [pathname]);
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPages />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </div>
  );
}

export default App;
