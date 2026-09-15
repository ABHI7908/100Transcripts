import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import WhoWeAre from "../components/WhoWeAre";
import LoadingSpinner from "../../components/LoadingSpinner";

const WhyChoose = lazy(() => import("../components/WhyChoose"));
const UniversitySearch = lazy(() => import("../components/UniversitySearch"));
const Partners = lazy(() => import("../components/Partners"));
const Reviews = lazy(() => import("../components/Reviews"));
const FAQ = lazy(() => import("../components/FAQ"));

import { FaWhatsapp } from "react-icons/fa";

const SectionFallback = () => (
  <div className="w-full py-20 flex justify-center items-center bg-white">
    <LoadingSpinner size="md" color="blue" />
  </div>
);

const Home = () => {
  return (
    <>
      <HeroSection />

      <WhoWeAre />

      <Suspense fallback={<SectionFallback />}>
        <WhyChoose />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <UniversitySearch />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Partners />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Reviews />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FAQ />
      </Suspense>



      <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end pointer-events-none">
        {/* FLOATING HELP BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative z-0 -mb-2 mr-2 bg-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 flex items-center gap-2 pointer-events-auto"
        >
          <span className="text-black font-bold text-[15px] whitespace-nowrap">Need help?</span>
          <span className="text-xl">👋</span>
        </motion.div>

        {/* FLOATING WHATSAPP */}
        <a
          href="https://api.whatsapp.com/send/?phone=%2B919941991402&text=Hi&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="group pointer-events-auto block relative z-10"
        >
          <div className="relative flex items-center justify-center">
            {/* PULSE */}
            <span className="absolute inline-flex h-[60px] w-[60px] rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
            {/* BUTTON */}
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)]">
              <FaWhatsapp size={32} />
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Home;