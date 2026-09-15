import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowRight, FiAward, FiStar, FiTrendingUp, FiShield, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import collegesData from "../data/collegesData";
import partnerclg from "../../assets/partnerclg.png";

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

const PartnerColleges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const colleges = Object.entries(collegesData).filter(([_, data]) =>
    data.title.includes("Bhaskar Pharmacy") ||
    data.title.includes("Joginpally") ||
    data.title.includes("Siddhartha Institute")
  ).map(([id, data]) => ({ id, ...data }));

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
    <div className="bg-gradient-to-br from-amber-50 via-white to-rose-50 min-h-screen">
      {/* Premium Hero Section - Reduced padding */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 bg-right bg-no-repeat opacity-15" style={{ backgroundImage: `url(${partnerclg})`, backgroundSize: "contain" }} />

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-rose-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl shadow-lg border border-white/50 mb-6"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">
                PREMIUM PARTNERED COLLEGES
              </span>
              <FiStar className="w-3.5 h-3.5 text-yellow-500" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.15] tracking-tight">
              <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Our Partnered
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
                Colleges Network
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed mb-8"
            >
              We've established exclusive partnerships with leading colleges to deliver
              <span className="font-bold text-slate-800"> seamless, secure, and lightning-fast</span> transcript and document services.
            </motion.p>

            {/* Premium Integrated Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative max-w-2xl mx-auto mb-10 z-30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-rose-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-1.5 shadow-xl border border-white/80 focus-within:ring-2 focus-within:ring-amber-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 px-4 py-2.5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                    <FiSearch className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for your college by name or short code..."
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
                      filteredColleges.map((college) => (
                        <Link
                          key={college.id}
                          to={`/partnered-colleges/${college.id}`}
                          className="flex items-center gap-3 px-5 py-3.5 hover:bg-gradient-to-r from-amber-50 to-rose-50 transition-all duration-300 border-b border-slate-50 last:border-none group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-white shadow border border-slate-100 p-1.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <FiAward className="w-6 h-6 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-slate-800 group-hover:text-amber-700 transition-colors truncate">
                              {college.title.replace("Exclusive Transcript Services for ", "").replace("Exclusive Document Services for ", "").replace(" Students", "")}
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                              {college.short}
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-7 h-7 rounded-md bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                            <FiArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-5 py-8 text-center">
                        <p className="text-slate-500 text-sm font-medium">No colleges found matching your search.</p>
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
                { value: partnerColleges.length, label: "Colleges", icon: <FiAward size={22} />, color: "from-amber-500 to-orange-600" },
                { value: "24/7", label: "Support", icon: <FiStar size={22} />, color: "from-rose-500 to-pink-600" },
                { value: "98%", label: "Success Rate", icon: <FiTrendingUp size={22} />, color: "from-orange-500 to-amber-600" },
                { value: "100%", label: "Secure", icon: <FiShield size={22} />, color: "from-green-500 to-emerald-600" }
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

      {/* Premium Colleges Grid with Pagination */}
      <section className="py-10 md:py-14">
        <div className="relative mx-auto max-w-7xl px-6">

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-bold text-slate-500">
              Showing {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filteredColleges.length)} of {filteredColleges.length} colleges
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
              <Link key={college.id} to={`/partnered-colleges/${college.id}`} className="block">
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
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Main Card */}
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/70 shadow-lg group-hover:shadow-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1">
                    {/* Background Image (if available, mostly for the specific 3) */}
                    {college.heroImage && college.heroImage !== "partnerclg.png" && (
                      <div
                        className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-cover bg-center"
                        style={{ backgroundImage: `url(${college.heroImage})` }}
                      />
                    )}
                    <div className="relative z-10 p-6 flex flex-col items-center text-center">
                      {/* Logo or Placeholder */}
                      <div className="relative mb-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-rose-400/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-white to-amber-50 shadow-xl border border-amber-100 p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden bg-white">
                          {college.logo ? (
                            <img
                              src={college.logo}
                              alt={college.short}
                              className="w-full h-full object-contain scale-[1.15]"
                            />
                          ) : (
                            <FiAward className="w-14 h-14 text-amber-600" />
                          )}
                        </div>
                      </div>

                      {/* Short Name Badge */}
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] mb-3 shadow-sm">
                        {college.short}
                      </span>

                      {/* College Name */}
                      <h3 className="text-base font-bold text-slate-800 leading-snug group-hover:text-amber-700 transition-colors duration-300 mb-3">
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
              className="flex items-center justify-center gap-2 mt-12"
            >
              {/* Previous */}
              <button
                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${currentPage === 1
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-600 shadow-md border border-slate-200 hover:border-amber-200'
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
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 ${currentPage === page
                      ? 'bg-gradient-to-br from-amber-600 to-rose-600 text-white shadow-lg shadow-amber-500/30 scale-110'
                      : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-600 shadow-md border border-slate-200 hover:border-amber-200'
                      }`}
                  >
                    {page}
                  </button>
                )
              ))}

              {/* Next */}
              <button
                onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${currentPage === totalPages
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-600 shadow-md border border-slate-200 hover:border-amber-200'
                  }`}
              >
                <FiChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-rose-600 to-orange-500" />

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
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full mb-8 border border-white/30">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-white/90">EXPANDING NETWORK</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Can't Find Your College?
            </h2>

            <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              We're continuously partnering with more institutions.
              Contact us today and let us help you with your transcript needs.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-4 bg-white text-amber-700 px-10 py-5 rounded-full font-black text-lg shadow-2xl shadow-white/30 hover:shadow-3xl hover:shadow-white/40 transition-all duration-500 hover:scale-105 group"
            >
              Contact Us Now
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnerColleges;
