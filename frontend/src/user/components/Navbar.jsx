import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/100.png";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [collegesDropdown, setCollegesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // SEARCH STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        !e.target.closest(".services-menu") &&
        !e.target.closest(".colleges-menu") &&
        !e.target.closest(".search-box")
      ) {
        setServicesDropdown(false);
        setCollegesDropdown(false);
        setActiveSubMenu(null);
        setShowSearchResults(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  // SERVICES
  const servicesLinks = [
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
      name: "Certificates",
      submenu: [
        { name: "Transcripts", path: "/services/transcripts" },
        { name: "Provisional Certificate", path: "/services/pc" },
        { name: "Original Degree", path: "/services/od" },
        { name: "Consolidated Marks Memo", path: "/services/cmm" },
        { name: "MOI Certificate", path: "/services/moi" },
      ],
    },
   
  ];

  // PARTNERED COLLEGES
 const partneredColleges = [
 

  {
    name: "Bhaskar Pharmacy College",
    path: "/partnered-colleges/bhaskar-pharmacy-college",
  },

  {
    name: "Joginpally B.R Pharmacy College",
    path: "/partnered-colleges/joginpally-br-pharmacy-college",
  },

  {
    name: "Siddhartha Institute",
    path: "/partnered-colleges/siddhartha-institute-of-technology-sciences",
  },
];

  // UNIVERSITIES
const universities = [
  "JNTU Hyderabad", "Osmania University", "University of Hyderabad", "JNTU Kakinada", "JNTU Anantapur",
  "Andhra University", "Sri Venkateswara University", "Kakatiya University", "SV University", "Acharya Nagarjuna University",
  "University of Mumbai", "University of Pune", "Savitribai Phule Pune University", "University of Delhi", "Jawaharlal Nehru University",
  "Banaras Hindu University", "Aligarh Muslim University", "University of Calcutta", "University of Madras", "Anna University",
  "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur",
  "NIT Trichy", "NIT Warangal", "NIT Surathkal", "NIT Rourkela", "BITS Pilani",
  "VIT Vellore", "SRM University", "Manipal University", "Amrita University", "Christ University",
  "Jain University", "Bangalore University", "Mysore University", "Karnataka University", "Gulbarga University",
  "Kuvempu University", "Mangalore University", "Rajiv Gandhi University", "Tezpur University", "Dibrugarh University",
  "Gauhati University", "Assam University", "North Eastern Hill University", "Punjab University", "Panjab University Chandigarh",
  "Guru Nanak Dev University", "Punjabi University", "Thapar University", "Lovely Professional University", "Chandigarh University",
  "University of Rajasthan", "Rajasthan Technical University", "Maharshi Dayanand University", "Kurukshetra University", "Guru Jambheshwar University",
  "Chaudhary Charan Singh University", "Dr. B.R. Ambedkar University", "University of Lucknow", "Banasthali University", "Amity University",
  "Sharda University", "Galgotias University", "Jamia Millia Islamia", "Jamia Hamdard", "Bundelkhand University",
  "Chhatrapati Shahu Ji Maharaj University", "Dr. A.P.J. Abdul Kalam Technical University", "Madan Mohan Malaviya University", "University of Allahabad",
  "Sam Higginbottom University", "English and Foreign Languages University", "NALSAR University of Law", "Jadavpur University", "Presidency University",
  "St. Xavier's College", "University of Burdwan", "Kalyani University", "Vidyasagar University", "North Bengal University",
  "Bharath University", "SASTRA University", "PSG College of Technology", "Loyola College", "Madras Christian College",
  "Hindustan University", "Sathyabama University", "Vel Tech University", "Vels University", "Saveetha University",
  "Sri Ramachandra University", "Cochin University of Science and Technology", "Mahatma Gandhi University", "Calicut University", "Kannur University",
  "Indian Institute of Technology Palakkad", "Indian Institute of Technology Tirupati", "Indian Institute of Technology Dharwad", "Indian Institute of Technology Bhilai",
  "Indian Institute of Technology Goa", "Indian Institute of Technology Jammu", "Indian Institute of Technology Bhubaneswar", "Indian Institute of Technology Guwahati",
  "Indian Institute of Technology Ropar", "Indian Institute of Technology Mandi", "Indian Institute of Technology Indore", "Indian Institute of Technology Jodhpur",
  "Indian Institute of Technology Hyderabad", "Indian Institute of Technology Patna", "Indian Institute of Technology Gandhinagar", "Indian Institute of Technology Roorkee",
  "Indian Institute of Technology Varanasi", "Indian Institute of Technology Chennai", "National Institute of Technology Delhi", "National Institute of Technology Srinagar",
  "National Institute of Technology Hamirpur", "National Institute of Technology Jalandhar", "National Institute of Technology Kurukshetra", "National Institute of Technology Allahabad",
  "National Institute of Technology Patna", "National Institute of Technology Jamshedpur", "National Institute of Technology Durgapur", "National Institute of Technology Silchar",
  "National Institute of Technology Agartala", "National Institute of Technology Nagpur", "National Institute of Technology Raipur", "National Institute of Technology Puducherry",
  "National Institute of Technology Goa", "National Institute of Technology Andhra Pradesh", "National Institute of Technology Uttarakhand", "National Institute of Technology Sikkim",
  "National Institute of Technology Manipur", "National Institute of Technology Meghalaya", "National Institute of Technology Mizoram", "National Institute of Technology Nagaland",
  "National Institute of Technology Arunachal Pradesh", "Birla Institute of Technology Mesra", "Birla Institute of Technology Pilani", "Birla Institute of Technology Goa",
  "Birla Institute of Technology Hyderabad", "Birla Institute of Technology Jaipur", "Birla Institute of Technology Dubai", "VIT Bhopal", "VIT Chennai",
  "VIT Amaravati", "VIT Bangalore", "SRM Institute of Science and Technology", "SRM University Delhi NCR", "SRM University Sonepat",
  "SRM University Haryana", "Amrita School of Engineering", "Amrita School of Business", "Amrita School of Medicine", "Amrita School of Arts and Sciences",
  "Manipal Academy of Higher Education", "Manipal Institute of Technology", "Manipal College of Pharmaceutical Sciences", "Manipal College of Dental Sciences", "Kasturba Medical College",
  "Jawaharlal Institute of Postgraduate Medical Education", "Christian Medical College", "Armed Forces Medical College", "St. John's Medical College", "Lady Hardinge Medical College",
  "Maulana Azad Medical College", "All India Institute of Medical Sciences", "Post Graduate Institute of Medical Education", "Christian Medical College Vellore", "JIPMER Puducherry",
  "National Institute of Mental Health", "Tata Memorial Hospital", "Kidwai Memorial Institute", "Chittaranjan National Cancer Institute", "Sri Ramachandra Medical College",
  "Saveetha Medical College", "Sri Venkateswara Medical College", "Osmania Medical College", "Gandhi Medical College", "Kakatiya Medical College",
  "Andhra Medical College", "Guntur Medical College", "Kurnool Medical College", "Rajiv Gandhi University of Health Sciences", "Bangalore Medical College",
  "Mysore Medical College", "Kasturba Medical College Manipal", "Kasturba Medical College Mangalore", "Father Muller Medical College", "St. John's Medical College Bangalore",
  "M.S. Ramaiah Medical College", "Kempegowda Institute of Medical Sciences", "Vydehi Institute of Medical Sciences", "Apollo Hospitals Educational", "Yenepoya University",
  "Nitte University", "JSS University", "M.S. Ramaiah University", "Dayananda Sagar University", "Alliance University",
  "Azim Premji University", "PES University", "BMS College of Engineering", "R.V. College of Engineering", "M.S. Ramaiah Institute of Technology",
  "Bangalore Institute of Technology", "University Visvesvaraya College", "Central College Bangalore", "National College Bangalore", "Mount Carmel College",
  "St. Joseph's College", "Jyoti Nivas College", "Bishop Cotton College", "Sophia College", "Elphinstone College",
  "St. Xavier's College Mumbai", "Hindu College", "St. Stephen's College", "Miranda House", "Lady Shri Ram College",
  "Hansraj College", "Kirori Mal College", "Ramjas College", "Shri Ram College", "Lady Irwin College",
  "Indraprastha College", "Jesus and Mary College", "Maitreyi College", "Gargi College", "Kamla Nehru College",
  "Acharya Narendra Dev College", "Deen Dayal Upadhyaya College", "Shaheed Sukhdev College", "Netaji Subhas University", "Bhagat Singh College",
  "Sri Venkateswara College", "Zakir Husain College"
];

  const filteredUniversities = universities.filter((uni) =>
    uni.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // STYLES
  const dropdownStyle =
    "w-80 rounded-xl border border-slate-200 bg-white py-2 text-slate-800 shadow-xl";

  const itemStyle =
    "block px-6 py-4 font-semibold hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-colors";

  return (
    <nav className="fixed top-0 z-[100] w-full bg-white/95 border-b border-slate-200 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 px-3 py-1 max-w-7xl mx-auto h-[70px]">

        {/* LOGO */}
        <Link
          to="/"
          className="shrink-0 flex items-center overflow-visible"
        >
          <img
            src={logo}
            alt="100 Transcripts"
            className="h-20 md:h-24 w-auto object-contain mix-blend-multiply relative z-10"
          />
        </Link>

        {/* SEARCH BAR */}
        <div className="hidden lg:block relative w-full max-w-xs search-box">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchTerm.trim()) {

                navigate("/", {
                  state: {
                    university: searchTerm,
                  },
                });

                setShowSearchResults(false);

                setTimeout(() => {
                  const section =
                    document.getElementById("university-search");

                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }, 200);
              }
            }}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all"
          />

          {/* SEARCH RESULTS */}
          {showSearchResults && searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto z-[200]">

              {filteredUniversities.length > 0 ? (
                filteredUniversities.map((uni, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchTerm(uni);
                      setShowSearchResults(false);

                      navigate("/", {
                        state: {
                          university: uni,
                        },
                      });

                      setTimeout(() => {
                        const section =
                          document.getElementById("university-search");

                        if (section) {
                          section.scrollIntoView({
                            behavior: "smooth",
                          });
                        }
                      }, 200);
                    }}
                    className="block px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-slate-100 last:border-b-0 cursor-pointer"
                  >
                    {uni}
                  </div>
                ))
              ) : (
                <p className="px-5 py-4 text-sm text-slate-500">
                  No university found
                </p>
              )}
            </div>
          )}
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-5 items-center font-bold uppercase text-[12px] tracking-wider text-slate-700">

          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              HOME
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-blue-600 transition-colors">
              ABOUT
            </Link>
          </li>

          {/* SERVICES */}
          <li className="relative services-menu">
            <button
              onClick={() => {
                setServicesDropdown(!servicesDropdown);
                setCollegesDropdown(false);
              }}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              SERVICES

              <FiChevronDown
                className={`transition-transform ${
                  servicesDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {servicesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full pt-3"
                >
                  <div className={dropdownStyle}>
                    {servicesLinks.map((item, index) => (
                      <div key={item.name} className="relative">

                        {item.submenu ? (
                          <>
                            <div
                              onClick={() =>
                                setActiveSubMenu(
                                  activeSubMenu === index ? null : index
                                )
                              }
                              className={`${itemStyle} flex justify-between items-center`}
                            >
                              {item.name}

                              <FiChevronRight
                                className={`transition-transform ${
                                  activeSubMenu === index ? "rotate-90" : ""
                                }`}
                              />
                            </div>

                            <AnimatePresence>
                              {activeSubMenu === index && (
                                <motion.div
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  className="absolute left-full top-0 w-80 bg-white border border-slate-200 rounded-xl py-2 shadow-xl ml-2"
                                >
                                  {item.submenu.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      to={sub.path}
                                      className={itemStyle}
                                      onClick={() =>
                                        setServicesDropdown(false)
                                      }
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            className={itemStyle}
                            onClick={() => setServicesDropdown(false)}
                          >
                            {item.name}
                          </Link>
                        )}

                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link to="/apply" className="hover:text-blue-600 transition-colors">
              APPLY
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="hover:text-blue-600 transition-colors"
            >
              CONTACT
            </Link>
          </li>

          <li>
            <Link
              to="/universities"
              className="hover:text-blue-600 transition-colors"
            >
              UNIVERSITIES
            </Link>
          </li>

          {/* PARTNERED */}
          <li className="relative colleges-menu">
            <button
              onClick={() => {
                setCollegesDropdown(!collegesDropdown);
                setServicesDropdown(false);
              }}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              PARTNERED

              <FiChevronDown
                className={`transition-transform ${
                  collegesDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {collegesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full pt-3"
                >
                  <div className={dropdownStyle}>
                    {partneredColleges.map((college) => (
                      <Link
                        key={college.name}
                        to={college.path}
                        className={itemStyle}
                        onClick={() => setCollegesDropdown(false)}
                      >
                        {college.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* LOGIN BUTTON */}
        <div className="hidden lg:block shrink-0">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-full shadow-xl hover:scale-105 transition-all"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-full shadow-xl hover:scale-105 transition-all"
            >
              LOGIN
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors relative z-[300]"
        >
          {isMobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
              {/* MOBILE SEARCH */}
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSearchResults(true);
                  }}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium outline-none focus:border-blue-500 transition-all"
                />
                {showSearchResults && searchTerm && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto z-[201]">
                    {filteredUniversities.length > 0 ? (
                      filteredUniversities.map((uni, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSearchTerm(uni);
                            setShowSearchResults(false);
                            setIsMobileMenuOpen(false);
                            navigate("/", { state: { university: uni } });
                            setTimeout(() => {
                              document.getElementById("university-search")?.scrollIntoView({ behavior: "smooth" });
                            }, 200);
                          }}
                          className="px-4 py-3 text-sm font-semibold text-slate-700 border-b border-slate-50 last:border-b-0"
                        >
                          {uni}
                        </div>
                      ))
                    ) : (
                      <p className="px-4 py-3 text-sm text-slate-500">No university found</p>
                    )}
                  </div>
                )}
              </div>

              {/* MOBILE LINKS */}
              <ul className="space-y-4 font-bold text-sm tracking-wide text-slate-700">
                <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link></li>
                <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link></li>
                <li className="services-menu">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setServicesDropdown(!servicesDropdown);
                    }}
                    className="flex items-center justify-between w-full"
                  >
                    SERVICES <FiChevronDown className={servicesDropdown ? "rotate-180" : ""} />
                  </button>
                  {servicesDropdown && (
                    <ul className="mt-3 ml-4 space-y-3 border-l-2 border-slate-100 pl-4 font-semibold text-slate-600">
                      {servicesLinks.map(s => (
                        <li key={s.name}>
                          <p className="text-[10px] text-slate-400 uppercase mb-1">{s.name}</p>
                          <div className="space-y-2">
                            {s.submenu.map(sub => (
                              <Link key={sub.name} to={sub.path} className="block" onClick={() => setIsMobileMenuOpen(false)}>{sub.name}</Link>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li><Link to="/apply" onClick={() => setIsMobileMenuOpen(false)}>APPLY</Link></li>
                <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</Link></li>
                <li><Link to="/universities" onClick={() => setIsMobileMenuOpen(false)}>UNIVERSITIES</Link></li>
                <li className="colleges-menu">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCollegesDropdown(!collegesDropdown);
                    }}
                    className="flex items-center justify-between w-full"
                  >
                    PARTNERED <FiChevronDown className={collegesDropdown ? "rotate-180" : ""} />
                  </button>
                  {collegesDropdown && (
                    <ul className="mt-3 ml-4 space-y-3 border-l-2 border-slate-100 pl-4 font-semibold text-slate-600">
                      {partneredColleges.map(c => (
                        <li key={c.name}><Link to={c.path} onClick={() => setIsMobileMenuOpen(false)}>{c.name}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>

              {/* MOBILE AUTH */}
              <div className="pt-4 border-t border-slate-100">
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl">LOGOUT</button>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-3 bg-blue-600 text-white text-center font-bold rounded-xl">LOGIN</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;