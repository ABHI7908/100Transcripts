import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiCheckCircle, FiClock, FiAward, FiArrowRight, FiUpload, FiSettings, FiTruck, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import certificateImg from "../../assets/CMM.png";
import cesLogo from "../../assets/CES.png";
import eceLogo from "../../assets/ece.png";
import enicLogo from "../../assets/ENIC.png";
import icasLogo from "../../assets/ICAS.png";
import ieeLogo from "../../assets/IEE-1.png";
import iqasLogo from "../../assets/IQAS.png";
import nasabLogo from "../../assets/NASAB.png";
import pebcLogo from "../../assets/PEBC.png";
import spantraLogo from "../../assets/Spantra.png";
import wesLogo from "../../assets/WES.png";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const CMM = () => {
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
    { name: "World Education Services (WES)", short: "WES", logo: wesLogo },
    { name: "Educational Credential Evaluators (ECE)", short: "ECE", logo: eceLogo },
    { name: "International Education Evaluations (IEE)", short: "IEE", logo: ieeLogo },
    { name: "SpanTran", short: "SpanTran", logo: spantraLogo },
    { name: "IQAS Canada", short: "IQAS", logo: iqasLogo },
    { name: "UK ENIC / NARIC", short: "NARIC", logo: enicLogo },
    { name: "CES", short: "CES", logo: cesLogo },
    { name: "ICAS", short: "ICAS", logo: icasLogo },
    { name: "NASAB", short: "NASAB", logo: nasabLogo },
    { name: "PEBC", short: "PEBC", logo: pebcLogo },
  ];

  const documents = [
    "All individual semester mark sheets",
    "Degree certificate / Provisional certificate",
    "Government ID proof (Aadhaar, PAN, Passport)",
    "Passport size photographs",
    "University registration number",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-12 px-4 md:px-8">
      <style>{`
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.8);
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scroll-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .scroll-content {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }
        .scroll-content:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <main className="pt-[110px] pb-8 px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Consolidated Mark Memorandum (CMM)
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get your consolidated mark sheet containing all semester marks in a single document.
            </p>
          </motion.div>
        </main>


        {/* What is CMM */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <FiFileText className="text-blue-600" />
            What is Consolidated Marks Memo (CMM)?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            A Consolidated Marks Memo (CMM) is an official document issued by an educational institution that provides a comprehensive record of a student's academic performance throughout a course or program. It lists the grades or marks obtained in all subjects or semesters during the duration of the course.
          </p>

          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Key Points about the CMM:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm">It combines the results from all semesters or years into one single document.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm">The CMM typically shows detailed information such as the marks obtained, total marks, grades, and overall percentage or CGPA.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm">It is often required for applications for further studies, employment, or other official purposes.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm">Unlike individual semester marks memos, a CMM provides an at-a-glance summary of academic achievements over the entire course.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm">This document is usually issued after the completion of a program and can be used as proof of academic performance until the final degree is awarded.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate("/apply")}
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all gap-2 text-sm group"
          >
            Apply Now
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Sample CMM Image */}
        <div className="flex justify-center">
          <img
            src={certificateImg}
            alt="Sample Consolidated Marks Memo"
            className="w-64 md:w-80 lg:w-96 h-auto rounded-lg shadow-md"
          />
        </div>




        {/* AGENCIES SECTION */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Supported Credential Evaluation Agencies
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
            We assist applicants preparing documents for all major credential evaluation agencies worldwide.
          </p>

          <div className="scroll-container py-4">
            <div className="scroll-content">
              {[...agencies, ...agencies].map((agency, index) => (
                <motion.div
                  key={`${agency.short}-${index}`}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl p-1 py-2 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center mx-3 flex-shrink-0"
                  style={{ width: '120px' }}
                >
                  <img
                    src={agency.logo}
                    alt={agency.short}
                    className="w-[110px] h-[90px] object-contain mb-1 scale-[1.15]"
                  />
                  <h4 className="font-semibold text-gray-900 text-xs text-center">
                    {agency.short}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>



      </div>
    </div>
  );
};

export default CMM;