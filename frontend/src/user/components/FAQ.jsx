import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What services does 100Transcripts LLP provide?",
    answer:
      "100Transcripts LLP offers certified transcripts, secure E-Transcripts, credential evaluations, and verified degree certificates. They also provide courier delivery, application tracking, and internship opportunities—trusted by thousands across India and partnered with global agencies like WES, IEE, ECE, and TEC.",
  },

  {
    question: "Is the process secure and recognized?",
    answer:
      "Yes, the process is secure and widely recognized. 100 Transcripts LLP is ISO-certified and trusted by over 17,000+ applicants.",
  },
  {
    question: "Which evaluation agencies are supported?",
    answer:
      "We support IEE, ECE, SpanTran, AZICE, WES, IQAS, CES, and UK-NARIC.",
  },
  {
    question: "Can I track my application status?",
    answer:
      "Absolutely! Use the Track Application feature on the homepage.",
  },
  {
    question: "Can I choose electronic or physical transcripts?",
    answer:
      "Yes! Choose E-Transcripts or courier delivery.",
  },
  {
    question: "How do I apply for transcript services?",
    answer:
      "Click Apply → Upload Documents. Our team will guide you.",
  },
];

const FAQ = () => {
  // ALL CLOSED INITIALLY
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full pt-8 pb-20 bg-white overflow-hidden relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex flex-col items-center justify-center mb-4">
            <span className="inline-block px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-blue-600 bg-blue-50 rounded-full border-2 border-blue-200 uppercase">
              FAQs
            </span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#2f4a6d]">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-gray-500 max-w-2xl mx-auto text-sm">
            Everything you need to know about our transcript services
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14">

          {/* LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 p-7 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl border border-blue-100 shadow-lg">

              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white mb-6 shadow-lg">
                <MessageCircle size={24} />
              </div>

              <h4 className="text-2xl font-bold text-[#2f4a6d] mb-3">
                Need Help?
              </h4>

              <p className="text-gray-600 text-sm leading-7 mb-7">
                Our support team is ready to guide you through the transcript
                process step by step and answer all your questions.
              </p>

             <Link to="/contact" className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
                <MessageCircle size={18} />
                Contact Support
              </Link>
            </div>
          </motion.div>

          {/* FAQ LIST */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="lg:col-span-2 space-y-4"
          >

            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-blue-500 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 shadow-xl shadow-blue-500/10 scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-lg hover:bg-slate-50"
                  }`}
                >

                  {/* QUESTION */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none"
                  >
                    <span
                      className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${
                        isOpen ? "text-blue-700" : "text-[#2f4a6d]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                      className={`flex shrink-0 h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </motion.div>
                  </button>

                  {/* ANSWER ANIMATED */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-5"></div>
                          <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;