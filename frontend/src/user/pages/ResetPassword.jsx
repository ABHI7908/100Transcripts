import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { verifyResetToken, resetPassword } from "../../services/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVerifying(false);

      setError("Invalid or missing reset token");
      return;
    }

    const validateToken = async () => {
      try {
        const { ok, data } = await verifyResetToken(token);
        
        if (ok && data.valid) {
          setIsValid(true);
        } else {
          setError(data.message || "Invalid or expired token");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setError("Server error. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    
    try {
      const { ok, data } = await resetPassword(token, form.password, form.confirmPassword);
      
      if (ok) {
        setIsReset(true);
      } else {
        setError(data.message || data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-slate-600 font-medium">Verifying reset token...</p>
        </div>
      </div>
    );
  }

  if (!isValid && !isReset) {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-400/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        
        <motion.div
          className="w-full max-w-md bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-4">
              Invalid or Expired Link
            </h2>
            <p className="text-slate-500 mb-8">
              {error || "This password reset link is invalid or has expired"}
            </p>
            <Link
              to="/forgot-password"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all inline-block"
            >
              Request New Link
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -ml-20 -mb-20" />

      <motion.div
        className="w-full max-w-md bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {!isReset ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Login
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Set New Password
              </h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mt-3">
                Choose a strong password
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">
                  New Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full bg-slate-50 py-4 pl-14 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-transparent focus:border-blue-500/30 transition-all font-medium text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full bg-slate-50 py-4 pl-14 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-transparent focus:border-blue-500/30 transition-all font-medium text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl active:scale-95 disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

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
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-4">
                Password Reset!
              </h2>
              <p className="text-slate-500 mb-8">
                Your password has been successfully reset
              </p>
              <Link
                to="/login"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all inline-block"
              >
                Sign In Now
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
