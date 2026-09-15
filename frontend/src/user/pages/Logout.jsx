import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all session data
    localStorage.removeItem("user");
    localStorage.removeItem("applicationId");

    // Redirect to login after a short delay to show the "Logged Out" message
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f4ff] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-2xl"
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-500">
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-black text-slate-800">Logged Out Successfully</h2>
        <p className="text-slate-500">
          You have been securely logged out of your session. 
          Redirecting you to the login page...
        </p>

        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="h-2 w-2 rounded-full bg-blue-600"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              className="h-2 w-2 rounded-full bg-blue-600"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
              className="h-2 w-2 rounded-full bg-blue-600"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Logout;
