const logoFiles = import.meta.glob("../../assets/colleges/logos/*", {
  eager: true,
  import: "default",
});

const logoMap = Object.fromEntries(
  Object.entries(logoFiles).map(([path, logo]) => [
    path.split("/").pop().toLowerCase(),
    logo,
  ])
);

const getLogo = (filename) => {
  return logoMap[filename.toLowerCase()] || "https://via.placeholder.com/150";
};

const collegesData = {
  "university-of-hyderabad": {
    short: "UoH",
    logo: getLogo("1. University of Hyderabad (Hyderabad Central University).png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for University of Hyderabad Students",
    description:
      "University of Hyderabad students can now apply for transcript and evaluation services online.",
    stats: [
      { value: "12,000+", label: "Students Served" },
      { value: "60+", label: "Partner Universities" },
      { value: "98%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
      "Verifications",
    ],
  },

  "maulana-azad-national-urdu-university": {
    short: "MANUU",
    logo: getLogo("2. Maulana Azad National Urdu University.jpg"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for MANUU Students",
    description:
      "Maulana Azad National Urdu University students can now apply for transcript services online.",
    stats: [
      { value: "12,000+", label: "Students Served" },
      { value: "45+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "english-and-foreign-languages-university": {
    short: "EFLU",
    logo: getLogo("3. English and Foreign Languages University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for EFLU Students",
    description:
      "English and Foreign Languages University students can now apply for transcript services online.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "30+", label: "Partner Universities" },
      { value: "93%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "osmania-university": {
    short: "OU",
    logo: getLogo("4. Osmania University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for OU Students",
    description:
      "Osmania University students can now apply for their academic documents without visiting the campus.",
    stats: [
      { value: "20,000+", label: "Students Served" },
      { value: "80+", label: "Partner Universities" },
      { value: "97%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "kakatiya-university": {
    short: "KU",
    logo: getLogo("5. Kakatiya University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for KU Students",
    description:
      "Kakatiya University students can now apply for their academic documents without visiting the campus.",
    stats: [
      { value: "9,000+", label: "Students Served" },
      { value: "40+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "jntu-hyderabad": {
    short: "JNTUH",
    logo: getLogo("6. Jawaharlal Nehru Technological University Hyderabad.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for JNTUH Students",
    description:
      "Jawaharlal Nehru Technological University Hyderabad students can now apply for transcript and document services online.",
    stats: [
      { value: "25,000+", label: "Students Served" },
      { value: "100+", label: "Partner Universities" },
      { value: "99%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
      // "Provisional Certificate",
    ],
  },

  "dr-b-r-ambedkar-open-university": {
    short: "BRAOU",
    logo: getLogo("7. Dr. B. R. Ambedkar Open University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for BRAOU Students",
    description:
      "Dr. B.R. Ambedkar Open University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "9,000+", label: "Students Served" },
      { value: "38+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "potti-sreeramulu-telugu-university": {
    short: "PSTU",
    logo: getLogo("8. Potti Sreeramulu Telugu University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for PSTU Students",
    description:
      "Potti Sreeramulu Telugu University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "8,000+", label: "Students Served" },
      { value: "35+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "professor-jayashankar-telangana-state-agricultural-university": {
    short: "PJTSAU",
    logo: getLogo("9. Professor Jayashankar Telangana State Agricultural University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for PJTSAU Students",
    description:
      "Professor Jayashankar Telangana State Agricultural University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "8,000+", label: "Students Served" },
      { value: "35+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "satavahana-university": {
    short: "SU",
    logo: getLogo("10. Satavahana University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for SU Students",
    description:
      "Satavahana University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "7,000+", label: "Students Served" },
      { value: "34+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "palamuru-university": {
    short: "PU",
    logo: getLogo("11. Palamuru University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for Palamuru University Students",
    description:
      "Palamuru University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "5,000+", label: "Students Served" },
      { value: "26+", label: "Partner Universities" },
      { value: "92%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "telangana-university": {
    short: "TU",
    logo: getLogo("12. Telangana University.jpg"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for Telangana University Students",
    description:
      "Telangana University students can now apply for transcript services online.",
    stats: [
      { value: "7,000+", label: "Students Served" },
      { value: "32+", label: "Partner Universities" },
      { value: "93%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "mahatma-gandhi-university-telangana": {
    short: "MGUT",
    logo: getLogo("13. Mahatma Gandhi University Telangana.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for MGUT Students",
    description:
      "Mahatma Gandhi University Telangana students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "8,000+", label: "Students Served" },
      { value: "36+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "icfai-foundation-for-higher-education": {
    short: "ICFAI",
    logo: getLogo("14. ICFAI Foundation for Higher Education.svg"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for ICFAI Students",
    description:
      "ICFAI Foundation for Higher Education students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "12,000+", label: "Students Served" },
      { value: "45+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "bits-pilani-hyderabad": {
    short: "BITS-H",
    logo: getLogo("15. BITS Pilani Hyderabad Campus.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for BITS-H Students",
    description:
      "BITS Pilani Hyderabad students can now apply for transcript services online.",
    stats: [
      { value: "12,000+", label: "Students Served" },
      { value: "60+", label: "Partner Universities" },
      { value: "99%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "anurag-university": {
    short: "ANURAG",
    logo: getLogo("16. Anurag University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for ANURAG Students",
    description:
      "Anurag University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "10,000+", label: "Students Served" },
      { value: "48+", label: "Partner Universities" },
      { value: "96%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Verifications",
    ],
  },

  "malla-reddy-university": {
    short: "MRU",
    logo: getLogo("17. Malla Reddy University.avif"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for Malla Reddy University Students",
    description:
      "Malla Reddy University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "8,000+", label: "Students Served" },
      { value: "35+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "central-university-andhra-pradesh": {
    short: "CUAP",
    logo: getLogo("1. Central University of Andhra Pradesh.webp"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for CUAP Students",
    description:
      "Central University of Andhra Pradesh students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "5,000+", label: "Students Served" },
      { value: "30+", label: "Partner Universities" },
      { value: "92%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "iit-tirupati": {
    short: "IIT-T",
    logo: getLogo("2. Indian Institute of Technology Tirupati.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for IIT-T Students",
    description:
      "IIT Tirupati students can now apply for transcript services online.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "35+", label: "Partner Universities" },
      { value: "97%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "indian-institute-of-management-visakhapatnam": {
    short: "IIM-V",
    logo: getLogo("3. Indian Institute of Management Visakhapatnam.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for IIM-V Students",
    description:
      "Indian Institute of Management Visakhapatnam students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "5,000+", label: "Students Served" },
      { value: "40+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "andhra-university": {
    short: "AU",
    logo: getLogo("4. Andhra University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for AU Students",
    description:
      "Andhra University students can now apply for their documents without visiting the college.",
    stats: [
      { value: "15,000+", label: "Students Served" },
      { value: "70+", label: "Partner Universities" },
      { value: "96%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "acharya-nagarjuna-university": {
    short: "ANU",
    logo: getLogo("5. Acharya Nagarjuna University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for ANU Students",
    description:
      "Acharya Nagarjuna University students can now apply for their academic documents without visiting the campus.",
    stats: [
      { value: "13,000+", label: "Students Served" },
      { value: "45+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "sri-venkateswara-university": {
    short: "SVU",
    logo: getLogo("6. Sri Venkateswara University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for SVU Students",
    description:
      "Sri Venkateswara University students can now apply for transcript services online.",
    stats: [
      { value: "11,000+", label: "Students Served" },
      { value: "50+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "sri-krishnadevaraya-university": {
    short: "SKU",
    logo: getLogo("7. Sri Krishnadevaraya University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for SKU Students",
    description:
      "Sri Krishnadevaraya University students can now apply for transcript services online.",
    stats: [
      { value: "7,000+", label: "Students Served" },
      { value: "35+", label: "Partner Universities" },
      { value: "93%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "dr-ntr-university-of-health-sciences": {
    short: "NTRUHS",
    logo: getLogo("8. Dr. NTR University of Health Sciences.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for NTRUHS Students",
    description:
      "Dr. NTR University of Health Sciences students can now apply for transcript services online.",
    stats: [
      { value: "12,000+", label: "Students Served" },
      { value: "40+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "adikavi-nannaya-university": {
    short: "ANU",
    logo: getLogo("9. Adikavi Nannaya University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for Adikavi Nannaya University Students",
    description:
      "Adikavi Nannaya University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "7,000+", label: "Students Served" },
      { value: "32+", label: "Partner Universities" },
      { value: "93%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "yogi-vemana-university": {
    short: "YVU",
    logo: getLogo("Yogi Vemana University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for YVU Students",
    description:
      "Yogi Vemana University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "30+", label: "Partner Universities" },
      { value: "92%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "krishna-university": {
    short: "KU",
    logo: getLogo("11. Krishna University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for Krishna University Students",
    description:
      "Krishna University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "5,500+", label: "Students Served" },
      { value: "28+", label: "Partner Universities" },
      { value: "91%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "rayalaseema-university": {
    short: "RU",
    logo: getLogo("12. Rayalaseema University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for RU Students",
    description:
      "Rayalaseema University students can now apply for transcript and document services online.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "30+", label: "Partner Universities" },
      { value: "92%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "vikram-simhapuri-university": {
    short: "VSU",
    logo: getLogo("13. Vikram Simhapuri University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for VSU Students",
    description:
      "Vikram Simhapuri University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "30+", label: "Partner Universities" },
      { value: "92%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "dravidian-university": {
    short: "DU",
    logo: getLogo("14. Dravidian University.svg"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for Dravidian University Students",
    description:
      "Dravidian University students can now apply for transcript services online.",
    stats: [
      { value: "5,000+", label: "Students Served" },
      { value: "28+", label: "Partner Universities" },
      { value: "91%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "acharya-ng-ranga-agricultural-university": {
    short: "ANGRAU",
    logo: getLogo("15. Acharya N.G. Ranga Agricultural University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for ANGRAU Students",
    description:
      "Acharya N.G. Ranga Agricultural University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "10,000+", label: "Students Served" },
      { value: "40+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "sri-venkateswara-veterinary-university": {
    short: "SVVU",
    logo: getLogo("16. Sri Venkateswara Veterinary University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for SVVU Students",
    description:
      "Sri Venkateswara Veterinary University students can now apply for transcript services online.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "30+", label: "Partner Universities" },
      { value: "92%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "andhra-pradesh-fisheries-university": {
    short: "APFU",
    logo: getLogo("17. Andhra Pradesh Fisheries University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for APFU Students",
    description:
      "Andhra Pradesh Fisheries University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "4,000+", label: "Students Served" },
      { value: "25+", label: "Partner Universities" },
      { value: "90%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "andhra-kesari-university": {
    short: "AKU",
    logo: getLogo("18. Andhra Kesari University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for AKU Students",
    description:
      "Andhra Kesari University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "5,000+", label: "Students Served" },
      { value: "28+", label: "Partner Universities" },
      { value: "91%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "gitam-university": {
    short: "GITAM",
    logo: getLogo("19. GITAM University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for GITAM Students",
    description:
      "GITAM University students can now apply for transcript and evaluation services online.",
    stats: [
      { value: "16,000+", label: "Students Served" },
      { value: "65+", label: "Partner Universities" },
      { value: "97%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
      "Provisional Certificate",
    ],
  },

  "kl-university": {
    short: "KLU",
    logo: getLogo("20. KL Deemed to be University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for KLU Students",
    description:
      "KL University students can now apply for their academic documents without visiting the campus.",
    stats: [
      { value: "8,000+", label: "Students Served" },
      { value: "40+", label: "Partner Universities" },
      { value: "96%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Verifications",
    ],
  },

  "vignan-university": {
    short: "VIGNAN",
    logo: getLogo("21. Vignan_s Foundation for Science Technology and Research.svg"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for VIGNAN Students",
    description:
      "Vignan University students can now apply for transcript and document services online.",
    stats: [
      { value: "7,000+", label: "Students Served" },
      { value: "35+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "srm-university-ap": {
    short: "SRM AP",
    logo: getLogo("22. SRM University AP.webp"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for SRM AP Students",
    description:
      "SRM University AP students can now apply for transcript services online.",
    stats: [
      { value: "8,000+", label: "Students Served" },
      { value: "40+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "amrita-vishwa-vidyapeetham-amaravati": {
    short: "Amrita Amaravati",
    logo: getLogo("23. Amrita Vishwa Vidyapeetham Amaravati.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for Amrita Amaravati Students",
    description:
      "Amrita Vishwa Vidyapeetham Amaravati students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "7,000+", label: "Students Served" },
      { value: "35+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "centurion-university-of-technology-and-management-ap": {
    short: "CUTM AP",
    logo: getLogo("24. Centurion University of Technology and Management AP.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for CUTM AP Students",
    description:
      "Centurion University of Technology and Management AP students can now apply for transcript services online.",
    stats: [
      { value: "9,000+", label: "Students Served" },
      { value: "38+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "central-university-tamil-nadu": {
    short: "CUTN",
    logo: getLogo("1. Central University of Tamil Nadu.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for CUTN Students",
    description:
      "Central University of Tamil Nadu students can now apply for transcript services online.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "32+", label: "Partner Universities" },
      { value: "93%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "university-of-madras": {
    short: "UoM",
    logo: getLogo("2. University of Madras.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for University of Madras Students",
    description:
      "University of Madras students can now apply for their academic documents without visiting the campus.",
    stats: [
      { value: "20,000+", label: "Students Served" },
      { value: "70+", label: "Partner Universities" },
      { value: "96%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "anna-university": {
    short: "AU",
    logo: getLogo("3. Anna University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for Anna University Students",
    description:
      "Anna University students can now apply for their academic documents without visiting the campus.",
    stats: [
      { value: "22,000+", label: "Students Served" },
      { value: "80+", label: "Partner Universities" },
      { value: "97%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "bharathiar-university": {
    short: "BU",
    logo: getLogo("4. Bharathiar University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for Bharathiar University Students",
    description:
      "Bharathiar University students can now apply for transcript services online.",
    stats: [
      { value: "18,000+", label: "Students Served" },
      { value: "60+", label: "Partner Universities" },
      { value: "96%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "bharathidasan-university": {
    short: "BDU",
    logo: getLogo("5. Bharathidasan University.gif"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for Bharathidasan University Students",
    description:
      "Bharathidasan University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "16,000+", label: "Students Served" },
      { value: "55+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "madurai-kamaraj-university": {
    short: "MKU",
    logo: getLogo("6. Madurai Kamaraj University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for MKU Students",
    description:
      "Madurai Kamaraj University students can now apply for transcript services online.",
    stats: [
      { value: "17,000+", label: "Students Served" },
      { value: "58+", label: "Partner Universities" },
      { value: "96%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "tamil-nadu-agricultural-university": {
    short: "TNAU",
    logo: getLogo("7. Tamil Nadu Agricultural University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for TNAU Students",
    description:
      "Tamil Nadu Agricultural University students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "10,000+", label: "Students Served" },
      { value: "45+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "tamil-university": {
    short: "TU",
    logo: getLogo("8. Tamil University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for Tamil University Students",
    description:
      "Tamil University students can now apply for transcript services online.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "30+", label: "Partner Universities" },
      { value: "93%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "periyar-university": {
    short: "PU",
    logo: getLogo("9. Periyar University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for Periyar University Students",
    description:
      "Periyar University students can now apply for transcript services online.",
    stats: [
      { value: "9,000+", label: "Students Served" },
      { value: "38+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "alagappa-university": {
    short: "AU",
    logo: getLogo("10. Alagappa University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for Alagappa University Students",
    description:
      "Alagappa University students can now apply for transcript services online.",
    stats: [
      { value: "18,000+", label: "Students Served" },
      { value: "50+", label: "Partner Universities" },
      { value: "96%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
    ],
  },

  "mother-teresa-womens-university": {
    short: "MTWU",
    logo: getLogo("11. Mother Teresa Women_s University.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for MTWU Students",
    description:
      "Mother Teresa Women's University students can now apply for transcript services online.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "30+", label: "Partner Universities" },
      { value: "93%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },

  "vit-university": {
    short: "VIT",
    logo: getLogo("12. VIT University.webp"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for VIT Students",
    description:
      "VIT University students can now apply for transcript and evaluation services online.",
    stats: [
      { value: "25,000+", label: "Students Served" },
      { value: "80+", label: "Partner Universities" },
      { value: "98%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
      "Provisional Certificate",
    ],
  },

  "srm-institute-of-science-and-technology": {
    short: "SRM",
    logo: getLogo("13. SRM Institute of Science and Technology.svg"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for SRM Students",
    description:
      "SRM Institute of Science and Technology students can now apply for transcript services online.",
    stats: [
      { value: "20,000+", label: "Students Served" },
      { value: "70+", label: "Partner Universities" },
      { value: "97%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
      "Verifications",
    ],
  },

  "sathyabama-institute-of-science-and-technology": {
    short: "SIST",
    logo: getLogo("14. Sathyabama Institute of Science and Technology.jpg"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for Sathyabama Students",
    description:
      "Sathyabama Institute of Science and Technology students can now apply for transcript services online.",
    stats: [
      { value: "15,000+", label: "Students Served" },
      { value: "50+", label: "Partner Universities" },
      { value: "96%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "amrita-vishwa-vidyapeetham": {
    short: "Amrita",
    logo: getLogo("15. Amrita Vishwa Vidyapeetham.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for Amrita Students",
    description:
      "Amrita Vishwa Vidyapeetham students can now apply for transcript and evaluation services online.",
    stats: [
      { value: "18,000+", label: "Students Served" },
      { value: "60+", label: "Partner Universities" },
      { value: "97%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "MOI Letter",
      "Verifications",
    ],
  },

  "hindustan-institute-of-technology-and-science": {
    short: "HITS",
    logo: getLogo("16. Hindustan Institute of Technology and Science.png"),
    heroImage: "partnerclg.png",
    title: "Exclusive Document Services for HITS Students",
    description:
      "Hindustan Institute of Technology and Science students can now apply for their documents without visiting the campus.",
    stats: [
      { value: "11,000+", label: "Students Served" },
      { value: "45+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "saveetha-institute-of-medical-and-technical-sciences": {
    short: "SIMATS",
    logo: getLogo("17. Saveetha Institute of Medical and Technical Sciences.webp"),
    heroImage: "partnerclg.png",
    title: "Exclusive Transcript Services for SIMATS Students",
    description:
      "Saveetha Institute of Medical and Technical Sciences students can now apply for transcript services online.",
    stats: [
      { value: "10,000+", label: "Students Served" },
      { value: "40+", label: "Partner Universities" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Migration Certificate",
    ],
  },

  "bhaskar-pharmacy-college": {
    short: "BPC",
    logo: getLogo("Bhaskar Pharmacy College.png"),
    heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Bhaskar Pharmacy College",
    description:
      "Bhaskar Pharmacy College students can now apply for transcript and document services online.",
    stats: [
      { value: "5,000+", label: "Students Served" },
      { value: "25+", label: "Partner Universities" },
      { value: "92%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Pharmacy Council Documents",
    ],
  },

  "joginpally-br-pharmacy-college": {
    short: "JBPR",
    logo: getLogo("Joginpally BR Pharmacy College.png"),
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Joginpally B.R Pharmacy College",
    description:
      "Joginpally B.R Pharmacy College students can now apply for transcript and document services online.",
    stats: [
      { value: "6,000+", label: "Students Served" },
      { value: "30+", label: "Partner Universities" },
      { value: "93%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Pharmacy Council Documents",
    ],
  },

  "siddhartha-institute-of-technology-sciences": {
    short: "SITS",
    logo: getLogo("Siddhartha Institute.png"),
    heroImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Siddhartha Institute",
    description:
      "Siddhartha Institute of Technology Sciences students can now apply for transcript and document services online.",
    stats: [
      { value: "7,000+", label: "Students Served" },
      { value: "32+", label: "Partner Universities" },
      { value: "94%", label: "Success Rate" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      "Marks Memorandum",
      "Transcripts",
      "Degree Certificate",
      "Provisional Certificate",
    ],
  },
};

export default collegesData;
