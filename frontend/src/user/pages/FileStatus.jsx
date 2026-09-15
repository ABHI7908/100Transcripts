import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiFileText, FiClock, FiShield, FiTruck, FiCheckCircle } from "react-icons/fi";
import { Search, Package, CheckCircle2, ExternalLink, Download, Truck, AlertTriangle } from "lucide-react";
import { getApplicationStatus } from "../../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const STATUS_STEP_MAP = {
  pending_approval: 0,
  pending: 1,
  approved: 2,
  document_review: 2,
  university_review: 3,
  changes_requested: 3,
  processing: 3,
  out_for_delivery: 4,
  completed: 5,
  rejected: -1,
};

const STATUS_LABEL_MAP = {
  pending_approval: "Pending Approval",
  pending: "Pending Payment",
  approved: "Application Approved",
  document_review: "Document Review",
  university_review: "University Verification",
  changes_requested: "Changes Requested",
  processing: "Processing",
  out_for_delivery: "Out for Delivery",
  completed: "Delivered / Completed",
  rejected: "Rejected",
};

const COURIER_LINKS = {
  Shiprocket: "https://shiprocket.co/tracking/",
  Delhivery: "https://www.delhivery.com/track/package/",
  BlueDart: "https://www.bluedart.com/tracking?trackFor=0&trackNo=",
};

