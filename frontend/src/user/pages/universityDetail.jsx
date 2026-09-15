import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import collegesData from "../data/collegesData";
import Partners from "../components/Partners";
import HowItWorks from "../components/HowItWorks";
import CollegeServices from "../components/CollegeServices";
import {
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiShield,
  FiClock,
  FiUploadCloud,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import heroImage from "../../assets/partnerclg.png";

// ✅ Counter animation
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let start = 0;
        const end = target;
        const timer = setInterval(() => {
          start += Math.ceil(end / 60);
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 25);
      }}
    >
      {count}
      {value.includes("+") && "+"}
      {value.includes("%") && "%"}
    </motion.span>
  );
};

const UniversityDetail = () => {
  const { universityId } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get university name and short name
  const universityName = university?.title || "University";
  const shortName = university?.short || "UNI";

  // Try to fetch actual university data from collegesData.jsx
  useEffect(() => {
    const fetchUniversity = () => {
      setLoading(true);
      const foundUniversity = collegesData[universityId];

      if (foundUniversity) {
        const uni = { id: universityId, ...foundUniversity };
        setUniversity(uni);
        setError(""); // Clear previous error
        const uniName = uni.title || "University";
      } else {
        setError("University not found in local records");
        setUniversity(null);
      }
      setLoading(false);
    };

    fetchUniversity();
  }, [universityId]);

  // Default stats for universities
  const stats = university?.stats?.length > 0 ? university.stats.map((stat, index) => ({
    value: stat.value,
    label: stat.label,
    icon: index === 0 ? <FiCheckCircle /> : index === 1 ? <FiFileText /> : index === 2 ? <FiShield /> : <FiClock />
  })) : [
    { value: "17,000+", label: "Students Served", icon: <FiCheckCircle /> },
    { value: "50+", label: "Partner Universities", icon: <FiFileText /> },
    { value: "98%", label: "Success Rate", icon: <FiShield /> },
    { value: "24/7", label: "Student Support", icon: <FiClock /> },
  ];

  // Default services for universities
  const services = university?.services?.length > 0 ? university.services : [
    "Marks Memorandum",
    "MOI Letter",
    "Transcripts",
    "Degree Certificate",
    "Verifications (for Organizations)",
    "Pharmacy Council Documents",
  ];

  const requirements = [
    "Transcripts",
    "Marks Memorandum",
    "MOI Letter",
    "Degree Certificate",
    "Verifications",
    "Pharmacy Council Documents",
  ];


  if (loading) {
    return (
      <div className="bg-white text-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading university details...</p>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="bg-white text-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-600 mb-2">University not found</p>
          <p className="text-slate-500 text-sm mb-4">{error}</p>
          <Link to="/universities" className="text-blue-600 hover:text-blue-700">
            ← Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900">
      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-16 md:pt-20 md:pb-24">
        <div className="absolute inset-0 bg-right bg-no-repeat opacity-100 hidden md:block" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "contain" }} />
        {/* Mobile background */}
        <div className="absolute inset-0 bg-center bg-no-repeat opacity-10 md:hidden" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover" }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,255,0.98)_0%,rgba(248,251,255,0.95)_28%,rgba(248,251,255,0.78)_48%,rgba(248,251,255,0.30)_70%,rgba(248,251,255,0.02)_100%)] hidden md:block" />
        {/* Mobile gradient */}
        <div className="absolute inset-0 bg-white/90 md:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_28%)]" />
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity }} className="absolute left-0 top-0 h-72 w-72 bg-blue-200 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-2 md:px-4 lg:px-2">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative w-full pl-0 lg:-ml-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white shadow-md p-3 flex items-center justify-center border border-slate-100 shrink-0 overflow-hidden">
                  <img src={university?.logo} alt={shortName} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  Partnered University
                </div>
              </div>

              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-[#233a59] md:text-4xl xl:text-5xl">
                Exclusive Services for{" "}
                <span className="text-blue-600">
                  {university?.title ? university.title.replace("Exclusive Transcript Services for ", "").replace("Exclusive Document Services for ", "").replace("Exclusive Services for ", "") : universityName}
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {university?.description || `${universityName} students can now apply for transcript and document services without visiting the university. We make the process simple, guided, and reliable for credential evaluations and official submissions.`}
              </motion.p>

              <div className="mt-6 flex flex-wrap gap-3">
                {["Fast processing", "Secure documentation", "Dedicated support"].map((t) => (
                  <div key={t} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
                    <FiCheckCircle className="text-blue-600" /> {t}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition">
                  <FaWhatsapp /> Contact Us
                </motion.a>
                <motion.a whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} href="#submit-documents" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm">
                  Submit Documents <FiArrowRight />
                </motion.a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((item, index) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.08 }} viewport={{ once: true }} className="rounded-2xl bg-white/90 px-4 py-4 text-center shadow-md ring-1 ring-slate-100 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-[#2f4a6d]"><Counter value={item.value} /></p>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <CollegeServices
        services={services}
        description={`Exclusive services for ${universityName} students for credential evaluations, university submissions, and official verification needs.`}
      />

      {/* ══ GET STARTED ══ */}
      <section id="submit-documents" className="bg-white pt-4 pb-12 md:pb-16">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="rounded-3xl p-8 md:p-10 text-center text-white relative overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-600 shadow-xl border border-blue-400/30">
              {/* Decorative glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">Get Started</p>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold leading-tight text-white">Ready to Submit Your Documents?</h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-50">Safe, guided, and secure submission process with faster turnaround through our dedicated support.</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 relative z-10">
                <Link to="/apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-blue-700 shadow-xl transition hover:scale-105 hover:shadow-black/10">
                  Apply Now <FiArrowRight />
                </Link>
                <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-xl transition hover:scale-105 hover:shadow-black/10">
                  <FaWhatsapp size={16} /> Contact Support
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      <HowItWorks />
      <Partners />
    </div>
  );
};

export default UniversityDetail;
