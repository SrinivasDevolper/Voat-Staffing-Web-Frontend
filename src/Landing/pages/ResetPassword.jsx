import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3001/reset-password", {
        email,
        token,
        password,
      });
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong.";
      setError(msg);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Reset Password
        </h2>

        {success ? (
          <div className="text-green-700 font-semibold text-center space-y-4">
            <p>✅ Password has been reset successfully.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <input type="hidden" value={email} />
            <input type="hidden" value={token} />

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <div className="text-red-600">{error}</div>}

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-lg"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
