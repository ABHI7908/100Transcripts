import React from "react";
import { Clock, ShieldCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

import FastProcessing from "../../assets/Fast.png";
import Secure from "../../assets/Security.png";
import Research from "../../assets/services.png";

const features = [
  {
    image: FastProcessing,
    title: "Fast Processing",
    desc: "Quick and efficient transcript handling to save your valuable time.",
  },
  {
    image: Secure,
    title: "Secure & Reliable",
    desc: "Your documents are handled with complete safety and confidentiality.",
  },
  {
    image: Research,
    title: "Worldwide Reach",
    desc: "Serving students and professionals across the globe seamlessly.",
  },
];

const WhyChoose = () => {
  return (
    <section className="w-full pt-8 pb-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">

        {/* 🔥 PREMIUM HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex flex-col items-center justify-center mb-4">
            <span className="inline-block px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-blue-600 bg-blue-50 rounded-full border-2 border-blue-200 uppercase">
              Why Choose Us
            </span>
          </div>



          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base">
            With years of experience and a strong pan-India network, we make
            transcript processing simple, fast, and reliable for everyone.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* ICON */}
              {/* IMAGE */}
              <div className="w-full h-32 sm:h-44 flex items-center justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* TITLE */}
              <h3 className="mt-2 text-base sm:text-lg font-semibold text-[#2f4a6d]">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChoose;