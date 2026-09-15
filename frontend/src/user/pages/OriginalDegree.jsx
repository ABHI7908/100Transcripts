import React from "react";
import { motion } from "framer-motion";
import { FiLock, FiCheckCircle, FiClock, FiShield, FiArrowRight, FiCheck, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import certificateImg from "../../assets/OD.png";
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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const OriginalDegree = () => {
  const navigate = useNavigate();

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
    "FIR copy (if degree is lost)",
    "Affidavit for lost certificate",
    "All semester mark sheets",
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
        <main className="pt-[110px] pb-8 px-4"> {/* pt-24 adds space for a fixed header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Original Degree (OD)
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lost your degree or need a new copy? We handle the university paperwork to get it for you.
            </p>
          </motion.div>
        </main>

        {/* What is OD */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <FiLock className="text-blue-600" />
            What is Original Degree (OD)?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            An Original Degree (OD) is the formal, official document awarded by an educational institution to a student upon the successful completion of their academic program. It certifies that the student has fulfilled all academic requirements for a specific course and has officially graduated.
          </p>

          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Key Points about the Original Degree (OD):</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm"><strong>Official Recognition:</strong> The OD is the final and most authoritative document that confirms a student's academic qualification.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm"><strong>Details Included:</strong> It typically includes the name of the graduate, the name of the institution, the course or program completed, the date of graduation, and sometimes the class or division obtained.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm"><strong>Permanent Proof:</strong> Unlike a provisional certificate, which is temporary, the OD is a permanent document that can be used for lifelong purposes.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm"><strong>Applications:</strong> It is essential for various purposes such as job applications, higher education, visa processing, and professional certifications.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-gray-700 text-sm">The OD is usually issued during or after the graduation ceremony.</span>
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

        {/* Sample Original Degree Image */}
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

export default OriginalDegree;