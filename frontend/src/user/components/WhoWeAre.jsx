import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Globe2, GraduationCap, ShieldCheck } from "lucide-react";
import gpImg from "../../assets/gp.png";
import evImg from "../../assets/ev.png";
import csImg from "../../assets/cs.png";

const features = [
  {
    title: "Global Partnerships",
    description: "Official partner support for IEE, ECE, and SpanTran applications",
    icon: Globe2,
    gradient: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
    image: gpImg,
  },
  {
    title: "Expert Guidance",
    description: "Guidance for WES, IQAS, CES, and UK ENIC document processing",
    icon: GraduationCap,
    gradient: "from-indigo-50 to-indigo-100",
    iconColor: "text-indigo-600",
    image: evImg,
  },
  {
    title: "Certified Excellence",
    description: "ISO-certified service workflow with pan-India university coverage",
    icon: ShieldCheck,
    gradient: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
    image: csImg,
  },
];

const Counter = ({ from = 0, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from.toLocaleString("en-US"));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

      setCount(Math.floor(from + (to - from) * easeOut).toLocaleString("en-US"));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animateCount);
      }
    };

    animationFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const WhoWeAre = () => {
  return (
    <section className="w-full bg-white pt-2 pb-10 sm:pt-4 sm:pb-14 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-3 py-1.5 mb-3 text-xs font-bold tracking-wider text-blue-600 bg-blue-50 rounded-full border-2 border-blue-200"
          >
            WHO WE ARE
          </motion.span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 mb-2 leading-tight tracking-tight">
            Your Trusted Partner for
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Global Education
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
            At <span className="font-bold text-blue-600">100 Transcripts LLP</span>, we've helped over
            <span className="font-extrabold text-blue-600"> <Counter from={0} to={17000} duration={2} suffix="+" /> students</span> achieve their dreams with
            fast, reliable, and secure transcript services across India.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group h-[220px]"
              >
                <div className="relative h-full w-full bg-white group-hover:bg-[#f0f7ff] rounded-[24px] border border-slate-100 group-hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">

                  {/* Background Image Layer */}
                  <div className="absolute inset-0 w-full h-full bg-slate-50 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center p-2">
                    {feature.image ? (
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-contain scale-[1.3] group-hover:scale-[1.45] transition-transform duration-700"
                      />
                    ) : (
                      <div className={`w-full h-full opacity-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl`} />
                    )}
                  </div>

                  {/* Glass/Gradient Overlay only at the bottom to ensure text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-white via-white/95 to-transparent group-hover:from-[#f0f7ff] group-hover:via-[#f0f7ff]/95 transition-colors duration-500 pointer-events-none" />

                  {/* Animated Text Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                    <div className="transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className={`w-12 h-12 mb-4 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 mb-2 transition-colors duration-300">{feature.title}</h3>
                      <div className="h-[60px] overflow-hidden">
                        <p className="text-sm text-slate-600 group-hover:text-blue-800 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { num: 17, suffix: "K+", label: "Happy Students" },
            { num: 500, suffix: "+", label: "Universities" },
            { num: 99, suffix: "%", label: "Success Rate" },
            { stringVal: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-md"
            >
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                {stat.num !== undefined ? (
                  <Counter from={0} to={stat.num} duration={2} suffix={stat.suffix} />
                ) : (
                  stat.stringVal
                )}
              </div>
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Location Section with Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* gap-12 adds more space between the Map and the Text */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Side - Map Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100"
            >
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Visit Our Office</h3>
                    <p className="text-blue-100 text-sm">Hyderabad, Telangana, India</p>
                  </div>
                  <div className="hidden sm:flex w-12 h-12 bg-white/20 rounded-full items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="overflow-hidden rounded-2xl border border-gray-200 mb-6">
                  <iframe
                    title="100 Transcripts LLP Location"
                    src="https://maps.google.com/maps?q=100%20Transcripts%20LLP%20Hyderabad&output=embed"
                    className="h-[250px] w-full border-0"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-gray-600 text-sm text-center sm:text-left">
                    100 Transcripts LLP, 3rd Floor, Sri Srinivasam, Plot No. 1133/1, Mathrusree Nagar, Hafeezpet
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.google.com/maps/place/100+Transcripts+LLP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Get Directions
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Info (Middle Aligned with Extra Space) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col justify-center space-y-5 lg:pl-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Simplifying Academic Credentials for a{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Global Future
                  </span>
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Founded with the vision to streamline transcript procurement, 100 Transcripts LLP bridges students and institutions worldwide with secure, efficient document delivery—leveraging <span className="font-bold text-blue-600">15+ years of experience</span> in academic documentation and international credential evaluations.
                </p>
              </div>

              <div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Learn More About Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;