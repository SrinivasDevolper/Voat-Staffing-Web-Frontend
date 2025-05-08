import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OTPInput from "otp-input-react";
import { apiUrl } from "../../utilits/apiUrl";

function Otp({ email }) {
  // console.log(email, "OTPemail");
  const [otp, setOTP] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(120);
  const [resendTimerActive, setResendTimerActive] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (email) setLocalEmail(email);
  }, [email]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log(localEmail, "localEmail");
    const enteredOtp = otp.trim();

    if (!localEmail || !enteredOtp) {
      alert("Email and OTP are required.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${apiUrl}/verify-otp`,
        { email, otp: enteredOtp },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert(data?.message || "OTP verified.");
      setOTP("");

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
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert(error?.response?.data?.message || "OTP verification failed!");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(`${apiUrl}/resend-otp`, {
        email,
      });
      console.log(response, "response");
      setResendCooldown(120);
      setResendTimerActive(true);
      alert(`${response.data.message} ${response.data.otp}`);
    } catch (error) {
      console.log(error, "error");
      alert("Failed to resend OTP.");
    }
    // const rawPhone =
    //   phone.startsWith("91") && phone.length > 10 ? phone.slice(-10) : phone;
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">Enter OTP</h2>

      {/* OTP Boxes */}
      <form className="flex space-x-2 justify-left mb-3">
        <OTPInput
          value={otp}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
          inputClassName="w-10 h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>

      {/* Timer + Resend */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-6 px-2">
        <div>
          Didn’t receive your OTP?{" "}
          <span className="text-blue-600 font-semibold">
            ({resendCooldown})
          </span>
        </div>
        {resendTimerActive ? (
          <span className="text-gray-400 cursor-not-allowed">Resend</span>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendTimerActive}
            className="text-blue-500 hover:underline font-medium"
          >
            Resend
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleVerifyOtp}
        className="w-full py-3 bg-blue-700 text-white text-lg font-bold tracking-wide rounded-md hover:bg-blue-800 transition"
      >
        SUBMIT OTP
      </button>
    </div>
  );
}

export default React.memo(Otp);
