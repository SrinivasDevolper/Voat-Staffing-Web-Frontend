import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Register from "./Landing/components/Register";
import Login from "./Landing/components/Login";
import MainPages from "./Landing/components/MainPages";
// import StudentDashboard from "./studentsComponents/components/StudentDashboard";
import StudentProfile from "./studentsComponents/components/StudentProfile";
import SchedulePage from "./studentsComponents/components/SchedulePage";
import ApplyForJobs from "./studentsComponents/components/ApplyForJobs";
import JobDetails from "./studentsComponents/components/jobView/JobDetails";
import JobApplied from "./studentsComponents/components/JobApplied";
import ForgotPassword from "./Landing/pages/ForgotPassword";
import "./App.css";
import { apiUrl } from "./utilits/apiUrl";
console.log("👉 imported apiUrl from utilits/apiUrl.js, value =", apiUrl);
function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<MainPages />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/apply-for-jobs" element={<ApplyForJobs />} />
        <Route
          path="/apply-for-jobs/job-details/:id"
          element={<JobDetails />}
        />
        <Route path="/applied-jobs" element={<JobApplied />} />
      </Routes>
    </div>
  );
}

export default App;
