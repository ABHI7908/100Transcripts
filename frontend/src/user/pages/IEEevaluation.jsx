import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, FileText, Upload, UserPlus,
  Award, Clock, Shield, ExternalLink, Info, BadgeCheck,
  Building2, CheckCircle2, UploadCloud, FileCheck, ClipboardCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import iee2 from "../../assets/iee2.mp4";
import workflowImg from "../../assets/workflow.png";

const IEEevaluation = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: "iee-account",
      title: "Create IEE Account",
      description: "Choose between our exclusive partner discount or the standard registration process.",
      icon: UserPlus,
      color: "blue",
      content: (
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href="https://100transcripts.com/wp-content/uploads/2025/09/IEE-account-creation-in-partnership-with-100-Transcripts-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-full font-black hover:shadow-cyan-500/30 transition-all shadow-xl text-sm flex-1 group"
          >
            <span>Discounted Price</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <div className="flex items-center justify-center text-blue-600 font-black px-2 text-xs">OR</div>
          <a
            href="https://100transcripts.com/wp-content/uploads/2024/12/How-to-create-IEE-account-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border-2 border-blue-100 text-blue-600 px-6 py-4 rounded-2xl font-black hover:border-blue-300 hover:bg-blue-50 transition-all text-sm flex-1 group"
          >
            <span>Regular Process</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      )
    },
    {
      id: "prepare-docs",
      title: "Prepare Documents",
      description: "Ensure you have all required academic records for your IEE evaluation.",
      icon: FileText,
      color: "blue",
      content: (
        <div className="space-y-4 mt-6 bg-blue-50 p-6 rounded-2xl border border-blue-100">
          {[
            { label: "CMM (Consolidated Marks)", link: "https://100transcripts.com/cmm/" },
            { label: "Degree Certificate / Provisional", link: "https://100transcripts.com/provisional-degree-certificate-pc/" },
            { label: "Internship Certificate (Medical/Pharmacy)", isText: true },
            { label: "IEE Order Number", isText: true },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 group">
              <div className="mt-1 bg-blue-100 rounded-full p-1 flex-shrink-0">
                <Check className="w-3 h-3 text-blue-600" />
              </div>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-800 hover:text-blue-600 transition-colors text-sm font-bold leading-tight flex items-center gap-2"
                >
                  {item.label}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <span className="text-slate-800 text-sm font-bold">{item.label}</span>
              )}
            </div>
          ))}
          <div className="flex items-start gap-2 pt-2 border-t border-blue-200 mt-2">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-600 font-medium leading-relaxed">
              Note: Documentation may vary based on university requirements. Consult our experts for specifics.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "upload-docs",
      title: "Upload Documents",
      description: "Submit your documents securely for IEE verification and evaluation.",
      icon: Upload,
      color: "blue",
      content: (
        <div className="mt-6">
          <Link
            to="/apply"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-black hover:shadow-cyan-500/30 transition-all shadow-xl text-sm group"
          >
            <Upload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Start Application
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION - CLEAN DESIGN LIKE UPLOADED IMAGE */}
      <section className="relative pt-28 lg:pt-36 pb-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* LEFT SIDE - CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2"
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 text-xs font-semibold uppercase tracking-wider">Official IEE Partnership</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                100 Transcripts is partnered with <span className="text-blue-600">IEE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-600 text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Get your international credentials evaluated quickly and securely through our official partnership. Enjoy <span className="text-blue-600 font-semibold">priority processing</span> and <span className="text-blue-600 font-semibold">expert guidance</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <Link
                  to="/apply"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all shadow-lg inline-block"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all inline-block"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="lg:w-1/2 relative flex justify-center items-center mt-12 lg:mt-0"
            >
              {/* Premium Subtle Ambient Glow */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-full h-full bg-blue-50/60 rounded-full blur-[100px] -z-10"
              />

              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-2xl flex items-center justify-center p-2"
              >
                {/* 
                  Edge Fade Mask: Keeps the entire center clearly visible, 
                  only dissolving the outer 15% smoothly into the background.
                */}
                <div
                  className="relative w-full overflow-hidden flex items-center justify-center"
                  style={{
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                    WebkitMaskComposite: "source-in",
                    maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                    maskComposite: "intersect"
                  }}
                >
                  <motion.video
                    src={iee2}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-[125%] h-auto object-contain mix-blend-multiply brightness-110 contrast-105"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Subtle Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,112.49,122,126.31,185.39,111.44,248.8,96.57,263.39,67.23,321.39,56.44Z" className="fill-[#f8fafc]"></path>
          </svg>
        </div>
      </section>


      {/* WORKFLOW SECTION - LEFT STEPS, RIGHT IMAGE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Evaluation Process
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Simple steps to get your credentials evaluated
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT SIDE - STEPS/CONTENT */}
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Create IEE Account",
                  description: "Choose between our exclusive partner discount or the standard registration process.",
                  icon: <UserPlus className="w-6 h-6 text-blue-600" />,
                  color: "blue"
                },
                {
                  step: 2,
                  title: "Prepare Documents",
                  description: "Gather required academic documents including CMM, Degree Certificate, and other necessary papers.",
                  icon: <FileText className="w-6 h-6 text-blue-600" />,
                  color: "blue"
                },
                {
                  step: 3,
                  title: "Upload & Submit",
                  description: "Submit your documents securely through our platform for IEE verification and evaluation.",
                  icon: <UploadCloud className="w-6 h-6 text-blue-600" />,
                  color: "blue"
                },
                {
                  step: 4,
                  title: "Get Evaluation",
                  description: "Receive your comprehensive credential evaluation report from IEE.",
                  icon: <FileCheck className="w-6 h-6 text-blue-600" />,
                  color: "blue"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)"
                  }}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-md shadow-slate-200/40 hover:border-blue-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/30 flex items-center justify-center flex-shrink-0 border border-blue-100/50 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-500"
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-black shadow-md shadow-blue-600/30">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-black text-slate-800 tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* RIGHT SIDE - WORKFLOW IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glow Background */}
                <motion.div
                  animate={{
                    boxShadow: ["0 0 30px rgba(59, 130, 246, 0.3)", "0 0 50px rgba(139, 92, 246, 0.5)", "0 0 30px rgba(59, 130, 246, 0.3)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-3xl blur-2xl"
                />

                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-2xl">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-4 right-4 w-8 h-8 bg-blue-500/20 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-4 left-4 w-6 h-6 bg-blue-500/20 rounded-full"
                  />

                  <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <motion.img
                      src={workflowImg}
                      alt="IEE Evaluation Workflow"
                      className="w-full h-auto object-contain"
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Floating Badge */}
                  {/* <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl"
                  >
                    <span className="text-2xl">📋</span>
                  </motion.div> */}
                </div>
              </motion.div>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                {[
                  { icon: "⚡", label: "Fast", color: "yellow" },
                  { icon: "🔒", label: "Secure", color: "green" },
                  { icon: "🌍", label: "Global", color: "blue" },
                  { icon: "✅", label: "Verified", color: "blue" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                    whileHover={{
                      scale: 1.05,
                      y: -3
                    }}
                    className={`${feature.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' : feature.color === 'green' ? 'bg-green-50 border-green-200' : feature.color === 'blue' ? 'bg-blue-50 border-blue-200' : feature.color === 'blue' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} rounded-full px-4 py-2 flex items-center gap-2 shadow-md hover:shadow-lg transition-all`}
                  >
                    <span className="text-lg">{feature.icon}</span>
                    <span className="text-sm font-semibold text-gray-800">{feature.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STEPS SECTION */}
      <section className="bg-[#f8fafc] pb-32 pt-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">IEE Evaluation</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="h-[2px] w-12 bg-blue-200" />
              <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">Step by Step Guide</p>
              <span className="h-[2px] w-12 bg-blue-200" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group bg-white p-5 rounded-xl border transition-all duration-500 cursor-pointer ${activeStep === step.id ? 'border-blue-300 shadow-xl shadow-blue-500/10 -translate-y-1' : 'border-slate-100 hover:border-blue-200 shadow-sm shadow-slate-200/40 hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/10'}`}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className="flex items-start gap-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] bg-blue-50 text-blue-700 border border-blue-100">
                          Step {idx + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-black mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">{step.description}</p>
                      <AnimatePresence>
                        {activeStep === step.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            {step.content}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:sticky lg:top-32 h-fit space-y-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-100 shadow-md shadow-slate-200/40 relative overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition-shadow duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 transition-colors group-hover:bg-blue-100/50" />
                <div className="relative z-10 space-y-6 text-center lg:text-left">
                  <h3 className="text-2xl font-black text-black tracking-tight">Official IEE ECA Report</h3>
                  <p className="text-slate-600 text-base font-medium leading-relaxed">Download a sample IEE evaluation report to understand the format and details provided to institutions.</p>
                  <a
                    href="https://100transcripts.com/wp-content/uploads/2026/01/IEE-ECA-Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-600 transition-all hover:scale-105"
                  >
                    View Sample Report
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 sm:p-5 rounded-2xl relative overflow-hidden group shadow-xl max-w-[340px]">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white leading-none">100% Verified</h4>
                    <p className="text-blue-50 font-medium text-xs mt-1">Official partnership for secure results.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FLOATING HELP BUTTON */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-24 right-8 z-40 bg-white px-5 py-3 rounded-full shadow-2xl border border-slate-100 flex items-center gap-3 cursor-pointer hover:shadow-blue-500/10 transition-shadow group"
      >
        <span className="text-black font-bold text-sm">Need help?</span>
        <span className="text-xl group-hover:rotate-12 transition-transform">👋</span>
      </motion.div>

      {/* WHATSAPP FLOATING */}
      <a
        href="https://wa.me/919941991402"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

    </div>
  );
};

export default IEEevaluation;