import Otp from "./Otp";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { apiUrl } from "../../utilits/apiUrl";
import axios from "axios";
// import toast from 'react-hot-toast';
// import { Toaster } from 'react-hot-toast';

function Register({ initialImageUrl }) {
  // const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("left"); // Initial active tab
  const [email, setEmail] = useState("");
  console.log(email, "email");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [regToken, setRegToken] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendOtpDisabled, setSendOtpDisabled] = useState(false);

  const handleTabClick = (direction) => {
    if (activeTab === direction) return; // Prevent clicking the active tab

    setActiveTab(direction);
  };

  const emailHandleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setOtpSent(false); // Hide OTP form on edit
    setSendOtpDisabled(false); // Allow resend
  };

  const passwordHandleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setOtpSent(false);
    setSendOtpDisabled(false);
  };
  const onSubmitRegisterForm = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      role: activeTab === "left" ? "jobseeker" : "hr",
      file: activeTab === "left" ? selectedFile : null,
    };
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (email.endsWith("@gmail.com")) {
      alert("Please use a valid email address");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/signup`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response, "response");
      if (response?.status === 200) {
        alert(response?.data?.message);
        // localStorage.setItem("authToken", response.data.token);
        setOtpSent(true);
        setSendOtpDisabled(true);
        console.log(response.data.token, "token");
        setRegToken(response.data.token); // Show OTP form on successful login
      } else {
        console.log(response, "response");
        alert(response?.data?.error || "Registeration failed");
      }
    } catch (error) {
      console.log(error, "error");
      alert(error?.response?.data?.error || "Registration failed!");
    }

    // const rawPhone =
    //   phone.startsWith("91") && phone.length > 10 ? phone.slice(-10) : phone;
    // console.log(name, email, phone, selectedFile, "nepf");
    // FormData for file upload
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?t=st=1746677338~exp=1746680938~hmac=e1d188fbd84b15f3127e733ccf21deefef1bf1444037fa3ee4146b073ff87dc6&w=900"
            alt="Register Illustration"
            className="w-full h-full object-cover p-4"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          {/* Tab Switcher */}
          <div className="flex mb-6 rounded-md overflow-hidden border border-gray-300">
            <div
              onClick={() => {
                handleTabClick("left");
                setOtpSent(false);
                setEmail("");
                setPassword("");
                setSelectedFile(null);
                setSendOtpDisabled(false);
              }}
              className={`w-1/2 py-2 text-center cursor-pointer font-medium transition-colors duration-200 ${
                activeTab === "left"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              User
            </div>
            <div
              onClick={() => {
                handleTabClick("right");
                setOtpSent(false);
                setEmail("");
                setPassword("");
                setSelectedFile(null);
                setSendOtpDisabled(false);
              }}
              className={`w-1/2 py-2 text-center cursor-pointer font-medium transition-colors duration-200 ${
                activeTab === "right"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              HR
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email ID / Phone Number
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={emailHandleChange}
                placeholder="Enter Email ID or Phone Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={passwordHandleChange}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {activeTab === "left" && (
              <div>
                <label
                  htmlFor="file_input"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Upload File
                </label>
                <input
                  type="file"
                  id="file_input"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-700"
                />
              </div>
            )}

            <button
              type="button"
              onClick={onSubmitRegisterForm}
              disabled={sendOtpDisabled}
              className={`w-full py-2 mt-2 rounded-md font-medium ${
                sendOtpDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onScrollTop={() => window.scrollTo(0, 0)}
            >
              Send OTP
            </button>

            <p className="text-center text-sm text-gray-700 mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
          <div>
            {otpSent && <Otp email={email} token={regToken} type={"signup"} />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;

// <section
//   className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-200"
//   style={{ padding: "1rem" }}
// >
//   <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
//     {/* Left Image */}
//     <div className="md:w-1/2 hidden md:block">
//
//     </div>

//     {/* Right Form */}
//     <div className="md:w-1/2 p-8 flex flex-col justify-center">
//       <div className="main-container">
//         <h2 className="text-center text-2xl font-bold mb-6">
//           Create an Account
//         </h2>

//         {/* Tab Switcher */}
//         <div className="wrapper">
//           <div className={`taeb-switch ${activeTab} text-center`}>
//             <div
//               className={`taeb ${activeTab === "left" ? "active" : ""}`}
//               taeb-direction="left"
//               onClick={() => handleTabClick("left")}
//             >
//               User
//             </div>
//             <div
//               className={`taeb ${activeTab === "right" ? "active" : ""}`}
//               taeb-direction="right"
//               onClick={() => handleTabClick("right")}
//             >
//               HR
//             </div>
//           </div>
//         </div>

//         {/* Form */}
//         <form className="signup-form" onSubmit={onSubmitRegisterForm}>
//           {/* <div className="input-group mb-4">
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Enter your username"
//                 value={name}
//                 onChange={nameHandleChange}
//                 required
//                 className="mt-1 block w-full border rounded-md p-2"
//               />
//             </div> */}

//           <div className="input-group mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email ID/Phone Number
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter Email ID/Phone Number"
//               value={email}
//               onChange={emailHandleChange}
//               required
//               className="mt-1 block w-full border rounded-md p-2"
//             />
//           </div>

//           <div className="input-group mb-6">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               password
//             </label>

//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full border border-gray-200 rounded-md p-2"
//             />
//           </div>

//           {activeTab === "left" && (
//             <div className="input-group mb-6">
//               <label
//                 htmlFor="file_input"
//                 className="block mb-2 text-sm font-medium text-gray-700"
//               >
//                 Upload File
//               </label>
//               <input
//                 type="file"
//                 id="file_input"
//                 onChange={handleFileChange}
//                 className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 p-2"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="submit-btn w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             Sign Up
//           </button>

//           <div className="login-link text-center mt-4">
//             <p className="text-gray-700">
//               Already have an account?{" "}
//               <Link to="/login" className="text-blue-600 font-semibold">
//                 Login here
//               </Link>
//             </p>
//           </div>
//           <div>{showOtpForm && <Otp />}</div>
//         </form>
//       </div>
//     </div>
//   </div>
// </section>
