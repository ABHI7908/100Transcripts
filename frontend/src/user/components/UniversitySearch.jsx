// import React, { useState } from "react";
// import { Search, MapPin, GraduationCap, Target, ArrowRight, CheckCircle2 } from "lucide-react";
// import { motion } from "framer-motion";

// const universities = [
//   "JNTU Hyderabad", "Osmania University", "University of Hyderabad", "JNTU Kakinada", "JNTU Anantapur",
//   "Andhra University", "Sri Venkateswara University", "Kakatiya University", "SV University", "Acharya Nagarjuna University",
//   "University of Mumbai", "University of Pune", "Savitribai Phule Pune University", "University of Delhi", "Jawaharlal Nehru University",
//   "Banaras Hindu University", "Aligarh Muslim University", "University of Calcutta", "University of Madras", "Anna University",
//   "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur",
//   "NIT Trichy", "NIT Warangal", "NIT Surathkal", "NIT Rourkela", "BITS Pilani",
//   "VIT Vellore", "SRM University", "Manipal University", "Amrita University", "Christ University",
//   "Jain University", "Bangalore University", "Mysore University", "Karnataka University", "Gulbarga University",
//   "Kuvempu University", "Mangalore University", "Rajiv Gandhi University", "Tezpur University", "Dibrugarh University",
//   "Gauhati University", "Assam University", "North Eastern Hill University", "Punjab University", "Panjab University Chandigarh",
//   "Guru Nanak Dev University", "Punjabi University", "Thapar University", "Lovely Professional University", "Chandigarh University",
//   "University of Rajasthan", "Rajasthan Technical University", "Maharshi Dayanand University", "Kurukshetra University", "Guru Jambheshwar University",
//   "Chaudhary Charan Singh University", "Dr. B.R. Ambedkar University", "University of Lucknow", "Banasthali University", "Amity University",
//   "Sharda University", "Galgotias University", "Jamia Millia Islamia", "Jamia Hamdard", "Bundelkhand University",
//   "Chhatrapati Shahu Ji Maharaj University", "Dr. A.P.J. Abdul Kalam Technical University", "Madan Mohan Malaviya University", "University of Allahabad",
//   "Sam Higginbottom University", "English and Foreign Languages University", "NALSAR University of Law", "Jadavpur University", "Presidency University",
//   "St. Xavier's College", "University of Burdwan", "Kalyani University", "Vidyasagar University", "North Bengal University",
//   "Bharath University", "SASTRA University", "PSG College of Technology", "Loyola College", "Madras Christian College",
//   "Hindustan University", "Sathyabama University", "Vel Tech University", "Vels University", "Saveetha University",
//   "Sri Ramachandra University", "Cochin University of Science and Technology", "Mahatma Gandhi University", "Calicut University", "Kannur University",
//   "Indian Institute of Technology Palakkad", "Indian Institute of Technology Tirupati", "Indian Institute of Technology Dharwad", "Indian Institute of Technology Bhilai",
//   "Indian Institute of Technology Goa", "Indian Institute of Technology Jammu", "Indian Institute of Technology Bhubaneswar", "Indian Institute of Technology Guwahati",
//   "Indian Institute of Technology Ropar", "Indian Institute of Technology Mandi", "Indian Institute of Technology Indore", "Indian Institute of Technology Jodhpur",
//   "Indian Institute of Technology Hyderabad", "Indian Institute of Technology Patna", "Indian Institute of Technology Gandhinagar", "Indian Institute of Technology Roorkee",
//   "Indian Institute of Technology Varanasi", "Indian Institute of Technology Chennai", "National Institute of Technology Delhi", "National Institute of Technology Srinagar",
//   "National Institute of Technology Hamirpur", "National Institute of Technology Jalandhar", "National Institute of Technology Kurukshetra", "National Institute of Technology Allahabad",
//   "National Institute of Technology Patna", "National Institute of Technology Jamshedpur", "National Institute of Technology Durgapur", "National Institute of Technology Silchar",
//   "National Institute of Technology Agartala", "National Institute of Technology Nagpur", "National Institute of Technology Raipur", "National Institute of Technology Puducherry",
//   "National Institute of Technology Goa", "National Institute of Technology Andhra Pradesh", "National Institute of Technology Uttarakhand", "National Institute of Technology Sikkim",
//   "National Institute of Technology Manipur", "National Institute of Technology Meghalaya", "National Institute of Technology Mizoram", "National Institute of Technology Nagaland",
//   "National Institute of Technology Arunachal Pradesh", "Birla Institute of Technology Mesra", "Birla Institute of Technology Pilani", "Birla Institute of Technology Goa",
//   "Birla Institute of Technology Hyderabad", "Birla Institute of Technology Jaipur", "Birla Institute of Technology Dubai", "VIT Bhopal", "VIT Chennai",
//   "VIT Amaravati", "VIT Bangalore", "SRM Institute of Science and Technology", "SRM University Delhi NCR", "SRM University Sonepat",
//   "SRM University Haryana", "Amrita School of Engineering", "Amrita School of Business", "Amrita School of Medicine", "Amrita School of Arts and Sciences",
//   "Manipal Academy of Higher Education", "Manipal Institute of Technology", "Manipal College of Pharmaceutical Sciences", "Manipal College of Dental Sciences", "Kasturba Medical College",
//   "Jawaharlal Institute of Postgraduate Medical Education", "Christian Medical College", "Armed Forces Medical College", "St. John's Medical College", "Lady Hardinge Medical College",
//   "Maulana Azad Medical College", "All India Institute of Medical Sciences", "Post Graduate Institute of Medical Education", "Christian Medical College Vellore", "JIPMER Puducherry",
//   "National Institute of Mental Health", "Tata Memorial Hospital", "Kidwai Memorial Institute", "Chittaranjan National Cancer Institute", "Sri Ramachandra Medical College",
//   "Saveetha Medical College", "Sri Venkateswara Medical College", "Osmania Medical College", "Gandhi Medical College", "Kakatiya Medical College",
//   "Andhra Medical College", "Guntur Medical College", "Kurnool Medical College", "Rajiv Gandhi University of Health Sciences", "Bangalore Medical College",
//   "Mysore Medical College", "Kasturba Medical College Manipal", "Kasturba Medical College Mangalore", "Father Muller Medical College", "St. John's Medical College Bangalore",
//   "M.S. Ramaiah Medical College", "Kempegowda Institute of Medical Sciences", "Vydehi Institute of Medical Sciences", "Apollo Hospitals Educational", "Yenepoya University",
//   "Nitte University", "JSS University", "M.S. Ramaiah University", "Dayananda Sagar University", "Alliance University",
//   "Azim Premji University", "PES University", "BMS College of Engineering", "R.V. College of Engineering", "M.S. Ramaiah Institute of Technology",
//   "Bangalore Institute of Technology", "University Visvesvaraya College", "Central College Bangalore", "National College Bangalore", "Mount Carmel College",
//   "St. Joseph's College", "Jyoti Nivas College", "Bishop Cotton College", "Sophia College", "Elphinstone College",
//   "St. Xavier's College Mumbai", "Hindu College", "St. Stephen's College", "Miranda House", "Lady Shri Ram College",
//   "Hansraj College", "Kirori Mal College", "Ramjas College", "Shri Ram College", "Lady Irwin College",
//   "Indraprastha College", "Jesus and Mary College", "Maitreyi College", "Gargi College", "Kamla Nehru College",
//   "Acharya Narendra Dev College", "Deen Dayal Upadhyaya College", "Shaheed Sukhdev College", "Netaji Subhas University", "Bhagat Singh College",
//   "Sri Venkateswara College", "Zakir Husain College"
// ];

