import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiCheckCircle, FiClock, FiGlobe, FiArrowRight, FiUpload, FiSettings, FiTruck, FiCheck, FiFileText, FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight, FiPhone, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import certificateImg1 from "../../assets/ANU.png";
import certificateImg2 from "../../assets/AU-MOI.png";
import certificateImg3 from "../../assets/BDU.png";
import certificateImg4 from "../../assets/OU.png";
import certificateImg5 from "../../assets/Dr.N.T.R.png";
import certificateImg6 from "../../assets/JNTUK.png";
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
  hidden: { opacity: 5, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const MOICertificate = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const carouselImages = [
    { img: certificateImg1, label: 'ANU University' },
    { img: certificateImg2, label: 'Andhra University' },
    { img: certificateImg3, label: 'BDU University' },
    { img: certificateImg4, label: 'Osmania University' },
    { img: certificateImg5, label: 'Dr. N.T.R University' },
    { img: certificateImg6, label: 'JNTUK' },
  ];

  const faqs = [
    {
      question: "What is a Medium Certificate?",
      answer: "Medium of instruction (MOI) is a certificate that shows whether the student studied in English Medium or Not. Examples include BDU MOI Certificate, Dr. N.T.R MOI Certificate, JNTUK MOI Certificate."
    },
    {
      question: "I just came to know at the last minute that we need to upload the MOI Softcopy to UK ECCTIS portal. I don't have much time.",
      answer: "Our Universities would take certain time, but we can help expedite the process for you."
    },
    {
      question: "Are there any alternatives for MOI?",
      answer: "Yes. A) If your Degree Certificate is showing 'Medium is English', then no need of a separate MOI. B) If your Degree Certificate is showing college name and then you are eligible to apply MOI from college as well."
    },
    {
      question: "Why do they need Medium Certificate though my BTech is in English Medium everywhere?",
      answer: "India is a non English speaking country. Hence we need to show this exclusively to foreign universities."
    },
    {
      question: "Can I call you once to discuss?",
      answer: "Sure. Please don't hesitate to give a call @ +91 9941 9914 02 to discuss alternatives."
    },
    {
      question: "Should I apply Medium Certificate at the College or University?",
      answer: "Ideally this should be applied at the University, because all your academic documents show University name on top of them, not the college name."
    },
    {
      question: "How much time does our University take?",
      answer: "Each university follows their own timelines. For example: JNTUH takes 5 working days, NTRUHS takes 10-20 working days, Andhra University takes 7-15 working days, etc."
    },
    {
      question: "What are all the documents needed to apply MOI?",
      answer: "Copy of Original Degree/ Provisional certificate + ID proof."
    },
    {
      question: "Can you apply on behalf of me?",
      answer: "Sure. Just click the WhatsApp button and our backend team will revert with step by step process."
    },
    {
      question: "What are the important points to check in an MOI?",
      answer: "Check that the certificate clearly states 'Medium of Instruction: English' and includes your name, degree, university name, and date."
    }
  ];

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
    "Copy of Original Degree/ Provisional certificate",
    "ID proof (Aadhaar, PAN, Passport)",
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              MOI Certificate
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Medium of Instruction certificate proving you studied in English. Essential for UK and European universities.
            </p>
          </motion.div>
        </main>


        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FiBookOpen className="text-blue-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-left text-sm">{faq.question}</span>
                  {openFaq === index ? <FiChevronUp className="text-blue-600" /> : <FiChevronDown className="text-blue-600" />}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white">
                        <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="bg-blue-50 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <FiPhone className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Call us for queries</p>
              <p className="font-bold text-gray-900">+91 9941 9914 02</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <FiMail className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email us</p>
              <p className="font-bold text-gray-900">Support@100Transcripts.com</p>
            </div>
          </div>
        </motion.div>

        {/* Sample MOI Certificate Images */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sample MOI Certificates</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carouselImages.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(item)}
                className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-auto rounded-lg shadow-md mb-3"
                />
                <p className="text-sm text-gray-600 font-medium text-center">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-white rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-auto">
              <img
                src={selectedImage.img}
                alt={selectedImage.label}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-center text-gray-700 font-medium mt-4">{selectedImage.label}</p>
              <button
                onClick={() => setSelectedImage(null)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}



        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[2rem] shadow-2xl p-8 text-center text-white relative overflow-hidden border border-blue-400/30 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Need an MOI Certificate?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Get your Medium of Instruction certificate and waive English language tests for your abroad studies.
          </p>
          <button
            onClick={() => navigate("/apply")}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition inline-flex items-center gap-2 shadow-lg hover:shadow-xl group"
          >
            Apply Now
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>


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

export default MOICertificate;