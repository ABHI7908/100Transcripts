import React, { useState, useEffect, useCallback } from "react";
import {
  Search
} from "lucide-react";
import {
  ShieldCheck,
  Building2,
  Clock,
  Eye,
  CheckCircle,
  X,
  Globe,
  User,
  Calendar,
  Layers,
  Send,
  MessageSquare,
  CheckCircle2,
  Circle,
  Truck,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";
import { Mail } from "lucide-react";
import { getVerifications } from "../../services/api";

const CollegeVerification = () => {
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // 🟠 NEW: States for the Reply/Notification Generator
  const [replyingTo, setReplyingTo] = useState(null);
  const [issueType, setIssueType] = useState("Document Issue");
  const [exactProblem, setExactProblem] = useState(
    "The uploaded ID proof is blurred and unreadable.",
  );
  const [copied, setCopied] = useState(false);
  const companyName = "100 Transcripts";

  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Dynamic API Base
  const fetchVerifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getVerifications();
      if (response.ok) {
        setVerifications(response.data);
      }
    } catch (err) {
      // Error fetching verifications handled
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVerifications();
  }, [fetchVerifications]);

  // 🟠 NEW: Email logic
  const emailBody = replyingTo
    ? `Dear ${replyingTo.student},

We have reviewed your verification request, and there is an issue that requires your attention.

Issue Details:
• Type: ${issueType}
• Details: ${exactProblem}

Best regards,
${companyName} Support Team`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      `Action Required: ${issueType} for your Request`,
    );
    const body = encodeURIComponent(emailBody);
    window.location.href = `mailto:${replyingTo.email}?subject=${subject}&body=${body}`;
  };
  const filteredVerifications = verifications.filter((item) => {
    const term = searchTerm.toLowerCase();

    return (
      String(item.id || "")
        .toLowerCase()
        .includes(term) ||
      String(item.student || "")
        .toLowerCase()
        .includes(term) ||
      String(item.email || "")
        .toLowerCase()
        .includes(term)
    );
  });
  return (
    <div className="space-y-8 relative">
      {/* 🔵 Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Left Side - Heading */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            College Verification Portal
          </h1>
          <p className="text-slate-500 mt-1">
            Validation status from affiliated institutions
          </p>
        </div>

        {/* Right Side - Search */}
        <div className="relative w-full lg:w-[420px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Search size={20} className="text-slate-400" />
          </div>

          <input
            type="text"
            placeholder="Search by Tracking ID, Name, Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          )}
        </div>

      </div>


      {/* 🟢 Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Building2 />
            </div>
            <div>
              <h3 className="font-bold text-lg">Pending Institution Checks</h3>
              <p className="text-sm text-slate-500">12 Colleges waiting</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0b2a4a] text-white p-6 rounded-2xl">
          <h3 className="text-lg text-white">Verification Accuracy</h3>
          <div className="text-4xl font-bold text-blue-400 mt-2">99.8%</div>
          <p className="text-sm text-slate-300">System-wide score</p>
        </div>
      </div>

      {/* 📊 TABLE */}
      <div className="bg-white rounded-2xl border shadow-sm">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">College</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Tracking ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Assigned</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading verifications...
                    </div>
                  </td>
                </tr>
              ) : verifications.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No approved applications found for verification.
                  </td>
                </tr>
              ) : (
                filteredVerifications.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {item.college}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.country}</td>
                    <td className="px-4 py-3 text-slate-600">{item.student}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.date}</td>
                    <td className="px-4 py-3 text-slate-600">{item.mode}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {item.assigned}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${item.status === "Verified"
                            ? "bg-green-100 text-green-600"
                            : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {/* 🟠 Updated Reply Button */}
                        <button
                          onClick={() => setReplyingTo(item)}
                          className="p-2 text-blue-600 hover:bg-orange-100 rounded-lg transition"
                          title="Reply/Contact"
                        >
                          <Mail size={18} />
                        </button>
                        <button
                          onClick={() => setSelectedVerification(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition">
                          <CheckCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4 p-4">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-slate-500">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Loading verifications...
            </div>
          ) : verifications.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No approved applications found for verification.
            </div>
          ) : (
            verifications.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-800">{item.college}</h3>
                    <p className="text-sm text-slate-500">{item.country}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${item.status === "Verified"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student:</span>
                    <span className="font-medium text-slate-700">
                      {item.student}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tracking ID:</span>
                    <span className="font-medium text-slate-700 text-xs">
                      {item.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-medium text-slate-700">
                      {item.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mode:</span>
                    <span className="font-medium text-slate-700">
                      {item.mode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned:</span>
                    <span className="font-medium text-slate-700">
                      {item.assigned}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setReplyingTo(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-50 text-orange-600 rounded-lg font-medium hover:bg-orange-100 transition min-h-[44px]"
                  >
                    <Mail size={18} />
                    Reply
                  </button>
                  <button
                    onClick={() => setSelectedVerification(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition min-h-[44px]"
                  >
                    <Eye size={18} />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition min-h-[44px]">
                    <CheckCircle size={18} />
                    Verify
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🟠 NEW: ISSUE NOTIFICATION MODAL */}
      {replyingTo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4 font-sans">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <div className="flex-1 p-4 md:p-8 space-y-4 md:space-y-6 overflow-y-auto border-r border-slate-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Send className="text-blue-600" /> Issue Generator
                </h2>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Student
                  </label>
                  <div className="p-3 bg-slate-50 border rounded-xl font-bold text-slate-700 mt-1 text-sm">
                    {replyingTo.student} ({replyingTo.email})
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Issue Category
                  </label>
                  <select
                    className="w-full border rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                  >
                    <option>Document Issue</option>
                    <option>Payment Issue</option>
                    <option>Missing Information</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Problem Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full border rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={exactProblem}
                    onChange={(e) => setExactProblem(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-[350px] bg-slate-50 p-4 md:p-8 flex flex-col">
              <div className="flex justify-between items-center mb-4 font-bold text-slate-700">
                <h3>Preview</h3>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded-lg transition ${copied ? "bg-green-600 text-white" : "bg-white border text-slate-600 hover:bg-slate-100"}`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-600 whitespace-pre-wrap flex-1 italic overflow-y-auto">
                {emailBody}
              </div>
              <button
                onClick={handleSendEmail}
                className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl transition min-h-[44px]"
              >
                <Send size={18} /> Send Notification
              </button>
              <div className="mt-4 p-3 bg-amber-50 rounded-xl flex gap-2 border border-amber-100">
                <AlertCircle className="text-amber-500 shrink-0" size={16} />
                <p className="text-[10px] text-amber-800 leading-tight">
                  Notification will open in your default mail app.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔵 VERIFICATION DETAIL MODAL */}
      {selectedVerification && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#0b2a4a] p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Verification Details</h2>
                <p className="text-xs text-blue-300 uppercase tracking-widest mt-1">
                  {selectedVerification.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedVerification(null)}
                className="hover:bg-white/10 p-2 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-8 space-y-4 md:space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Institution Row */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold shrink-0">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    {selectedVerification.college}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <Globe size={14} className="text-blue-500" />{" "}
                    {selectedVerification.country}
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 border-b pb-4 md:pb-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Student
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <User size={16} className="text-blue-500" />{" "}
                    {selectedVerification.student}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Date
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Calendar size={16} className="text-blue-500" />{" "}
                    {selectedVerification.date}
                  </div>
                </div>
              </div>

              {/* Process Timeline Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest">
                  <Truck size={16} className="text-blue-600" /> Process Timeline
                </h4>
                <div className="relative space-y-6 pl-4">
                  <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                  {selectedVerification.history.map((step, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div
                        className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 bg-white ${step.done
                            ? "border-green-500 text-green-500"
                            : "border-slate-300 text-slate-300"
                          }`}
                      >
                        {step.done ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Circle size={10} fill="currentColor" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold ${step.done ? "text-slate-800" : "text-slate-400"}`}
                        >
                          {step.step}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {step.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignment Footer */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-slate-100">
                {/* 🟠 Updated Detail Modal Reply Button */}
                <button
                  className="flex-1 bg-blue-50 text-blue-700 py-3 rounded-xl font-bold hover:bg-blue-100 transition flex items-center justify-center gap-2 min-h-[44px]"
                  onClick={() => {
                    setReplyingTo(selectedVerification);
                    setSelectedVerification(null);
                  }}
                >
                  <Send size={18} /> Reply
                </button>
                <button
                  onClick={() => setSelectedVerification(null)}
                  className="flex-1 bg-[#0b2a4a] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg min-h-[44px]"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeVerification;