// const UniversitySearch = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUniversities, setFilteredUniversities] = useState([]);
//   const [showResults, setShowResults] = useState(false);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
    
//     if (value.length > 0) {
//       const filtered = universities.filter(uni => 
//         uni.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredUniversities(filtered);
//       setShowResults(true);
//     } else {
//       setFilteredUniversities([]);
//       setShowResults(false);
//     }
//   };

//   const selectUniversity = (uni) => {
//     setSearchTerm(uni);
//     setShowResults(false);
//   };

//   return (
//     <section className="w-full py-20 lg:py-32 bg-[#F8FAFC] relative overflow-hidden">
//       {/* Background Decorative Gradients */}
//       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
//       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/3" />

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
//           {/* LEFT SIDE: CONTENT */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-14"
//           >
//             <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-6">
//               Find Your University
//             </p>

//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-[#2f4a6d] mb-8">
//               Explore Institutions for  
             
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Expert Guidance
//               </span>
//             </h2>

//             <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
//               Search universities, choose services, and get your transcripts processed easily. 
//               Join <span className="font-bold text-blue-600">17,000+ students</span> who trusted our secure workflow.
//             </p>
            
//             {/* Trust Badges */}
//             <div className="grid grid-cols-2 gap-4">
//               {["500+ Universities", "99% Success Rate", "ISO Certified", "24/7 Support"].map((item, i) => (
//                 <div key={i} className="flex items-center gap-2 text-slate-700 font-bold text-sm">
//                   <CheckCircle2 className="text-green-500" size={18} />
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* RIGHT SIDE: SEARCH CARD */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="relative"
//           >
//             <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white relative z-10">
//               <div className="space-y-6">
                
