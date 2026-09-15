import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Phone, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { register } from "../../services/api";
import { 
  validateName, 
  validatePhone, 
  validateEmail, 
  validatePassword, 
  restrictNameInput, 
  restrictPhoneInput 
} from "../../utils/validation";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateForm = () => {
    const newErrors = {};

    const nameErr = validateName(form.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(form.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const passErr = validatePassword(form.password);
    if (passErr) newErrors.password = passErr;

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
    let errorMsg = "";
    if (name === "name") errorMsg = validateName(value);
    else if (name === "email") errorMsg = validateEmail(value);
    else if (name === "phone") errorMsg = validatePhone(value);
    else if (name === "password") {
      errorMsg = validatePassword(value);
      if (form.confirmPassword && value !== form.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else if (form.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }
    else if (name === "confirmPassword") {
      if (!value) errorMsg = "Please confirm your password";
      else if (value !== form.password) errorMsg = "Passwords do not match";
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!form.email.endsWith("@gmail.com")) {
      alert("Only students can register");
      return;
    }

    setLoading(true);

    try {
      const { ok, data } = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password
      });

      if (ok) {
        alert("Registered successfully ✅");
        navigate("/login", { state: { email: form.email.trim() } });
      } else {
        alert(data.error || "Registration Failed");
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -ml-20 -mb-20" />

      <motion.div
        className="w-full max-w-xl bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mt-3">Start your application journey</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* NAME */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  onKeyPress={restrictNameInput}
                  required
                  className={`w-full bg-slate-50 py-4 pl-14 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border transition-all font-medium text-slate-700 ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500/30'}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs font-semibold pl-4">{errors.name}</p>}
            </div>

            {/* PHONE */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  onKeyPress={restrictPhoneInput}
                  maxLength={10}
                  required
                  className={`w-full bg-slate-50 py-4 pl-14 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border transition-all font-medium text-slate-700 ${errors.phone ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500/30'}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs font-semibold pl-4">{errors.phone}</p>}
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email ID"
                value={form.email}
                onChange={handleChange}
                required
                className={`w-full bg-slate-50 py-4 pl-14 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border transition-all font-medium text-slate-700 ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500/30'}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs font-semibold pl-4">{errors.email}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className={`w-full bg-slate-50 py-4 pl-14 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border transition-all font-medium text-slate-700 ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500/30'}`}
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-semibold pl-4">{errors.password}</p>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full bg-slate-50 py-4 pl-14 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border transition-all font-medium text-slate-700 ${errors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-blue-500/30'}`}
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs font-semibold pl-4">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-4 rounded-full font-black text-lg flex items-center justify-center gap-3 hover:from-blue-700 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/30 active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="text-center mt-10">
          <p className="text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-black hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;