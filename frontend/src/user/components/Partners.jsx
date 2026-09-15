import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import eceLogo from "../../assets/ECE_Logo_Color.png";
import ieeLogo from "../../assets/IEE logo OG.png";
import tecLogo from "../../assets/tec_logo.png";
import aziceLogo from "../../assets/AZICE-logo.png";
import wesLogo from "../../assets/WES_logo.png";

const partners = [
  {
    name: "IEE Evaluation",
    logo: ieeLogo,
    link: "/services/iee",
  },

  {
    name: "ECE Evaluation",
    logo: eceLogo,
    link: "/services/ece",
  },

  {
    name: "Arizona Evaluators",
    logo: aziceLogo,
    link: "https://alianzaeval.com/",
  },

  {
    name: "WES Evaluation",
    logo: wesLogo,
    link: "/services/wes",
  },

  {
    name: "SpanTran (TEC)",
    logo: tecLogo,
    link: "/services/spantran",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Partners = () => {
  return (
    <section className="w-full pt-4 pb-16 sm:pt-8 sm:pb-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="w-full mx-auto px-6 relative z-10 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 mb-4 text-sm font-bold tracking-wider text-blue-600 bg-blue-50 rounded-full border-2 border-blue-200"
          >
            OUR PARTNERS
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4 leading-tight tracking-tight">
            Credential Associates We{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Serve
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            We collaborate with globally recognized evaluation bodies to ensure
            fast, reliable, and trusted transcript services.
          </p>
        </motion.div>

        {/* Partners Infinite Scroll */}
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max animate-scroll gap-6 py-4 px-4 hover:animation-paused">
            <style>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-50% - 12px)); }
              }
              .animate-scroll {
                animation: scroll 30s linear infinite;
              }
              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
            {[...partners, ...partners].map((partner, index) => (
              <a
                key={index}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none w-[320px] sm:w-[380px] group flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Official Partner</p>
                </div>
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full group-hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