//                 {/* SEARCH INPUT */}
//                 <div className="relative">
//                   <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
//                     <Search size={16} className="text-blue-500" />
//                     Search University
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={searchTerm}
//                       onChange={handleSearch}
//                       placeholder="Type university name..."
//                       className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 text-lg font-bold text-slate-800 transition-all outline-none"
//                     />
//                   </div>

//                   {/* SEARCH RESULTS */}
//                   {showResults && filteredUniversities.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-80 overflow-y-auto z-50">
//                       {filteredUniversities.slice(0, 50).map((uni, index) => (
//                         <div
//                           key={index}
//                           onClick={() => selectUniversity(uni)}
//                           className="px-6 py-4 cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
//                         >
//                           <p className="text-sm font-semibold text-slate-700">{uni}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {showResults && filteredUniversities.length === 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
//                       <p className="text-slate-500 text-center">No universities found</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* SEARCH BUTTON */}
//                 <motion.button
//                   whileHover={{ y: -4, shadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)" }}
//                   whileTap={{ scale: 0.98 }}
//                   className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all"
//                 >
//                   <Search size={24} strokeWidth={3} />
//                   Search University
//                 </motion.button>
//               </div>
//             </div>

//             {/* Subtle Floating Ornament */}
//             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[2rem] -z-10 rotate-12 opacity-20 blur-2xl" />
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default UniversitySearch;




import React, { useState, useEffect } from "react";
import {
  Search,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

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

const UniversitySearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(
    location.state?.university || ""
  );

  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (location.state?.university) {
      const value = location.state.university;
      setSearchTerm(value); // ✅ Ensure the input field text is updated

      const filtered = universities.filter((uni) =>
        uni.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredUniversities(filtered);
      setShowResults(true);
    }
  }, [location.state, navigate]);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = universities.filter((uni) =>
        uni.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredUniversities(filtered);
      setShowResults(true);
    } else {
      setFilteredUniversities([]);
      setShowResults(false);
    }
  };

  const selectUniversity = (uni) => {
    setSearchTerm(uni);
    setShowResults(false);
  };

  const handleApply = () => {
    if (searchTerm.trim()) {
      navigate("/apply", {
        state: {
          university: searchTerm,
        },
      });
    }
  };

  return (
    <section id="university-search" className="w-full pt-12 pb-20 lg:pt-16 lg:pb-32 bg-[#F8FAFC] relative overflow-hidden">
      
      {/* GRADIENTS */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-100/40 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-6">
              Find Your University
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-slate-900 mb-6">
              Search Universities for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mt-2 pb-2">
                Transcript Services
              </span>
            </h2>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              Find your university instantly and apply for transcripts,
              provisional certificates, degree certificates, and verification
              services easily.
            </p>

            {/* BADGES */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "500+ Universities",
                "99% Success Rate",
                "ISO Certified",
                "24/7 Support",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-slate-700 font-bold text-sm"
                >
                  <CheckCircle2
                    className="text-green-500"
                    size={18}
                  />

                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* SEARCH CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white relative z-10">

              <div className="space-y-6">

                {/* INPUT */}
                <div className="relative">

                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                    <Search
                      size={16}
                      className="text-blue-500"
                    />

                    Search University
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Type university name..."
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 text-lg font-bold text-slate-800 transition-all outline-none"
                    />
                  </div>

                  {/* RESULTS */}
                  {showResults && filteredUniversities.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-80 overflow-y-auto z-50">

                      {filteredUniversities
                        .slice(0, 50)
                        .map((uni, index) => (
                          <div
                            key={index}
                            onClick={() => selectUniversity(uni)}
                            className="px-6 py-4 cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <p className="text-sm font-semibold text-slate-700">
                              {uni}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* NO RESULTS */}
                  {showResults &&
                    filteredUniversities.length === 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">

                        <p className="text-slate-500 text-center">
                          No universities found
                        </p>
                      </div>
                    )}
                </div>

                {/* BUTTON */}
                <motion.button
                  onClick={handleApply}
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Search
                    size={18}
                    strokeWidth={3}
                  />

                  Search University
                </motion.button>

              </div>
            </div>

            {/* FLOATING EFFECT */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[2rem] -z-10 rotate-12 opacity-20 blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default UniversitySearch;