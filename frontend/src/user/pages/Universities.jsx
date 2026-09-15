import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowRight, FiAward, FiStar, FiTrendingUp, FiShield, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import collegesData from "../data/collegesData";

const ITEMS_PER_PAGE = 12;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const Universities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const colleges = Object.entries(collegesData).map(([id, data]) => ({
    id,
    ...data,
  }));

  const getCleanTitle = (title) => title.replace("Exclusive Transcript Services for ", "").replace("Exclusive Document Services for ", "").replace(" Students", "");

  const filteredColleges = searchTerm.trim().length > 0
    ? colleges.filter((college) => {
      const cleanTitle = getCleanTitle(college.title).toLowerCase();
      const short = college.short.toLowerCase();
      const q = searchTerm.toLowerCase().trim();
      return cleanTitle.split(' ').some(word => word.startsWith(q)) || short.startsWith(q);
    })
    : colleges;

  // Pagination logic
  const totalPages = Math.ceil(filteredColleges.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedColleges = filteredColleges.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      {/* Hero Section - Integrated search & tight spacing */}
      <section className="relative overflow-hidden pt-[100px] md:pt-[100px] pb-12 md:pb-16">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.15] tracking-tight">
              <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent pb-2">
                Your Gateway to
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-600 bg-clip-text text-transparent pb-2">
                Transcript Excellence
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed mb-8"
            >
              We've partnered with India's most prestigious universities to deliver
              <span className="font-bold text-slate-800"> seamless, secure, and lightning-fast</span> transcript services.
            </motion.p>

            {/* Premium Integrated Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative max-w-2xl mx-auto mb-10 z-30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-1.5 shadow-xl border border-white/80 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 px-4 py-2.5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                    <FiSearch className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for your university by name or short code..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="flex-1 text-sm md:text-base font-medium text-slate-800 placeholder:text-slate-400 bg-transparent border-none focus:ring-0 outline-none"
                  />
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => { setSearchTerm(""); setCurrentPage(1); }}
                      className="px-3 py-1.5 text-xs md:text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      Clear
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchTerm.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute z-50 mt-3 w-full bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[300px] overflow-y-auto text-left"
                  >
                    {filteredColleges.length > 0 ? (
                      filteredColleges.slice(0, 8).map((college) => (
                        <Link
                          key={college.id}
                          to={`/universities/${college.id}`}
                          className="flex items-center gap-3 px-5 py-3.5 hover:bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-300 border-b border-slate-50 last:border-none group"
                        >
                          <div className="w-10 h-10 rounded-full bg-white shadow border border-slate-100 p-1.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <img src={college.logo} alt="" className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                              {college.title.replace("Exclusive Transcript Services for ", "").replace("Exclusive Document Services for ", "").replace(" Students", "")}
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                              {college.short}
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                            <FiArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-5 py-8 text-center">
                        <p className="text-slate-500 text-sm font-medium">No universities found matching your search.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Premium Stats - Tighter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {[
                { value: colleges.length, label: "Universities", icon: <FiAward size={22} />, color: "from-blue-500 to-blue-600" },
                { value: "24/7", label: "Support", icon: <FiStar size={22} />, color: "from-purple-500 to-purple-600" },
                { value: "98%", label: "Success Rate", icon: <FiTrendingUp size={22} />, color: "from-cyan-500 to-cyan-600" },
                { value: "100%", label: "Secure", icon: <FiShield size={22} />, color: "from-green-500 to-green-600" }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg group-hover:shadow-xl transition-all duration-300" />
                  <div className="relative p-5 text-center">
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-black text-slate-800 mb-1">
                      {stat.value}
                      {typeof stat.value === "number" && "+"}
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Universities Grid with Pagination */}
      <section className="pt-10 md:pt-14 pb-8">
        <div className="relative mx-auto max-w-7xl px-6">

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-bold text-slate-500">
              Showing {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filteredColleges.length)} of {filteredColleges.length} universities
            </p>
          </div>

          <motion.div
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {paginatedColleges.map((college) => (
              <Link key={college.id} to={`/universities/${college.id}`} className="block">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  className="group relative"
                >
                  {/* Card Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Main Card */}
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/70 shadow-lg group-hover:shadow-2xl overflow-hidden transition-all duration-500">
                    <div className="relative p-6 flex flex-col items-center text-center">
                      {/* Bigger Logo */}
                      <div className="relative mb-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-white to-slate-50 shadow-xl border border-slate-100 p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                          <img
                            src={college.logo}
                            alt={college.short}
                            className="w-full h-full object-contain scale-[1.15]"
                          />
                        </div>
                      </div>

                      {/* Short Name Badge */}
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-3 shadow-sm">
                        {college.short}
                      </span>

                      {/* University Name */}
                      <h3 className="text-base font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors duration-300 mb-3">
                        {college.title.replace("Exclusive Transcript Services for ", "").replace("Exclusive Document Services for ", "").replace(" Students", "")}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">
                        {college.description}
                      </p>

                      {/* CTA Button */}
                      <div className="w-full mt-2">
                        <div className="relative flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-cyan-500/30 group-hover:-translate-y-0.5">
                          View Details
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mt-8"
            >
              {/* Previous */}
              <button
                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${currentPage === 1
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 shadow-md border border-slate-200 hover:border-blue-200'
                  }`}
              >
                <FiChevronLeft size={18} />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, idx) => (
                page === "..." ? (
                  <span key={`dots-${idx}`} className="w-10 h-10 flex items-center justify-center text-slate-400 font-bold">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 ${currentPage === page
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-110'
                      : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 shadow-md border border-slate-200 hover:border-blue-200'
                      }`}
                  >
                    {page}
                  </button>
                )
              ))}

              {/* Next */}
              <button
                onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${currentPage === totalPages
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 shadow-md border border-slate-200 hover:border-blue-200'
                  }`}
              >
                <FiChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="relative overflow-hidden mx-auto max-w-5xl rounded-[2.5rem] shadow-2xl py-8 md:py-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600" />

          {/* Animated Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-[600px] h-[600px] border-2 border-white/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-60 -left-60 w-[800px] h-[800px] border border-white/5 rounded-full"
            />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full mb-4 border border-white/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-white/90">EXPANDING NETWORK</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-3 leading-[1.15] tracking-tight">
                Can't Find Your University?
              </h2>

              <p className="text-base sm:text-lg text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
                We're continuously partnering with more institutions.
                Contact us today and let us help you with your transcript needs.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-base shadow-2xl shadow-white/30 hover:shadow-3xl hover:shadow-white/40 transition-all duration-500 hover:scale-105 group"
              >
                Contact Us Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Universities;
