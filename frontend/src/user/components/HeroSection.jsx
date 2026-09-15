import React, { useMemo, useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiAward, FiFileText, FiArrowRight, FiSearch, FiUsers, FiGlobe, FiMapPin, FiCheckCircle, FiClipboard, FiBriefcase, FiLayers, FiFile } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import collegesData from "../data/collegesData";
const Globe = lazy(() => import("react-globe.gl"));

// Static data moved outside to fix useMemo dependency and optimize performance
const locations = [
  { name: "USA", lat: 39.0902, lng: -95.7129, size: 0.1 },
  { name: "UK", lat: 55.3781, lng: -3.4360, size: 0.1 },
  { name: "Canada", lat: 56.1304, lng: -106.3468, size: 0.1 },
  { name: "Australia", lat: -25.2744, lng: 133.7751, size: 0.1 },
  { name: "India", lat: 20.5937, lng: 78.9629, size: 0.15, isMain: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const leftItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const rightItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HeroSection = () => {
  const globeRef = useRef();
  const [globeSize, setGlobeSize] = useState(window.innerWidth < 768 ? 320 : 800);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    navigate("/apply");
  };

  const getCleanTitle = (title) => title.replace("Exclusive Transcript Services for ", "").replace("Exclusive Document Services for ", "").replace(" Students", "");

  const colleges = Object.entries(collegesData).map(([id, data]) => ({ id, ...data }));

  const filteredColleges = searchQuery.trim().length > 0
    ? colleges.filter((college) => {
      const cleanTitle = getCleanTitle(college.title).toLowerCase();
      const short = college.short.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      return cleanTitle.split(' ').some(word => word.startsWith(q)) || short.startsWith(q);
    })
    : [];

  useEffect(() => {
    const handleResize = () => {
      setGlobeSize(window.innerWidth < 768 ? 320 : 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Arcs from India to other cities
  const arcsData = useMemo(() => {
    const india = locations.find(l => l.name === "India");
    return locations
      .filter(l => l.name !== "India")
      .map(target => ({
        startLat: india.lat,
        startLng: india.lng,
        endLat: target.lat,
        endLng: target.lng,
        color: ["#b4caee", "#93c5fd"],
      }));
  }, []);

  useEffect(() => {
    let interval;
    const initGlobe = () => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.0;
          controls.enableZoom = false;
          controls.enablePan = false;

          // Initial position to show India
          globeRef.current.pointOfView({ lat: 20, lng: 80, altitude: 2.5 });
          return true;
        }
      }
      return false;
    };

    if (!initGlobe()) {
      interval = setInterval(() => {
        if (initGlobe()) {
          clearInterval(interval);
        }
      }, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative bg-[#f8fbff] pt-[80px] pb-6 lg:pb-10 lg:h-[calc(100vh)] lg:min-h-[650px] lg:max-h-[900px] overflow-hidden flex flex-col items-center justify-between">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-100/40 rounded-full blur-[80px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[80px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative z-10 h-full">

        {/* TOP TITLE */}
        <div className="text-center w-full z-30 mb-2 lg:mb-4 shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#0f2851] leading-tight tracking-tight">
              India’s #1 Trusted <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Transcripts</span>   Provider
            </h1>
          </motion.div>
        </div>

        {/* 3-COLUMN LAYOUT FOR CARDS & GLOBE */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2 mb-0 flex-1 min-h-0">

          {/* LEFT CONTENT - EVALUATIONS */}
          <motion.div
            className="flex flex-col w-full lg:w-[320px] shrink-0 z-20 order-1 lg:order-none px-2 lg:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-[15px] font-bold text-[#0f2851] mb-0.5">Evaluations</h2>
            <div className="w-6 h-[2px] bg-[#1d4ed8] rounded-full mb-3"></div>

            <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:space-y-2.5 lg:gap-0">
              {/* Card 1: WES */}
              <motion.div variants={leftItemVariants}>
                <Link to="/services/wes" className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between group hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-xl"></div>
                  <div className="flex items-center gap-2 lg:gap-3 pl-2">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center font-bold text-[15px] text-green-600 bg-green-50 rounded-full border border-green-100">WES</div>
                    <div>
                      <h3 className="text-[#0f2851] font-bold text-[13px] leading-tight">WES</h3>
                      <p className="text-slate-500 text-[10px]">(Official Partner)</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2: ECE */}
              <motion.div variants={leftItemVariants}>
                <Link to="/services/ece" className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between group hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-xl"></div>
                  <div className="flex items-center gap-2 lg:gap-3 pl-2">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center font-bold text-[15px] text-white bg-blue-600 rounded-full border border-blue-200">ECE</div>
                    <div>
                      <h3 className="text-[#0f2851] font-bold text-[13px] leading-tight">ECE</h3>
                      <p className="text-slate-500 text-[10px]">(Official Partner)</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Card 3: IEE */}
              <motion.div variants={leftItemVariants}>
                <Link to="/services/iee" className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between group hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1d4ed8] rounded-l-xl"></div>
                  <div className="flex items-center gap-2 lg:gap-3 pl-2">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center font-bold text-lg tracking-tighter text-[#1d4ed8] bg-blue-50 rounded-full border border-blue-100">iee</div>
                    <div>
                      <h3 className="text-[#0f2851] font-bold text-[13px] leading-tight">IEE</h3>
                      <p className="text-slate-500 text-[10px]">(Preferred Partner)</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Card 4: Alianza */}
              <motion.div variants={leftItemVariants}>
                <a href="https://alianzaeval.com/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between group hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-xl"></div>
                  <div className="flex items-center gap-2 lg:gap-3 pl-2">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 flex flex-col items-center justify-center text-slate-800 bg-slate-50 rounded-full border border-slate-100 leading-none">
                      <span className="text-[15px] font-bold">A</span>
                    </div>
                    <div>
                      <h3 className="text-[#0f2851] font-bold text-[13px] leading-tight">Alianza</h3>
                      <p className="text-slate-500 text-[10px]">(Official Partner)</p>
                    </div>
                  </div>
                </a>
              </motion.div>

            </div>
          </motion.div>

          {/* MIDDLE: GLOBE */}
          <div className="flex-1 relative h-full min-h-[220px] lg:min-h-[260px] flex justify-center items-center w-full z-10 -mx-4 lg:mx-0 order-2 lg:order-none">

            <div className="flex items-center justify-center cursor-grab active:cursor-grabbing scale-[1.0] sm:scale-[1.1] lg:scale-[0.75] transition-transform z-20 -mt-2 lg:-mt-8 mb-[-10px]">
              <Suspense fallback={
                <div className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] bg-blue-100/20 rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <Globe
                  ref={globeRef}
                  width={globeSize}
                  height={globeSize}
                  backgroundColor="rgba(0,0,0,0)"
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                  atmosphereColor="#93c5fd"
                  atmosphereAltitude={0.4}

                  arcsData={arcsData}
                  arcColor="color"
                  arcDashLength={0.5}
                  arcDashGap={2}
                  arcDashAnimateTime={1500}
                  arcStroke={0.4}

                  htmlElementsData={locations}
                  htmlElement={d => {
                    const el = document.createElement('div');
                    el.innerHTML = `
                      <div class="flex flex-col items-center -translate-y-1/2">
                        <div class="relative flex flex-col items-center">
                          ${d.isMain
                        ? `<div class="w-4 h-4 bg-[#1d4ed8] rounded-full border-[2px] border-white shadow-[0_0_15px_rgba(29,78,216,0.8)] animate-pulse flex items-center justify-center relative"></div>
                           <div class="absolute -top-8 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded shadow-xl border border-blue-200 whitespace-nowrap">
                              <span class="text-[10px] font-black text-[#1d4ed8] uppercase tracking-widest">INDIA</span>
                           </div>`
                        : `<div class="w-2.5 h-2.5 bg-cyan-400 rounded-full border-[2px] border-white shadow-[0_0_10px_rgba(34,211,238,0.9)] relative animate-pulse"></div>
                           <div class="absolute -top-6 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md shadow-lg border border-cyan-100 whitespace-nowrap">
                              <span class="text-[9px] font-black text-cyan-600 uppercase tracking-widest">${d.name}</span>
                           </div>`
                      }
                        </div>
                      </div>
                    `;
                    return el;
                  }}
                />
              </Suspense>
            </div>

            {/* Glowing Backdrop behind globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/10 blur-[60px] rounded-full pointer-events-none -z-10"></div>
          </div>

          {/* RIGHT CONTENT - SERVICES */}
          <motion.div
            className="flex flex-col w-full lg:w-[320px] shrink-0 z-20 lg:-translate-x-16 xl:-translate-x-20 order-3 lg:order-none mt-2 lg:mt-0 px-2 lg:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-[15px] font-bold text-[#0f2851] mb-0.5">Services</h2>
            <div className="w-6 h-[2px] bg-[#1d4ed8] rounded-full mb-3"></div>

            <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:space-y-2.5 lg:gap-0">
              {/* Card 1: Transcripts */}
              <motion.div variants={rightItemVariants}>
                <Link to="/services/transcripts" className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between group hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-400 rounded-l-xl"></div>
                  <div className="flex items-center gap-2 lg:gap-3 pl-2">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1d4ed8] shrink-0 border border-blue-100">
                      <FiClipboard className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[#0f2851] font-bold text-[13px] leading-tight mb-0.5">Transcripts</h3>
                      <p className="text-slate-500 text-[9px] leading-tight">Official transcripts sent directly to institutions.</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2: Degree Certificate */}
              <motion.div variants={rightItemVariants}>
                <Link to="/services/od" className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between group hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-400 rounded-l-xl"></div>
                  <div className="flex items-center gap-2 lg:gap-3 pl-2">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1d4ed8] shrink-0 border border-blue-100">
                      <FiCheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[#0f2851] font-bold text-[13px] leading-tight mb-0.5">Degree Certificate</h3>
                      <p className="text-slate-500 text-[9px] leading-tight">Get your degree certificate verified.</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Card 3: Marks Memo */}
              <motion.div variants={rightItemVariants}>
                <Link to="/services/cmm" className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between group hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-400 rounded-l-xl"></div>
                  <div className="flex items-center gap-2 lg:gap-3 pl-2">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1d4ed8] shrink-0 border border-blue-100">
                      <FiLayers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[#0f2851] font-bold text-[13px] leading-tight mb-0.5">Marks Memo</h3>
                      <p className="text-slate-500 text-[9px] leading-tight">Consolidated marks memo evaluation.</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Card 4: MOI */}
              <motion.div variants={rightItemVariants}>
                <Link to="/services/moi" className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between group hover:shadow-[0_4px_15px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-400 rounded-l-xl"></div>
                  <div className="flex items-center gap-2 lg:gap-3 pl-2">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1d4ed8] shrink-0 border border-blue-100">
                      <FiFile className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[#0f2851] font-bold text-[13px] leading-tight mb-0.5">MOI</h3>
                      <p className="text-slate-500 text-[9px] leading-tight">Medium of Instruction certificate.</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM: PARAGRAPH & SEARCH BAR */}
        <div className="w-full max-w-2xl flex flex-col items-center justify-center z-50 mb-0 shrink-0 relative z-30 mt-10 lg:mt-[-10px] px-2 lg:px-0 order-4 lg:order-none">
          <motion.p
            className="text-[#2f4a6d] text-[13px] md:text-sm font-medium leading-relaxed text-center mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Your Gateway to <span className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider mx-1">GLOBAL</span> Education and Career – Providing official university transcripts and evaluation support.
          </motion.p>

          <div className="relative w-full">
            <motion.div
              className="flex bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 p-1.5 items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="pl-4 text-slate-400">
                <FiSearch className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Enter Your University Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 px-4 py-2.5 outline-none text-[#0f2851] font-medium placeholder:text-slate-400 text-sm bg-transparent"
              />
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold transition-all duration-300 active:scale-95 text-[13px] whitespace-nowrap flex items-center gap-2 shadow-md shadow-cyan-500/30"
              >
                Start Now <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {searchQuery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute z-50 bottom-full mb-2 w-full bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-h-[200px] overflow-y-auto text-left"
                >
                  {filteredColleges.length > 0 ? (
                    filteredColleges.slice(0, 4).map((college) => {
                      const isPartnerCollege =
                        college.title.includes("Bhaskar Pharmacy") ||
                        college.title.includes("Joginpally") ||
                        college.title.includes("Siddhartha Institute");

                      return (
                        <Link
                          key={college.id}
                          to={isPartnerCollege ? `/partnered-colleges/${college.id}` : `/universities/${college.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-300 border-b border-slate-50 last:border-none group"
                        >
                          <div className="w-7 h-7 rounded-full bg-white shadow border border-slate-100 p-1 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <img src={college.logo} alt="" className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                              {getCleanTitle(college.title)}
                            </h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                              {college.short}
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                            <FiArrowRight className="w-3 h-3" />
                          </div>
                        </Link>
                      )
                    })
                  ) : (
                    <div className="px-4 py-4 text-center">
                      <p className="text-slate-500 text-xs font-medium">No universities found.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>



      </div>
    </div>
  );
};

export default HeroSection;

