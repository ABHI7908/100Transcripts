import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { login } from "../../services/api";
import { validateEmail, validatePassword } from "../../utils/validation";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;

    // We only need to check if password is empty for login
    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Real-time validation
    let errorMsg = "";
    if (name === "email") {
      errorMsg = validateEmail(value);
    } else if (name === "password") {
      if (!value) errorMsg = "Password is required";
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { ok, data } = await login(form.email, form.password);

      if (ok) {
        alert("Login Successful ✅");
        localStorage.setItem("user", JSON.stringify(data));

       if (data.type === "admin") {
  navigate("/admin");
} else {
  navigate("/");
}

        setForm({
          email: "",
          password: ""
        });
      } else {
        alert(data.error || "Login Failed");
      }
    } catch {
      alert("Server Error");
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
        {/* LOGO AREA */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mt-3">
            Sign in to track your files
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
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
                className={`w-full bg-slate-50 py-4 pl-14 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border transition-all font-medium text-slate-700 ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500/30'}`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 font-bold pl-4">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="enter password"
                value={form.password}
                onChange={handleChange}
                required
                className={`w-full bg-slate-50 py-4 pl-14 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border transition-all font-medium text-slate-700 ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500/30'}`}
              />
              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 font-bold pl-4">{errors.password}</p>}
          </div>

          <div className="flex justify-end pt-1">
            <Link to="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-4 rounded-full font-black text-lg flex items-center justify-center gap-3 hover:from-blue-700 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/30 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"} <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center mt-10">
          <p className="text-sm font-medium text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-black hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;