const FileStatus = () => {
  const [fileId, setFileId] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const steps = [
    { id: 0, label: "Application", desc: "File Opened", icon: <FiFileText /> },
    { id: 1, label: "Payment", desc: "Fee Confirmed", icon: <FiClock /> },
    { id: 2, label: "Approved", desc: "Admin Review", icon: <FiShield /> },
    { id: 3, label: "University", desc: "Verification", icon: <FiShield /> },
    { id: 4, label: "Dispatched", desc: "On the Way", icon: <FiTruck /> },
    { id: 5, label: "Delivered", desc: "Arrived", icon: <FiCheckCircle /> },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!fileId.trim()) return;
    setLoading(true);
    setNotFound(false);
    setStatusData(null);
    try {
      const res = await getApplicationStatus(fileId.trim(), null);
      if (res.ok && res.data && !res.data.error) {
        setStatusData(res.data);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const currentStep = statusData ? (STATUS_STEP_MAP[statusData.status] ?? 0) : 0;
  const isDelivered = statusData?.agent_status === "DELIVERED" || statusData?.status === "completed";
  const isOutForDelivery = statusData?.agent_status === "OUT_FOR_DELIVERY";
  const courierPartner = statusData?.courier_partner;
  const trackingId = statusData?.agent_tracking_id;
  const trackingUrl = statusData?.tracking_url;
  const decision = statusData?.decision;
  const isRejected = statusData?.status === "rejected";

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-20">

      {/* HEADER SECTION */}
      <motion.section
        className="relative overflow-hidden bg-slate-800 py-24 px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-400/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-300 font-black uppercase text-[10px] tracking-[0.2em]">
            Live Tracking
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            Track Your <span className="text-blue-400">Application</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Enter your Application ID or Tracking ID to see exactly where your papers are.
          </p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* SEARCH BOX */}
        <motion.div
          className="max-w-3xl mx-auto -mt-32 relative z-30 mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              placeholder="Enter Application ID (e.g. 100T-00123)"
              value={fileId}
              onChange={(e) => setFileId(e.target.value)}
              className="w-full bg-white p-6 md:p-10 pr-40 rounded-[2.5rem] shadow-2xl border-2 border-slate-50 outline-none focus:border-blue-500 transition-all font-black text-slate-800 md:text-2xl placeholder:text-slate-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-3 bottom-3 bg-blue-600 text-white px-10 rounded-[2rem] font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-blue-600/20 disabled:opacity-60"
            >
              <span className="hidden sm:inline text-lg">{loading ? "Searching..." : "Track"}</span>
              <Search className="w-6 h-6" />
            </button>
          </form>

          {notFound && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center gap-3">
              <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-sm text-red-700 font-semibold">Application not found. Please check your ID and try again.</p>
            </div>
          )}
        </motion.div>

        {/* STATUS VISUALIZER */}
        {statusData && (
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Summary Card */}
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
              <div className="space-y-3 text-center md:text-left relative z-10">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  isRejected ? "bg-red-50 text-red-600" :
                  isDelivered ? "bg-emerald-50 text-emerald-600" :
                  "bg-blue-50 text-blue-600"
                }`}>
                  {isRejected ? "❌ Rejected" : isDelivered ? "✅ Delivered" : "🔄 In Progress"}
                </span>
                <h3 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
                  {STATUS_LABEL_MAP[statusData.status] || statusData.status}
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 pt-2">
                  <p className="text-slate-400 font-bold text-sm">
                    Applicant: <span className="text-slate-700">{statusData.fullName || "—"}</span>
                  </p>
                  {statusData.university && (
                    <p className="text-slate-400 font-bold text-sm">
                      University: <span className="text-slate-700">{statusData.university}</span>
                    </p>
                  )}
                </div>
                {statusData.admin_message && (
                  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mt-2">
                    📋 Admin Note: {statusData.admin_message}
                  </p>
                )}
              </div>

              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center shadow-inner border border-blue-100">
                <Package className="w-10 h-10" />
              </div>
            </div>

            {/* Delivery Tracking Card (visible when out for delivery or delivered) */}
            {(isOutForDelivery || isDelivered) && (
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-5">
                  <Truck className="text-blue-600" size={22} /> Delivery Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Courier Partner</p>
                    <p className="text-base font-bold text-slate-800">{courierPartner || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Tracking ID</p>
                    <p className="text-base font-bold text-slate-800 font-mono">{trackingId || "—"}</p>
                  </div>
                  <div>
                    {trackingUrl ? (
                      <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow"
                      >
                        <ExternalLink size={16} /> Track on Courier Site
                      </a>
                    ) : (
                      <p className="text-sm text-slate-400">Tracking link will appear here once available.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* University Decision Banner */}
            {decision && decision.decision === "REJECTED" && (
              <div className="bg-red-50 border border-red-200 p-8 rounded-[2rem] shadow">
                <h3 className="text-lg font-black text-red-800 flex items-center gap-2 mb-4">
                  <AlertTriangle size={22} className="text-red-600" /> University Rejected Application
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-red-400 font-bold uppercase mb-1">Rejection Reason</p>
                    <p className="text-base font-bold text-red-900">{decision.rejection_reason || "Not specified"}</p>
                  </div>
                  {decision.remarks && (
                    <div>
                      <p className="text-xs text-red-400 font-bold uppercase mb-1">Remarks</p>
                      <p className="text-sm font-medium text-red-800">{decision.remarks}</p>
                    </div>
                  )}
                  {decision.rejection_letter_url && (
                    <div>
                      <a href={decision.rejection_letter_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition shadow">
                        <Download size={16} /> Download Rejection Letter
                      </a>
                    </div>
                  )}
                  <div className="pt-4 mt-4 border-t border-red-200/60 flex gap-3">
                     <button className="px-5 py-2.5 bg-red-100 text-red-700 rounded-xl font-bold text-sm hover:bg-red-200 transition">Upload Corrected Documents</button>
                     <button className="px-5 py-2.5 bg-red-100 text-red-700 rounded-xl font-bold text-sm hover:bg-red-200 transition">Resubmit Application</button>
                  </div>
                </div>
              </div>
            )}

            {decision && decision.decision === "ADDITIONAL_DOCS" && (
              <div className="bg-amber-50 border border-amber-200 p-8 rounded-[2rem] shadow">
                <h3 className="text-lg font-black text-amber-800 flex items-center gap-2 mb-4">
                  <FileText size={22} className="text-amber-600" /> Additional Documents Required
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-amber-500 font-bold uppercase mb-1">Required Documents</p>
                    <p className="text-sm font-medium text-amber-900 whitespace-pre-wrap">{decision.required_documents}</p>
                  </div>
                  {decision.deadline && (
                    <div>
                      <p className="text-xs text-amber-500 font-bold uppercase mb-1">Submission Deadline</p>
                      <p className="text-base font-bold text-amber-900">{new Date(decision.deadline).toLocaleDateString()}</p>
                    </div>
                  )}
                  {decision.remarks && (
                    <div>
                      <p className="text-xs text-amber-500 font-bold uppercase mb-1">Remarks</p>
                      <p className="text-sm font-medium text-amber-800">{decision.remarks}</p>
                    </div>
                  )}
                  <div className="pt-4 mt-4 border-t border-amber-200/60">
                     <button className="px-5 py-2.5 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 transition shadow">Upload Missing Documents</button>
                  </div>
                </div>
              </div>
            )}

            {/* Download digital copy (when delivered/completed or uploaded by agent) */}
            {(isDelivered || (statusData.documents && statusData.documents.length > 0)) && (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-[2rem] shadow">
                <h3 className="text-lg font-black text-emerald-800 flex items-center gap-2 mb-4">
                  <Download size={22} className="text-emerald-600" /> Download Your Documents
                </h3>
                <div className="flex flex-col gap-3">
                  {statusData.documents.map((doc, idx) => (
                    <a
                      key={doc.id || idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white border border-emerald-200 px-5 py-3 rounded-xl font-semibold text-emerald-700 hover:bg-emerald-50 transition shadow-sm"
                    >
                      <Download size={16} /> {doc.name || `Document ${idx + 1}`}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Steps */}
            {!isRejected && (
              <div className="relative pt-24 pb-12 overflow-x-auto hide-scrollbar">
                <div className="min-w-[800px] sm:min-w-0">
                  {/* Connector Line */}
                  <div className="absolute top-[116px] left-[10%] right-[10%] h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(((currentStep) / (steps.length - 1)) * 100, 100)}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                    />
                  </div>

                  <div className="relative z-10 flex justify-between px-4 sm:px-0">
                    {steps.map((step, i) => {
                      const isDone = i < currentStep;
                      const isCurrent = i === currentStep;
                      return (
                        <div key={i} className={`flex flex-col items-center text-center transition-all duration-700 w-40 ${!isDone && !isCurrent ? "opacity-30" : "opacity-100"}`}>
                          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700 relative ${
                            isDone ? "bg-blue-600 text-white" :
                            isCurrent ? "bg-slate-800 text-white ring-8 ring-blue-50 scale-110" :
                            "bg-white text-slate-300"
                          }`}>
                            {isDone ? <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10" /> : React.cloneElement(step.icon, { size: 32 })}
                            {isCurrent && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-bounce shadow-lg">
                                ACTIVE
                              </div>
                            )}
                          </div>
                          <h4 className="font-black text-slate-800 mt-6 mb-1 text-sm md:text-base uppercase tracking-tight">{step.label}</h4>
                          <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{step.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Rejection banner */}
            {isRejected && (
              <div className="bg-red-50 border border-red-200 p-8 rounded-[2rem] text-center">
                <p className="text-2xl font-black text-red-700 mb-2">❌ Application Rejected</p>
                <p className="text-slate-600 text-sm">
                  {statusData.rejection_reason || statusData.admin_message || "Please contact support for more information."}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* WHATSAPP FLOATING */}
      <a
        href="https://wa.me/919941991402"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-all hover:scale-110 active:scale-95"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
};

export default FileStatus;