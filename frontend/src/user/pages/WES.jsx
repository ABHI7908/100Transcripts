import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, FileText, Upload, UserPlus,
  Shield, ExternalLink, BadgeCheck,
  Building2, CheckCircle2, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import wes2 from "../../assets/wes2.mp4";
import wes1 from "../../assets/WES1.png";

const WES = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: "wes-account",
      title: "Create WES Account",
      description: "Follow our comprehensive guides to register your WES account correctly for Canada PR or other purposes.",
      icon: UserPlus,
      content: (
        <div className="flex flex-col gap-3 mt-4">
          <a
            href="https://100transcripts.com/wp-content/uploads/2025/02/How-to-create-WES-Account-for-%E2%80%98Canada-PR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-cyan-500/30 transition-all text-sm group shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>Canada PR Guide</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://100transcripts.com/wp-content/uploads/2026/01/WES-REGISTRATION-GUIDE-Version-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:border-blue-200 transition-all text-sm group"
          >
            <span>Registration Guide</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      )
    },
    {
      id: "prepare-docs",
      title: "Prepare Documents",
      description: "Ensure you have all required documents and correctly filled forms.",
      icon: FileText,
      content: (
        <div className="space-y-3 mt-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
          {[
            { label: "CMM or Yearly marks sheets", link: "https://100transcripts.com/cmm/" },
            { label: "Degree Certificate or PC", link: "https://100transcripts.com/provisional-degree-certificate-pc/" },
            { label: "WES Reference Number", isText: true },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-1" />
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-blue-600 text-sm font-bold">
                  {item.label}
                </a>
              ) : (
                <span className="text-slate-800 text-sm font-bold">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      id: "upload-docs",
      title: "Upload Documents",
      description: "Submit your documents securely through our official portal.",
      icon: Upload,
      content: (
        <div className="mt-4">
          <Link
            to="/apply"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-black hover:shadow-cyan-500/30 transition-all text-sm shadow-xl"
          >
            <Upload className="w-4 h-4" />
            Start Application
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 text-center lg:text-left space-y-6"
            >
              <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-full px-5 py-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Official WES Partnership</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                100 Transcripts & <span className="text-blue-600">WES</span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl font-medium">
                Fast-track your evaluation with priority processing and official verification.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-black font-bold text-sm">Priority Processing</span>
                </div>
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl border border-slate-100 shadow-sm">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-black font-bold text-sm">Official Verification</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="lg:w-1/2 relative flex justify-center items-center mt-12 lg:mt-0"
            >
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
                    src={wes2}
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
      </section>

      {/* STEPS & WORKFLOW SECTION - STEPS LEFT, WORKFLOW RIGHT */}
      <section className="bg-white pb-32 pt-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">WES Evaluation</h2>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-xs">Seamless Step-by-Step Process</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* LEFT SIDE: STEPS */}
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  className={`bg-white p-8 rounded-[2rem] border transition-all duration-300 ${activeStep === step.id ? 'border-blue-500 shadow-xl' : 'border-slate-100 shadow-sm'}`}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 text-blue-600 border border-slate-100">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase">Step {idx + 1}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-sm font-medium">{step.description}</p>
                      <AnimatePresence>
                        {activeStep === step.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                            {step.content}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* REPORT CARD - Now positioned on the LEFT below steps */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-100 shadow-md shadow-slate-200/40 relative overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition-shadow duration-300 w-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 transition-colors group-hover:bg-blue-100/50" />
                <div className="relative z-10 space-y-6 text-center lg:text-left">
                  <h3 className="text-2xl font-black text-black tracking-tight">Official WES ECA Report</h3>
                  <p className="text-slate-600 text-base font-medium leading-relaxed">Download a sample WES evaluation report to understand the format and details provided to institutions.</p>
                  <a
                    href="https://100transcripts.com/wp-content/uploads/2026/01/WES-ECA-Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-xl font-bold text-[15px] shadow-lg hover:bg-blue-600 transition-all hover:scale-105 w-fit"
                  >
                    View Sample Report
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: WORKFLOW IMAGE & INFO */}
            <div className="lg:sticky lg:top-32 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-blue-50/30 backdrop-blur-sm p-5 rounded-xl border border-blue-100 shadow-md shadow-slate-200/40 overflow-hidden group"
              >
                <div className="relative bg-white rounded-xl p-4 shadow-xl border border-white overflow-hidden">
                  <img
                    src={wes1}
                    alt="WES Workflow"
                    className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>


              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 sm:p-5 rounded-2xl relative overflow-hidden group shadow-xl w-full">
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

      {/* WHATSAPP FLOATING */}
      <a
        href="https://wa.me/919941991402"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all hover:scale-110"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

    </div>
  );
};

export default WES;