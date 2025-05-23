import { useState, useEffect, useRef } from "react";
import { apiUrl } from "../../utilits/apiUrl";
import axios from "axios";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Otp from "./Otp";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regToken, setRegToken] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const location = useLocation();
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params);
    if (params.get("focus") === "password" && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [location]);

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
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
      const response = await axios.post(`${apiUrl}/login-password`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, "response");
      if (response?.data?.message) {
        alert(response.data.message);
        const data = response.data.data;
        console.log(data, "data");
        // localStorage.setItem("authToken", response.data.token);
        switch (data?.role) {
          case "jobseeker":
            navigate("/apply-for-jobs");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          default:
            navigate("/");
        }
        console.log(response.data.token, "token");
        setRegToken(response.data.token);
        // setShowOtpForm(true); // Show OTP form on successful login
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.error || "Login failed!");
    }
  };
  const onSubmitLoginOtp = async (e) => {
    e.preventDefault();
    const payload = {
      email,
    };
    if (!email) {
      alert("Please fill in all fields");
      return;
    }
    // if (email.endsWith("@gmail.com")) {
    //   alert("Please use a valid email address");
    //   return;
    // }

    try {
      const response = await axios.post(
        `${apiUrl}/request-login-otp`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "response");
      if (response?.data?.message) {
        alert(response.data.message);
        // localStorage.setItem("authToken", response.data.token);
        // setPassword("");
        setShowOtpForm(true); // Show OTP form on successful login
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.error || "Login failed!");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-5xl">
        {/* Left Image */}
        <div className="md:w-1/2 hidden md:flex justify-center items-center bg-white p-6">
          <img
            src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg?t=st=1745815502~exp=1745819102~hmac=bc24070284f52f1e211e9a3c9012c162c57d573e25a34498704312cfb56fe5c0&w=900"
            alt="Login Visual"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#333333]">
            Login to User Account
          </h1>

          <form onSubmit={onSubmitLogin} className="space-y-6">
            {/* Email/Phone */}
            <div>
              <label
                htmlFor="email"
                className="text-sm block font-semibold mb-1 text-[#333333] "
              >
                Email ID/Phone Number
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowOtpForm(false);
                }}
                placeholder="Enter Email ID/Phone Number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm block font-semibold mb-1 text-[#333333] "
              >
                Password
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setShowOtpForm(false);
                  }}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-700 hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={onSubmitLogin}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-md text-lg tracking-wider  cursor-pointer"
              onScrollTop={() => window.scrollTo(0, 0)}
            >
              LOGIN
            </button>

            {/* OTP Button */}
            <button
              type="button"
              onClick={onSubmitLoginOtp}
              className="w-full border-2 border-blue-700 text-black font-extrabold py-3 rounded-md text-lg tracking-wide hover:bg-blue-700 hover:text-white transition-colors duration-300 cursor-pointer"
              onScrollTop={() => window.scrollTo(0, 0)}
            >
              LOGIN WITH OTP
            </button>

            {/* OTP Form */}
            {showOtpForm && (
              <Otp email={email} token={regToken} type={"signin"} />
            )}
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
