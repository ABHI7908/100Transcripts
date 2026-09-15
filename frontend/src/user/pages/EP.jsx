import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, FileText, Upload, UserPlus,
  Shield, BadgeCheck, Building2, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import eduLogo from "../../assets/edu.png";


const EP = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Create EP Account",
      description: "Register your account on the Educational Perspectives portal to begin your evaluation journey.",
      icon: UserPlus,
      content: (
        <div className="mt-4">
          <a
            href="https://www.edperspective.org/apply/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm group"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Here</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      )
    },
    {
      id: 2,
      title: "Select Evaluation Type",
      description: "Choose between General, Course-by-Course, or Catalog Match reports based on your needs.",
      icon: FileText,
      content: (
        <div className="space-y-3 mt-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
          {[
            { label: "General Report", sublabel: "(For employment/immigration)" },
            { label: "Course-by-Course", sublabel: "(For further education)" }
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-blue-600 mt-1" />
              <div>
                <span className="text-slate-800 text-sm font-bold block">{item.label}</span>
                <span className="text-[10px] text-slate-500 font-medium">{item.sublabel}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 3,
      title: "Document Submission",
      description: "Upload your verified transcripts and degree certificates through our secure portal.",
      icon: Upload,
      content: (
        <div className="mt-4">
          <Link
            to="/apply"
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-xl font-black hover:bg-blue-700 transition-all text-sm shadow-lg"
          >
            <Upload className="w-4 h-4" />
            Start Application
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left space-y-8"
            >
              <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-full px-5 py-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Official EP Support</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-black leading-tight tracking-tight">
                Educational <span className="text-blue-600">Perspectives</span>
              </h1>

              <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                Streamlined and accurate credential evaluation for your international education journey with official verification.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-black font-bold text-sm">Official Support</span>
                </div>
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl border border-slate-100 shadow-sm">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-black font-bold text-sm">Verified Handling</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 flex justify-center"
            >
              {/* INCREASED LOGO SIZE */}
              <img
                src={eduLogo}
                alt="Educational Perspectives Logo"
                className="w-80 md:w-[480px] h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* STEPS & WORKFLOW SECTION */}
      <section className="bg-white pb-32 pt-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-black mb-2">Evaluation Roadmap</h2>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-xs">Official Process Guide</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* LEFT SIDE: STEPS */}
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  className={`bg-white p-8 rounded-[2rem] border transition-all duration-300 cursor-pointer ${activeStep === step.id ? 'border-blue-500 shadow-xl' : 'border-slate-100 shadow-sm'}`}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 text-blue-600 border border-slate-100">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Step {idx + 1}</span>
                      <h3 className="text-xl font-black text-black mb-1">{step.title}</h3>
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

            {/* RIGHT SIDE: WORKFLOW IMAGE */}
            <div className="lg:sticky lg:top-32 space-y-8">


              <div className="bg-blue-600 p-6 rounded-3xl flex items-center gap-4 shadow-xl">
                <BadgeCheck className="w-10 h-10 text-white" />
                <div>
                  <h4 className="text-lg font-black text-white leading-none">Verified Evaluation</h4>
                  <p className="text-blue-100 text-xs font-medium">Trusted handling of academic credentials.</p>
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
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

    </div>
  );
};

export default EP;