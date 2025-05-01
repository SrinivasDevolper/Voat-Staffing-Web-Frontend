import { useState, useEffect } from "react";
import { apiUrl } from "../../utilits/apiUrl";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to store OTP digits
  const navigate = useNavigate();
  const [resendCooldown, setResendCooldown] = useState(120);
  const [resendTimerActive, setResendTimerActive] = useState(true);

  useEffect(() => {
    let timer;
    if (resendTimerActive && resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    } else if (resendCooldown === 0) {
      setResendTimerActive(false);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, resendTimerActive]);

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    // Strip country code (like 91) and keep only last 10 digits
    const rawPhone =
      phone.startsWith("91") && phone.length > 10 ? phone.slice(-10) : phone;

    const payload = {
      name,
      email,
      phone_number: rawPhone,
    };

    try {
      const response = await axios.post(`${apiUrl}/login`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response?.data?.message);
      setName("");
      setEmail("");
      setShowOtpForm(true);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Login failed!");
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const inputs = document.querySelectorAll(".otp-input");

    if (value && index < inputs.length - 1) {
      // Move forward
      inputs[index + 1].focus();
    } else if (!value && index > 0) {
      // Move backward on empty
      inputs[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    const rawPhone =
      phone.startsWith("91") && phone.length > 10 ? phone.slice(-10) : phone;
    console.log("handle");
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    // Add your OTP verification logic here
    console.log("ok");
    e.preventDefault();
    const payload = {
      phone_number: rawPhone,
      otp: enteredOtp,
    };
    try {
      const response = await axios.post(`${apiUrl}/verify-otp`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response?.data?.message);
      setOtp("");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "OTP failed!");
    }
  };

  const handleResendOtp = async () => {
    const rawPhone =
      phone.startsWith("91") && phone.length > 10 ? phone.slice(-10) : phone;
    try {
      // Call your backend login endpoint or separate /resend-otp endpoint
      const response = await axios.post(`${apiUrl}/resend-otp`, {
        phone_number: rawPhone,
      });
      console.log(response, "response");

      // Reset timer
      setResendCooldown(120);
      setResendTimerActive(true);
      alert(`${response.data.message} ${response.data.otp}`);
    } catch (error) {
      console.log(error, "error");
      alert("Failed to resend OTP.");
    }
  };

  return showOtpForm ? (
    <div className="main-container">
      <div className="otp-container">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src="http://cdn-icons-png.flaticon.com/512/93/93634.png"
          alt="backspace"
          width={25}
        />
        <h1 className="title">Enter OTP</h1>
        <form id="otp-form" onSubmit={handleVerifyOtp}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="otp-input"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
            />
          ))}
        </form>
        <div className="flex justify-around items-end">
          <button id="verify-btn" onClick={handleVerifyOtp}>
            Verify OTP
          </button>
          {resendTimerActive ? (
            <span>Resend OTP in {resendCooldown}s</span>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={resendTimerActive}
              style={{
                backgroundColor: resendTimerActive ? "gray" : "gray",
                color: "white",
                cursor: resendTimerActive ? "not-allowed" : "pointer",
                alignSelf: "end",
                padding: "7px",
                borderRadius: "4px",
              }}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <section className="flex items-center justify-center bg-gradient-to-r from-[#cfdcf1] to-blue-200">
      <div
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full gap-3"
        style={{ height: "85vh" }}
      >
        {/* Left image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg?t=st=1745815502~exp=1745819102~hmac=bc24070284f52f1e211e9a3c9012c162c57d573e25a34498704312cfb56fe5c0&w=900"
            alt="Login Illustration"
            className="w-full object-cover"
            style={{ padding: "1rem" }}
          />
        </div>

        {/* Right form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
          <div className="signup-container">
            <h2 className="text-center text-2xl font-bold mb-6">
              Login to User Account
            </h2>

            <form className="signup-form" onSubmit={onSubmitLogin}>
              <div className="input-group mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>

              <div className="input-group mb-6">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <PhoneInput
                  country="in"
                  value={phone}
                  onChange={setPhone}
                  inputStyle={{ width: "100%" }}
                  containerStyle={{ width: "100%" }}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-btn w-full bg-[#0f52ba] text-white py-2 rounded hover:bg-blue-600"
              >
                Sign In
              </button>

              <div className="login-link text-center mt-4">
                <p className="text-gray-700">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-600 font-semibold">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
