import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { apiUrl } from "../../utilits/apiUrl";
import axios from "axios";
// import toast from 'react-hot-toast';
// import { Toaster } from 'react-hot-toast';

function Register({ initialImageUrl }) {
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("left"); // Initial active tab
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleTabClick = (direction) => {
    if (activeTab === direction) return; // Prevent clicking the active tab

    setActiveTab(direction);
  };

  const nameHandleChange = (e) => {
    const lowercaseOnly = e.target.value.replace(/[^a-z]/g, "");
    setName(lowercaseOnly);
  };

  const emailHandleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onSubmitRegisterForm = async (e) => {
    e.preventDefault();
    // const rawPhone =
    //   phone.startsWith("91") && phone.length > 10 ? phone.slice(-10) : phone;
    // console.log(name, email, phone, selectedFile, "nepf");
    // FormData for file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    // formData.append("phone_number", rawPhone);
    formData.append("role", activeTab === "left" ? "user" : "hr");
    formData.append("file", selectedFile);
    console.log(formData, "formData");
    try {
      const response = await axios.post(`${apiUrl}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response?.data?.message);
      setName("");
      setEmail("");
      // setPhone("");
      setPassword("");
      setSelectedFile(null);
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <section
      className="flex items-center justify-center min-h-dvh bg-gradient-to-r from-blue-400 to-blue-200"
      style={{ padding: "1rem" }}
    >
      <div
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full"
        style={{ height: "100vh" }}
      >
        {/* Left Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1746463537~exp=1746467137~hmac=167effa6ba70f28190e829d4354b4ae32b4488338a96254495ecd07ab40f4191&w=900"
            alt="Register Illustration"
            className="h-full w-full object-cover"
            style={{ padding: "1rem" }}
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="main-container">
            <div className="signup-container">
              <h2 className="text-center text-2xl font-bold mb-6">
                Create an User Account
              </h2>

              {/* Tab Switcher */}
              <div className="wrapper">
                <div className={`taeb-switch ${activeTab} text-center`}>
                  <div
                    className={`taeb ${activeTab === "left" ? "active" : ""}`}
                    taeb-direction="left"
                    onClick={() => handleTabClick("left")}
                  >
                    User
                  </div>
                  <div
                    className={`taeb ${activeTab === "right" ? "active" : ""}`}
                    taeb-direction="right"
                    onClick={() => handleTabClick("right")}
                  >
                    HR
                  </div>
                </div>
              </div>

              {/* Form */}
              <form className="signup-form" onSubmit={onSubmitRegisterForm}>
                <div className="input-group mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={name}
                    onChange={nameHandleChange}
                    required
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                </div>

                <div className="input-group mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={emailHandleChange}
                    required
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                </div>

                <div className="input-group mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    password
                  </label>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-md p-2"
                  />
                </div>

                {activeTab === "left" && (
                  <div className="input-group mb-6">
                    <label
                      htmlFor="file_input"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Upload File
                    </label>
                    <input
                      type="file"
                      id="file_input"
                      onChange={handleFileChange}
                      required
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 p-2"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Sign Up
                </button>

                <div className="login-link text-center mt-4">
                  <p className="text-gray-700">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
