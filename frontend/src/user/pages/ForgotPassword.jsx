import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { forgotPassword } from "../../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [resetData, setResetData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      const { ok, data } = await forgotPassword(form.email);
      
      if (ok) {
        if (data.found) {
          setResetData(data);
          setIsSent(true);
        } else {
          alert("No account found with this email");
        }
      } else {
        alert(data.error || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -ml-20 -mb-20" />

      <motion.div
        className="w-full max-w-md bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {!isSent ? (
          <>
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Login
            </button>

            {/* LOGO AREA */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Forgot Password
              </h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mt-3">
                Reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 py-4 pl-14 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-transparent focus:border-blue-500/30 transition-all font-medium text-slate-700"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl active:scale-95 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            {/* FOOTER */}
            <div className="text-center mt-10">
              <p className="text-sm font-medium text-slate-500">
                Remember your password?{" "}
                <Link to="/login" className="text-blue-600 font-black hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* SUCCESS STATE */}
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-4">
                Reset Link Sent!
              </h2>
              <p className="text-slate-500 mb-4">
                Check your email for instructions to reset your password
              </p>
              
              {resetData && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-blue-600 mb-2">FOR DEVELOPMENT:</p>
                  <button
                    onClick={() => navigate(`/reset-password?token=${resetData.token}`)}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
                  >
                    Reset Password Now (Skip Email)
                  </button>
                </div>
              )}
              
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
