import React, { useState } from "react";
import { Link } from "react-router-dom";

import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";
import RefundCancellation from "./RefundCancellation";

import logo from "../../assets/100.png";

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";

import {
  FaWhatsapp,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const serviceLinks = [
  {
    name: "Credential Evaluation",
    submenu: [
      { name: "IEE Evaluation", path: "/services/iee" },
      { name: "ECE Evaluation", path: "/services/ece" },
      { name: "SpanTran (TEC)", path: "/services/spantran" },
      { name: "WES Evaluation", path: "/services/wes" },
    ],
  },
  {
    name: "Certifications",
    submenu: [
      { name: "Transcripts", path: "/services/transcripts" },
      { name: "Provisional Certificate", path: "/services/pc" },
      { name: "Original Degree", path: "/services/od" },
      { name: "MOI Letter", path: "/services/moi" },
      { name: "CMM", path: "/services/cmm" },
    ],
  },
];

const companyLinks = [
  { name: "Careers", path: "#" },
  { name: "Contact Us", path: "/contact" },
  { name: "Become a partner", path: "#" },
  { name: "Discussions", path: "#" },
  { name: "Terms & Conditions", path: "/terms" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Refund & Cancellation", path: "/refund-cancellation" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/100Transcripts/",
    icon: <FaFacebookF />,
    bg: "hover:bg-blue-600",
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@100transcriptsllp",
    icon: <FaYoutube />,
    bg: "hover:bg-red-500",
  },
  {
    name: "Whatsapp",
    href: "https://api.whatsapp.com/send/?phone=%2B919941991402&text=Hi&type=phone_number&app_absent=0",
    icon: <FaWhatsapp />,
    bg: "hover:bg-green-500",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/company/100-transcripts-llp/",
    icon: <FaLinkedinIn />,
    bg: "hover:bg-cyan-600",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [openPolicy, setOpenPolicy] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <footer className="bg-[#0A1424] text-white border-t border-white/10 overflow-hidden">

      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-6">

        {/* TOP GRID */}
        <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">

          {/* BRAND */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-4">

                <div>
                  <h2 className="text-xl font-bold">
                    <span className="text-white">1</span>
                    <span className="text-red-500">0</span>
                    <span className="text-green-500">0</span>
                    <span className="text-white ml-2">Transcripts</span>
                  </h2>
                </div>

              </div>
            </div>

            <p className="mt-4 md:-mt-5 max-w-sm text-sm leading-7 text-slate-300">
              Delivers fast, secure Indian university educational documents
              for global evaluations with trusted student support.
            </p>

            {/* SOCIAL */}
            <div className="mt-8 w-full">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Follow Us
              </h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-slate-300 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:text-white ${item.bg}`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>

              {/* VISITORS */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-white">Visitors</h4>
                <p className="mt-1 text-sm text-slate-300">423,218 Visitors</p>
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div className="text-center md:text-left mt-8 md:mt-0">
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Services
            </h4>
            <ul className="space-y-8 text-sm text-slate-300">
              {serviceLinks.map((section) => (
                <li key={section.name}>
                  <h5 className="mb-3 font-bold text-white/90 underline decoration-cyan-500/50 underline-offset-4">
                    {section.name}
                  </h5>
                  <ul className="space-y-3">
                    {section.submenu.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.path}
                          className="transition duration-300 hover:text-cyan-400 flex items-center justify-center md:justify-start gap-2"
                        >
                          <span className="h-1 w-1 rounded-full bg-slate-500 hidden md:block"></span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="text-center md:text-left mt-8 md:mt-0">
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-slate-300">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  {link.name === "Terms & Conditions" ? (
                    <button
                      onClick={() => setOpenTerms(true)}
                      className="transition duration-300 hover:text-cyan-400"
                    >
                      {link.name}
                    </button>
                  ) : link.name === "Privacy Policy" ? (
                    <button
                      onClick={() => setOpenPolicy(true)}
                      className="transition duration-300 hover:text-cyan-400"
                    >
                      {link.name}
                    </button>
                  ) : link.name === "Refund & Cancellation" ? (
                    <button
                      onClick={() => setOpenRefund(true)}
                      className="transition duration-300 hover:text-cyan-400"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className="transition duration-300 hover:text-cyan-400"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="mt-8 md:mt-0">
            <h4 className="mb-6 text-center md:text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Contact Us
            </h4>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
              <div className="border-b border-white/10 p-5">
                <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 shrink-0">
                    <FiMapPin className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      100 Transcripts LLP
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-300">
                      3rd Floor, Sri Srinivasam, Plot No. 1133/1, Mathrusree Nagar, Hafeezpet, Hyderabad, Telangana 500049, India
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-center md:items-start gap-4 text-xs text-slate-300">
                  <a
                    href="tel:+919941991402"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <FiPhone className="text-cyan-400" />
                    <span>+91 994 199 1402</span>
                  </a>
                  <a
                    href="mailto:support@100Transcripts.com"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <FiMail className="text-cyan-400" />
                    <span>support@100Transcripts.com</span>
                  </a>
                </div>
              </div>

              {/* MAP */}
              <div className="p-2">

                <div className="overflow-hidden rounded-xl">
                  <iframe
                    title="100 Transcripts Location"
                    src="https://maps.google.com/maps?q=100%20Transcripts%20LLP%20Hyderabad&output=embed"
                    className="h-32 w-full border-0"
                    loading="lazy"
                  />
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=100+Transcripts+LLP+Plot+No+801+Mathrusree+Nagar+Hyderabad+500049"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 transition hover:text-white"
                >
                  Open in Google Maps
                  <FiArrowUpRight />
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-4 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-center sm:text-left">
            © {currentYear} 100 Transcripts LLP. All rights reserved.
          </p>


        </div>
      </div>

      {/* MODALS */}
      <PrivacyPolicy
        open={openPolicy}
        onClose={() => setOpenPolicy(false)}
      />

      <RefundCancellation
        open={openRefund}
        onClose={() => setOpenRefund(false)}
      />

      <TermsConditions
        open={openTerms}
        onClose={() => setOpenTerms(false)}
      />

    </footer >
  );
};

export default Footer;