import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiCheckCircle, FiClock, FiShield, FiArrowRight, FiUpload, FiSettings, FiTruck, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import howItWorksImg from "../../assets/howitwork.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Transcripts = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <FiUpload />,
      title: "Uploads",
      description: "Students upload documents to collaboration page.",
    },
    {
      icon: <FiCheckCircle />,
      title: "Reviews",
      description: "Documents are reviewed and verified.",
    },
    {
      icon: <FiSettings />,
      title: "Processes",
      description: "College processes and issues the documents back.",
    },
    {
      icon: <FiTruck />,
      title: "Delivers",
      description: "Final documents delivered to students.",
    },
  ];

  const agencies = [
    { name: "World Education Services (WES)", short: "WES" },
    { name: "Educational Credential Evaluators (ECE)", short: "ECE" },
    { name: "International Education Evaluations (IEE)", short: "IEE" },
    { name: "SpanTran", short: "SpanTran" },
    { name: "IQAS Canada", short: "IQAS" },
    { name: "UK ENIC / NARIC", short: "NARIC" },
  ];

  const documents = [
    "Consolidated Marks Memo (CMM) or semester/year-wise marksheets",
    "Degree Certificate or Provisional Certificate",
    "Internship Certificate (for Pharma & Medical)",
    "Reference Number (WES, ECE, IEE, SpanTran etc.)",
    "Academic Records Request Forms",
    "Valid ID Proof if required",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 md:px-8">
      <style>{`
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.8);
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <main className="pt-24 pb-4 px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transcripts / E-Transcripts
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your official academic transcripts from 289+ Indian universities for education or migration abroad.
            </p>
          </motion.div>
        </main>


        {/* What is Transcripts */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <FiFileText className="text-blue-600 text-3xl" />
            What are Transcripts?
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            A transcript is an official record of your academic performance, including courses taken, grades received,
            and degrees awarded. Universities and employers abroad require transcripts to verify your educational background.
          </p>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            We help you obtain both physical transcripts and e-transcripts (digital copies) from universities across India.
          </p>
          <button
            onClick={() => navigate("/apply")}
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-xl hover:scale-105 transition-all gap-2"
          >
            Apply Now
            <FiArrowRight />
          </button>
        </motion.div>

        {/* HOW IT WORKS IMAGE */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center uppercase tracking-wide">How It Works</h2>
          <div className="flex justify-center overflow-hidden">
            <motion.img
              src={howItWorksImg}
              alt="How it works"
              className="w-full max-w-4xl h-auto mix-blend-multiply -mt-12 md:-mt-20 -mb-20 md:-mb-32"
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.03, 1],
                rotate: [0, 0.5, -0.5, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* AGENCIES & DOCUMENTS SECTION */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 mb-12"
        >
          {/* LEFT SIDE - Supported Agencies */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Supported Credential Evaluation Agencies
            </h2>
            <p className="text-gray-600 mb-6">
              We assist applicants preparing documents for all major credential evaluation agencies worldwide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agencies.map((agency, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiFileText className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {agency.short}
                      </h4>
                      <p className="text-xs text-gray-500">{agency.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - Documents Required */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Documents Required
            </h3>

            <ul className="space-y-4">
              {documents.map((doc, index) => (
                <motion.li
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-blue-600 text-sm" />
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {doc}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="flex justify-center mt-8">
              <motion.button
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                onClick={() => navigate("/apply")}
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all text-base"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center text-white bg-gradient-to-br from-blue-600 to-cyan-600 shadow-2xl border border-blue-400/30 max-w-4xl mx-auto"
        >
          {/* Decorative blurs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-white/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10 text-white tracking-tight">Ready to Get Your Transcripts?</h2>
          <p className="text-blue-50 text-base md:text-lg mb-8 max-w-xl mx-auto font-medium relative z-10 leading-relaxed">
            Start your application now and let us handle the university paperwork for you.
          </p>
          <div className="relative z-10">
            <button
              onClick={() => navigate("/apply")}
              className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-105 transition-all inline-flex items-center justify-center gap-2 group"
            >
              Apply Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Transcripts;