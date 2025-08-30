import React, { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  // Validation helper
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (name.trim().length < 3) {
      setModalMessage("Name must be at least 3 characters long");
      setShowModal(true);
      return false;
    }
    if (!nameRegex.test(name)) {
      setModalMessage("Name can only contain letters and spaces");
      setShowModal(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setModalMessage("Please enter a valid email address");
      setShowModal(true);
      return false;
    }

    if (password.length < 6) {
      setModalMessage("Password must be at least 6 characters long");
      setShowModal(true);
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setModalMessage(`Welcome, ${name}! Your account has been created successfully.`);
        setShowModal(true);
      } else {
        setModalMessage(data.message || "Password/email invalid");
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
      setModalMessage("Server error");
      setShowModal(true);
    }
  };

  const handleGoToDashboard = () => {
    setShowModal(false);
    navigate("/", { replace: true });
  };

  // **Automatically hide modal after 3 seconds**
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 2000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden relative">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 relative justify-center items-center h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 shadow-xl flex flex-col justify-between items-center p-12 rounded-r-3xl">
          <div className="text-white text-6xl font-extrabold mt-10 tracking-wider">BASE</div>
          <div className="flex gap-8 mb-12 text-white text-3xl">
            <FaGithub className="hover:text-gray-200 transition-colors" />
            <FaTwitter className="hover:text-gray-200 transition-colors" />
            <FaLinkedin className="hover:text-gray-200 transition-colors" />
            <FaDiscord className="hover:text-gray-200 transition-colors" />
          </div>
          <p className="text-white text-center text-base font-light mb-8">
            Join our community & start your journey!
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex flex-1 justify-center items-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Register</h2>
          <p className="text-gray-500 mb-6">Create your account</p>

          {/* Social login */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <FcGoogle size={20} /> Sign up with Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <FaApple size={20} /> Sign up with Apple
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4 bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Modal for success/error */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96 text-center z-50"
          >
            <h2 className="text-2xl font-bold mb-4">
              {modalMessage.includes("Welcome") ? `Welcome, ${name}!` : "Error"}
            </h2>
            <p className="mb-6">{modalMessage}</p>
            {modalMessage.includes("Welcome") && (
              <button
                onClick={handleGoToDashboard}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
              >
                Go to Dashboard
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
