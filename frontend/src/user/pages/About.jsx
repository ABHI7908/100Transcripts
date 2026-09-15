import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Award, Users, Shield, ArrowRight, CheckCircle, GraduationCap, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import certificate1 from "../../assets/certificate1.jpg";
import certificate2 from "../../assets/certificate2.jpg";
import certificate3 from "../../assets/certificate3.jpg";
import clgImg from "../../assets/Clg-IMG.jpg";
import ieeImg from "../../assets/IEE-IMG.jpg";
import indiaMap from "../../assets/INDIA-MAp.jpg";
import isoImg from "../../assets/ISO.jpg";
import starImg from "../../assets/Star-IMG.jpg";
import startupImg from "../../assets/Startup-IMG.jpg";
import about7 from "../../assets/about7.png";
import about6 from "../../assets/about6.png";

const Counter = ({ from = 0, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

      setCount(Math.floor(from + (to - from) * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animateCount);
      }
    };

    animationFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{count}{suffix}</span>;
};

const PRIMARY = "#3B5575";

export default function About() {
  const navigate = useNavigate();

  const stats = [
    { label: "Institutions Covered", value: 289, sub: "Universities across India", icon: Building2 },
    { label: "MOI Certifications", value: 3200, sub: "Successfully processed", icon: Award },
    { label: "Total Applicants", value: 18000, sub: "Students served globally", icon: Users },
  ];

  const networkImages = [clgImg, ieeImg, indiaMap, isoImg, starImg, startupImg];

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-blue-500/30">

      {/* HERO SECTION */}
      <section className="relative pt-[110px] pb-20 lg:pb-28 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 text-center lg:text-left"
          >
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-full px-4 py-1.5 shadow-sm"
            >
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-800 tracking-wider uppercase">ISO Certified Partner</span>
            </motion.div> */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">100 Transcripts</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium space-y-4"
            >
              <p>
                100 Transcripts LLP is a specialized ISO-certified firm founded in 2016 in Hyderabad, India, committed to excellence and putting in relentless effort to secure educational documents and transcripts from all over India.
              </p>
              <p>
                Our firm provides expert assistance to students and alumni seeking credential verification and transcripts for IEE (Official Partner), ECE (Official Partner), WES Canada, SpanTran (Official Partner), ICES, IQAS, CES, NASBA, PEBC, UK-NARIC/ECCTIS, Re Vera, catering to those unable to visit universities in person due to personal or professional obligations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/apply")}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3.5 rounded-full font-bold shadow-xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", damping: 20 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 rounded-2xl blur-2xl" />
            <motion.img
              src={about7}
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative rounded-2xl shadow-2xl w-full border border-white/10 object-cover"
              alt="About 100 Transcripts"
            />
          </motion.div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", damping: 20 }}
            className="order-2 lg:order-1 relative group max-w-[85%] mx-auto lg:ml-0"
          >
            <div className="absolute -inset-4 bg-slate-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <div className="overflow-hidden rounded-2xl shadow-xl border border-slate-200">
              <motion.img
                src={about6}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="w-full group-hover:scale-110 transition-transform duration-700 object-cover"
                alt="Our Mission"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div>
              <h2 className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-blue-100 shadow-sm">Our Mission</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Bridging the Gap in Global Education</h3>
            </div>

            <p className="text-slate-600 text-base leading-relaxed font-medium">
              We simplify the complex process of obtaining academic certificates and transcripts, helping students and professionals worldwide save time, reduce stress, and focus on their goals.
            </p>
            <p className="text-slate-600 text-base leading-relaxed font-medium">
              With a dedicated presence across 28 regions in India, we've helped over 18,000 applicants achieve their global education aspirations through secure, reliable, and efficient document processing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="pb-12 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6, type: "spring", damping: 20 }}
              className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40 text-center space-y-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 group relative overflow-hidden"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-8 -mt-8 group-hover:bg-blue-500/20 transition-colors duration-500"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto text-blue-600 border border-slate-100 shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-500"
              >
                <stat.icon className="w-5 h-5" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight relative z-10 mt-3">
                <Counter from={0} to={stat.value} duration={2} suffix="+" />
              </h2>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-700 relative z-10">{stat.label}</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium relative z-10">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RECOGNITIONS */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-blue-100 shadow-sm">Verified Trust</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Our Recognitions & Certifications</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { img: certificate1, title: "StartupIndia Recognition" },
              { img: certificate2, title: "ISO Certification" },
              { img: certificate3, title: "LLP Registration" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring", damping: 20 }}
                className="bg-white p-5 rounded-2xl shadow-lg shadow-slate-200/40 border border-slate-100 group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 relative">
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300 z-10" />
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-center text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORK SCROLL */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-blue-100 shadow-sm">Global Reach</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Our Network & Presence</h3>
          </motion.div>
        </div>

        <div className="relative">
          <div className="flex gap-6 animate-scroll whitespace-nowrap">
            {[...networkImages, ...networkImages].map((img, idx) => (
              <div key={idx} className="min-w-[280px] bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex items-center justify-center">
                <img src={img} alt="Network" className="w-full h-32 object-contain transition-transform duration-300 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <motion.div
          className="rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-600 shadow-2xl border border-blue-400/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, type: "spring", damping: 20 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-white/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative z-10 text-white tracking-tight"
          >
            Ready to Start Your Global Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-blue-50 text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium relative z-10 leading-relaxed"
          >
            Let 100 Transcripts LLP simplify your documentation process with certified transcripts and credential evaluations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative z-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/apply")}
              className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold shadow-xl shadow-black/10 hover:shadow-black/20 transition-all flex items-center gap-2 mx-auto group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 text-blue-700 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}