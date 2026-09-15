import React, { useState } from "react";
import { motion } from "framer-motion";
import { submitContact } from "../../services/api";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import {
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Transcript Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await submitContact(formData);

      if (response.ok) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "Transcript Inquiry",
          message: "",
        });

      } else {
        alert(response.data.error || "Something went wrong");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      {/* HERO */}
      <section className="relative overflow-hidden">

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700" />

        {/* ANIMATED EFFECTS */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 md:pb-20">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2">
              <Sparkles className="w-4 h-4 text-white" />
            </div>

            {/* HEADING */}
            <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-[1.1] text-white">
              <span className="block">
                Let's Build Your
              </span>

              <span className="block bg-gradient-to-r from-cyan-200 via-white to-blue-200 bg-clip-text text-transparent">
                Academic Journey
              </span>
            </h1>

            {/* SUBTEXT */}
            <p className="mt-5 text-white/80 text-sm md:text-base leading-7 max-w-2xl">
              Connect with our team for transcript processing,
              document verification, and worldwide university support.
            </p>

          </motion.div>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 pb-20 relative z-10">

        <div className="grid lg:grid-cols-[0.95fr_1.2fr] gap-6">

          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200"
          >

            <h2 className="text-2xl font-bold text-slate-900">
              Contact Information
            </h2>

            <p className="mt-2 text-slate-500 text-sm leading-relaxed">
              Our support team is available to guide you through every step.
            </p>

            {/* CONTACT ITEMS */}
            <div className="mt-8 space-y-4">

              {/* PHONE */}
              <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <FiPhone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Call Us</p>
                  <p className="mt-1 text-slate-800 font-semibold">+91 99419 91402</p>
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-green-50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <FaWhatsapp size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">WhatsApp</p>
                  <p className="mt-1 text-slate-800 font-semibold">+91 99419 91402</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-red-50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <FiMail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Email</p>
                  <p className="mt-1 text-slate-800 font-semibold break-all">support@100transcripts.com</p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-orange-50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Office</p>
                  <p className="mt-1 text-slate-800 font-semibold">Hyderabad, India</p>
                </div>
              </div>

            </div>

            {/* FEATURES */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-2xl p-4 text-center group hover:bg-blue-100 transition-colors">
                <Clock3 className="mx-auto text-blue-600 w-6 h-6 group-hover:scale-110 transition-transform" />
                <p className="mt-2 text-xs text-slate-500 font-semibold">Fast Processing</p>
              </div>
              <div className="bg-cyan-50 rounded-2xl p-4 text-center group hover:bg-cyan-100 transition-colors">
                <ShieldCheck className="mx-auto text-cyan-600 w-6 h-6 group-hover:scale-110 transition-transform" />
                <p className="mt-2 text-xs text-slate-500 font-semibold">Secure Handling</p>
              </div>
              <div className="bg-indigo-50 rounded-2xl p-4 text-center group hover:bg-indigo-100 transition-colors">
                <Sparkles className="mx-auto text-indigo-600 w-6 h-6 group-hover:scale-110 transition-transform" />
                <p className="mt-2 text-xs text-slate-500 font-semibold">Trusted Service</p>
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200"
          >

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Send a Message
              </h2>
              <p className="mt-2 text-slate-500 text-sm">
                Fill the form and we'll get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME + EMAIL */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                >
                  <option>Transcript Inquiry</option>
                  <option>Document Verification</option>
                  <option>Partner with Us</option>
                  <option>Others</option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 resize-none focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-10 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-cyan-500/30 group"
                >
                  Send Message
                  <FiSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </div>

            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}