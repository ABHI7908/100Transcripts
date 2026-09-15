import React from "react";
import { motion } from "framer-motion";
import degreeImage from "../../assets/degree.png";
import marksMemoImage from "../../assets/marksmemo.png";
import moiImage from "../../assets/moi.png";
import pcdImage from "../../assets/pcd.png";
import transcriptImage from "../../assets/transcript.png";
import verificationImage from "../../assets/verification.png";

const serviceImages = {
  "Marks Memorandum": marksMemoImage,
  "MOI Letter": moiImage,
  Transcripts: transcriptImage,
  "Degree Certificate": degreeImage,
  "Verifications (for Organizations)": verificationImage,
  Verifications: verificationImage,
  "Pharmacy Council Documents": pcdImage,
};

const CollegeServices = ({
  services = [],
  badge = "Our Services",
  title = "Comprehensive Document Services",
  description = "Exclusive services for Bhaskar Pharmacy College students for credential evaluations, university submissions, and official verification needs.",
}) => {
  return (
    <section className="pt-16 md:pt-20 pb-8 md:pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="h-[3px] w-12 bg-blue-600" />
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              {badge}
            </p>
            <span className="h-[3px] w-12 bg-blue-600" />
          </div>

          <h2 className="mt-3 text-3xl font-bold text-[#2f4a6d] md:text-4xl">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            {description}
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="absolute left-0 top-0 h-full w-24 overflow-hidden rounded-r-[48px] bg-gradient-to-b from-blue-50 to-sky-100 ring-1 ring-blue-100">
                <img
                  src={serviceImages[service] || transcriptImage}
                  alt={service}
                  className="h-full w-full object-contain p-3"
                />
              </div>

              <div className="min-h-[150px] pl-28 pr-5 py-5 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-[#233a59]">
                  {service}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Dedicated support for processing and submitting this
                  document requirement efficiently.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeServices;
