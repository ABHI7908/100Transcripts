import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
 
import uploadLogo from "../../assets/upload_logo.png";
import reviewLogo from "../../assets/review_logo.png";
import processingLogo from "../../assets/processing_logo.png";
import deliveryLogo from "../../assets/delivery_logo.png";
 
// ✅ RIGHT SIDE BIG IMAGES
import uploadImg from "../../assets/uploadimg.png";
import reviewImg from "../../assets/reviewimg.png";
import processImg from "../../assets/processingimg.jpg";
import deliveryImg from "../../assets/deliveryimg.png";
 
const steps = [
  {
    title: "Upload Documents",
    text: "Students can easily upload mark memos, transcripts, and certificates securely through our platform.",
    image: uploadLogo,
    rightImage: uploadImg,
  },
  {
    title: "Review & Verification",
    text: "Our expert team carefully reviews all documents to ensure accuracy and authenticity.",
    image: reviewLogo,
    rightImage: reviewImg,
  },
  {
    title: "Processing",
    text: "We coordinate with universities and authorities to process your documents efficiently.",
    image: processingLogo,
    rightImage: processImg,
  },
  {
    title: "Delivery",
    text: "Final verified documents are delivered safely to your doorstep or digitally.",
    image: deliveryLogo,
    rightImage: deliveryImg,
  },
];
 
const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef(null);
useEffect(() => {
  startAuto();
 
  return () => clearInterval(intervalRef.current);
}, []);
 
const startAuto = () => {
  clearInterval(intervalRef.current); // prevent duplicates
 
  intervalRef.current = setInterval(() => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  }, 4000);
};
 
const stopAuto = () => {
  clearInterval(intervalRef.current);
};
 
  return (
    <section className="py-12 md:py-14 bg-gradient-to-br from-white via-blue-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6">
 
        <motion.div
  initial={{ opacity: 0, y: 35 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="mb-16 text-center"
>
  <div className="flex items-center justify-center gap-4">
    <span className="h-[3px] w-12 bg-blue-600" />
    <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
      How It Works
    </p>
    <span className="h-[3px] w-12 bg-blue-600" />
  </div>
 
  <h2 className="mt-3 text-3xl font-bold text-[#2f4a6d] md:text-4xl">
    Simple Process for Document Services
  </h2>
 
  <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
    Follow a smooth and guided process to complete your document requests without hassle.
    Our team ensures quick processing, verification, and safe delivery at every step.
  </p>
</motion.div>
 
        <div className="grid lg:grid-cols-2 gap-16 items-center">
 
          {/* LEFT SIDE */}
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 -ml-10">
 
            <svg
              className="hidden lg:block absolute top-1/2 left-0 w-full h-20 -translate-y-1/2"
              viewBox="0 0 1000 100"
              fill="none"
            >
              <path
                d="M0,50 Q250,0 500,50 T1000,50"
                stroke="#d1d5db"
                strokeWidth="4"
                fill="none"
              />
            </svg>
 
            {steps.map((step, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => {
  stopAuto();
  setActiveStep(index);
}}
onMouseLeave={() => startAuto()}
                whileHover={{ scale: 1.1 }}
                animate={{
  y: activeStep === index ? -12 : 0,
  scale: activeStep === index ? 1.08 : 1,
}}
transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10 w-full lg:w-44"
              >
                <div
                  className={`p-6 rounded-2xl border text-center transition-all duration-300 ${
                    activeStep === index
                      ? "bg-blue-100 border-blue-400 shadow-xl"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <motion.div
                    animate={{
                      scale: activeStep === index ? 1.2 : 1,
                    }}
                    className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center"
                  >
                    <img src={step.image} className="w-10 h-10" />
                  </motion.div>
 
                  <div className="text-blue-600 font-bold">
                    {index + 1}
                  </div>
 
                  <h4 className="text-sm font-semibold">
                    {step.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
 
          {/* RIGHT SIDE */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border">
 
            <AnimatePresence mode="wait">
              <motion.div
  key={activeStep}
  initial="hidden"
  animate="visible"
  exit="hidden"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // 🔥 delay between elements
      },
    },
  }}
  className="text-center"
>
 
  {/* IMAGE FIRST */}
  <motion.img
    src={steps[activeStep].rightImage}
    variants={{
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    }}
    transition={{ duration: 0.5 }}
    className="w-full h-64 object-contain mb-5"
    // className="w-full h-64 object-cover rounded-xl mb-6"
  />
 
  {/* TITLE SECOND */}
  <motion.h3
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5 }}
    className="text-2xl font-bold mb-3 text-gray-900"
  >
    {steps[activeStep].title}
  </motion.h3>
 
  {/* TEXT LAST */}
  <motion.p
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5 }}
    className="text-gray-600 max-w-md mx-auto"
  >
    {steps[activeStep].text}
  </motion.p>
 
</motion.div>
            </AnimatePresence>
 
          </div>
 
        </div>
      </div>
    </section>
  );
};
 
export default HowItWorks;