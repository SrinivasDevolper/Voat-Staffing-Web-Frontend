import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call logic
    setSubmitted(true);
  };

  const handleLoginRedirect = () => {
    navigate("/login?focus=password");
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Forgot Password
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold mb-2 text-gray-700"
              >
                Enter your registered Email ID
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-lg"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center text-blue-800 font-medium space-y-4">
            <p>✅ A password reset link has been sent to:</p>
            <p className="font-bold">{email}</p>
          </div>
        )}

        <button
          onClick={handleLoginRedirect}
          className="mt-6 w-full border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-bold py-3 rounded-lg text-lg transition-all"
        >
          Login via Password
        </button>
      </div>
    </section>
  );
}
