import {
  Search, Filter, Eye, CheckCircle, Clock, XCircle, Users, X,
  MapPin, Mail, CreditCard, Truck, FileCheck, CheckCircle2, Circle,
  Send, Copy, Check, AlertCircle, MessageCircle, Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import AgentAssignmentPanel from "./AgentAssignmentPanel";
import EmptyState from "../../components/EmptyState";
import { FaWhatsapp } from "react-icons/fa";
import { getApplications, sendNotification, updateApplicationStatus, downloadDocument } from "../../services/api";

const StudentRequests = () => {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [requests, setRequests] = useState([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);

  // --- NEW: Reply/Message States ---
  const [replyingTo, setReplyingTo] = useState(null);
  const [issueType, setIssueType] = useState('Document Issue');
  const [exactProblem, setExactProblem] = useState('The uploaded ID proof is blurred and unreadable.');
  const [copied, setCopied] = useState(false);
  const companyName = "100 Transcripts";

  // --- Rejection Reason Modal State ---
  const [rejectingStudent, setRejectingStudent] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // --- Approving Pricing Modal State ---
  const [approvingStudent, setApprovingStudent] = useState(null);
  const [servicePrice, setServicePrice] = useState("");

  // ✅ FETCH API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getApplications();
        if (response.ok) {
          setRequests(response.data);
        }
      } catch {
        // Error fetching requests handled
      }
    };

    fetchRequests();
  }, []);

  const handleRequestChanges = async () => {
    if (!replyingTo) return;

    try {
      // 1. Send Email Notification
      const response = await sendNotification(
        replyingTo.email,
        `Action Required: ${issueType} for Request ${replyingTo.id}`,
        emailBody
      );

      // 2. Also Update Status in DB so student sees it on Waiting Screen
      await updateStatus(replyingTo.raw_id, "changes_requested", exactProblem);

      if (response.ok) {
        alert("✅ Notification sent and Status updated to Changes Requested");
        setReplyingTo(null);
      } else {
        alert("❌ " + (response.data.error || "Failed to send"));
      }
    } catch {
      // Error handled
      alert("❌ Server error");
    }
  };

  const updateStatus = async (id, newStatus, message = "", agent = null, rejReason = null, serviceFee = null) => {
    try {
      const response = await updateApplicationStatus(id, newStatus, message, agent, rejReason, serviceFee);

      if (!response.ok) {
        const errMsg = response.data?.error || "Update failed";
        alert("❌ " + errMsg);
        return;
      }

      // Refetch requests to update the UI
      const fetchUpdatedRequests = async () => {
        const fetchRes = await getApplications();
        if (fetchRes.ok) {
          setRequests(fetchRes.data);
        }
      };
      await fetchUpdatedRequests();

      setSelectedStudent(prev =>
        prev ? { ...prev, status: newStatus, admin_message: message, agent: agent !== null ? agent : prev.agent } : null
      );
    } catch {
      // Error handled
      alert("Failed to update status");
    }
  };

  // --- Rejection Handler ---
  const handleRejectConfirm = async () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }
    await updateStatus(rejectingStudent.raw_id, "rejected", "", null, rejectionReason.trim());
    setRejectingStudent(null);
    setRejectionReason("");
  };

  // --- Approve Handler ---
  const handleApproveConfirm = async () => {
    if (!servicePrice || isNaN(servicePrice) || Number(servicePrice) <= 0) {
      alert("Please enter a valid total service price.");
      return;
    }
    await updateStatus(approvingStudent.raw_id, "approved", "", null, null, Number(servicePrice));
    setApprovingStudent(null);
    setServicePrice("");
  };
  const stages = [
    "pending_approval",
    "pending",
    "approved",
    "document_review",
    "university_review",
    "verification",
    "processing",
    "completed",
  ];

  const total = requests.length;
  const pendingApproval = requests.filter(r => String(r.status || "").toLowerCase().trim() === "pending_approval").length;
  const pending = requests.filter(r => String(r.status || "").toLowerCase().trim() === "pending").length;
  const verified = requests.filter(r => String(r.status || "").toLowerCase().trim() === "approved").length;
  const rejected = requests.filter(r => String(r.status || "").toLowerCase().trim() === "rejected").length;

  const filtered = requests.filter(r => {
    const sTerm = (search || "").toLowerCase();
    const sFilter = (statusFilter || "All").toLowerCase();

    const matchesSearch =
      String(r.fullName || "").toLowerCase().includes(sTerm) ||
      String(r.id || "").toLowerCase().includes(sTerm);

    const matchesStatus =
      statusFilter === "All" ||
      String(r.status || "").toLowerCase().trim() === sFilter.trim();

    return matchesSearch && matchesStatus;
  });

  // --- Email Preview Logic ---
  const emailBody = replyingTo ? `Dear ${replyingTo.fullName},

We have reviewed your request, and there is an issue that requires your attention.

Issue Details:
• Type: ${issueType}
• Details: ${exactProblem}

What You Need to Do:
• Please review the issue and take the necessary action.
• Upload correct documents / complete payment / provide required information.

Best regards,
${companyName} Support Team` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  // Fix: handleSendEmail was referenced by the Reply button but never defined,
  // causing a ReferenceError that crashed the modal on render.
  const handleSendEmail = () => {
    const subject = `Regarding Your Application - ${issueType}`;
    const mailtoUrl = `mailto:${replyingTo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
  };

  // WhatsApp Integration
  const handleWhatsApp = (student) => {
    const message = `Dear ${student.fullName},

Your application (ID: ${student.id}) has been reviewed. 

Status: ${student.status || 'Pending'}
${student.admin_message ? `Message: ${student.admin_message}` : ''}

Please check your email for detailed information or contact us if you have any questions.

- ${companyName} Team`;

    const whatsappUrl = `https://wa.me/${student.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="p-6 space-y-6 bg-slate-100 min-h-screen relative font-sans">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Student Requests</h1>
          <p className="text-slate-500">Manage certificates & applications</p>
        </div>
        <button onClick={() => setIsFilterModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg">
          <div className="flex justify-between">
            <div><p className="text-sm opacity-80">Total</p><h2 className="text-3xl font-bold">{total}</h2></div>
            <Users />
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-orange-100 text-orange-700 shadow">
          <div className="flex justify-between">
            <div><p className="text-sm">Pending Approval</p><h2 className="text-3xl font-bold">{pendingApproval}</h2></div>
            <Clock />
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-yellow-100 text-yellow-700 shadow">
          <div className="flex justify-between">
            <div><p className="text-sm">Pending</p><h2 className="text-3xl font-bold">{pending}</h2></div>
            <Clock />
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-green-100 text-green-700 shadow">
          <div className="flex justify-between">
            <div><p className="text-sm">Verified</p><h2 className="text-3xl font-bold">{verified}</h2></div>
            <CheckCircle />
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-red-100 text-red-700 shadow">
          <div className="flex justify-between">
            <div><p className="text-sm">Rejected</p><h2 className="text-3xl font-bold">{rejected}</h2></div>
            <XCircle />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-xl shadow border border-slate-200 flex items-center gap-3">
        <Search className="text-gray-400" size={20} />
        <input type="text" placeholder="Search by name or ID..." className="w-full outline-none text-slate-700" onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Data Table */}
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">

          {/* TABLE HEADER */}
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Tracking ID</th>
              <th className="p-4">University</th>
              <th className="p-4">Request Type</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right pr-6">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {filtered.map((req) => (
              <tr
                key={req.id}
                className="border-t border-slate-100 hover:bg-slate-50 transition-all duration-200"
              >

                {/* STUDENT */}
                <td className="p-4">
                  <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {req.fullName?.charAt(0)}
                    </div>

                    {/* Name + Email */}
                    <div>
                      <div className="font-semibold text-slate-800">
                        {req.fullName}
                      </div>

                      <div className="text-xs text-slate-500">
                        {req.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* REQUEST ID */}
                <td className="p-4">
                  <span className="font-medium text-slate-700">
                    {req.id}
                  </span>
                </td>

                {/* UNIVERSITY */}
                <td className="p-4 text-slate-600 font-medium">
                  {req.university}
                </td>

                {/* REQUEST TYPE */}
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                    {req.type}
                  </span>
                </td>

                {/* PHONE */}
                <td className="p-4 text-slate-600">
                  {req.phone}
                </td>

                {/* PAYMENT */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${req.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {req.payment}
                  </span>
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      String(req.status || "").toLowerCase().trim() === "approved"
                        ? "bg-green-100 text-green-700"
                        : String(req.status || "").toLowerCase().trim() === "pending_approval"
                          ? "bg-orange-100 text-orange-700"
                          : String(req.status || "").toLowerCase().trim() === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : String(req.status || "").toLowerCase().trim() === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {req.status === "pending_approval" ? "Pending Approval" : req.status || "Pending"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-4 text-right pr-6">
                  <div className="flex justify-end gap-2">

                    {/* WHATSAPP */}
                    <button
                      onClick={() => handleWhatsApp(req)}
                      className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition"
                      title="WhatsApp"
                    >
                      <FaWhatsapp size={18} />
                    </button>
                    {/* REPLY */}
                    <button
                      onClick={() => setReplyingTo(req)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                    >
                      Reply
                    </button>

                    {/* VIEW */}
                    <button
                      onClick={() => setSelectedStudent(req)}
                      className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      <Eye size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- FILTER POPUP MODAL --- */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden border border-white/20">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-slate-800">Filter Requests</h2>
                <button onClick={() => setIsFilterModalOpen(false)} className="hover:bg-slate-100 p-1 rounded-full transition"><X size={20} /></button>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {["All", "Pending Approval", "Pending", "Approved", "Rejected"].map((status) => (
                    <button key={status} onClick={() => setStatusFilter(status === "Pending Approval" ? "pending_approval" : status)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${statusFilter === (status === "Pending Approval" ? "pending_approval" : status) ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setIsFilterModalOpen(false)} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold mt-4">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* --- NEW: REPLY / ISSUE MESSAGE MODAL --- */}
      {replyingTo && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <div className="flex-1 p-8 space-y-6 overflow-y-auto border-r border-slate-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Mail className="text-blue-600" /> Issue Notification</h2>
                <button onClick={() => setReplyingTo(null)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={24} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Recipient</label>
                  <div className="p-3 bg-slate-50 border rounded-xl font-bold text-slate-700 mt-1">{replyingTo.fullName} ({replyingTo.email})</div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Issue Category</label>
                  <select className="w-full border rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={issueType} onChange={(e) => setIssueType(e.target.value)}>
                    <option>Document Issue</option>
                    <option>Payment Issue</option>
                    <option>Missing Information</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Exact Problem Description</label>
                  <textarea rows="4" className="w-full border rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500" value={exactProblem} onChange={(e) => setExactProblem(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-[350px] bg-slate-50 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700">Preview</h3>
                <button onClick={handleCopy} className={`flex items-center gap-1 text-xs px-3 py-1 rounded-lg transition ${copied ? 'bg-green-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-100'}`}>
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-600 whitespace-pre-wrap flex-1 italic overflow-y-auto">
                {emailBody}
              </div>
              <button onClick={handleSendEmail} className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl transition">
                <Send size={18} /> Send Notification
              </button>
              <div className="mt-4 p-3 bg-amber-50 rounded-xl flex gap-2 border border-amber-100">
                <AlertCircle className="text-amber-500 shrink-0" size={16} />
                <p className="text-[10px] text-amber-800 leading-tight">Notification will open in your mail app.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:row max-h-[90vh]">
            <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">

              {/* Left Column: Details */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 border-r border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Request Detail View</h2>
                  <button onClick={() => setSelectedStudent(null)} className="md:hidden p-1 rounded-full hover:bg-slate-100"><X size={24} /></button>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                      {String(selectedStudent.fullName || "?").charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{selectedStudent.fullName || "N/A"}</h3>
                      <div className="flex flex-col gap-1 text-xs text-slate-500 mt-1 font-medium">
                        <span className="flex items-center gap-1"><Mail size={12} /> {selectedStudent.email}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {selectedStudent.district}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border flex items-center gap-3 min-w-[180px] ${selectedStudent.payment === "Paid" ? "bg-green-50 border-green-100" : "bg-yellow-50 border-yellow-100"
                    }`}>
                    <div className={`p-2 rounded-xl ${selectedStudent.payment === "Paid" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Payment</p>
                      <p className={`text-sm font-bold ${selectedStudent.payment === "Paid" ? "text-green-700" : "text-yellow-700"}`}>
                        {selectedStudent.payment}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Documents List */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-l-4 border-blue-600 pl-2">Uploaded Documents</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedStudent.documentsList?.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-xl text-blue-600 border border-slate-100"><FileCheck size={18} /></div>
                          <div>
                            <p className="text-xs font-bold text-slate-700">{doc.name}</p>
                            <p className="text-[10px] font-bold uppercase text-green-600">{doc.status}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setCurrentDocIndex(index);
                              setViewerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                            window.open(downloadDocument(doc.id));
                            }}
                            className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agent Assignment Panel */}
                <AgentAssignmentPanel application={selectedStudent} />

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-100">

                  {/* Action Buttons Row */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setApprovingStudent(selectedStudent);
                        setServicePrice("");
                      }}
                      disabled={selectedStudent.status === "approved"}
                      className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition
        ${selectedStudent.status === "approved"
                          ? "bg-green-200 text-green-800 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>

                    <button
                      onClick={() => {
                        setRejectingStudent(selectedStudent);
                        setRejectionReason("");
                      }}
                      disabled={selectedStudent.status === "rejected"}
                      className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition
        ${selectedStudent.status === "rejected"
                          ? "bg-red-200 text-red-800 cursor-not-allowed"
                          : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
                        }`}
                    >
                      <XCircle size={18} />
                      Reject
                    </button>

                    <button
                      onClick={() => {
                        setReplyingTo(selectedStudent);
                        setIssueType('Document Issue');
                        setExactProblem('');
                      }}
                      disabled={selectedStudent.status === "changes_requested"}
                      className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition
        ${selectedStudent.status === "changes_requested"
                          ? "bg-yellow-200 text-yellow-800 cursor-not-allowed"
                          : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-100"
                        }`}
                    >
                      <AlertCircle size={18} />
                      Request Changes
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Tracking */}
              <div className="w-full md:w-[350px] bg-slate-50 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Truck className="text-blue-600" /> Tracking Detail
                  </h3>
                  <button onClick={() => setSelectedStudent(null)} className="hidden md:block p-1 rounded-full hover:bg-slate-200 transition"><X size={20} /></button>
                </div>

                <div className="relative space-y-6">
                  {/* Vertical connecting line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-200 z-0"></div>
                  
                  {selectedStudent.trackingHistory?.map((item, index) => {
                    const isCompleted = item.status === 'completed';
                    const isCurrent = item.status === 'current';
                    const isUpcoming = item.status === 'upcoming';
                    const isFailed = item.status === 'failed';

                    return (
                      <div key={index} className="relative pl-12">
                        {/* Dot / Icon */}
                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors ${
                          isCompleted ? 'bg-green-500 border-green-500 text-white shadow-sm' :
                          isFailed ? 'bg-red-500 border-red-500 text-white shadow-sm' :
                          isCurrent ? 'bg-white border-blue-500 text-blue-500 shadow-md ring-4 ring-blue-50' :
                          'bg-white border-slate-200 text-slate-300'
                        }`}>
                          {isCompleted ? <CheckCircle2 size={16} strokeWidth={3} /> :
                           isFailed ? <X size={14} strokeWidth={3} /> :
                           <Circle size={10} fill="currentColor" />}
                        </div>
                        
                        {/* Content */}
                        <div className={`flex flex-col pt-1 ${isUpcoming ? 'opacity-50' : ''}`}>
                          <span className={`text-[15px] font-bold ${
                            isCompleted ? 'text-slate-800' : 
                            isCurrent ? 'text-blue-700' : 
                            'text-slate-500'
                          }`}>
                            {item.step}
                          </span>
                          {item.time && (
                            <span className="text-xs font-medium text-slate-500 mt-1">
                              {item.time}
                            </span>
                          )}
                          {isCurrent && (
                            <p className="text-xs text-blue-600 mt-1.5 font-medium bg-blue-50 inline-block px-2 py-1 rounded-md w-fit">
                              In Progress
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 bg-blue-600/5 p-4 rounded-2xl border border-blue-200">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Assigned Agent</p>
                  <p className="text-sm font-bold text-slate-700">{selectedStudent.assigned}</p>
                  <p className="text-xs text-slate-500 mt-1">Delivery via: {selectedStudent.delivery}</p>
                </div>

                {/* ─── AGENT ASSIGNMENT PANEL (only when approved + paid) ─── */}
                {selectedStudent.status === "approved" &&
                  selectedStudent.payment === "Paid" && (
                  <AgentAssignmentPanel application={selectedStudent} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- REJECTION REASON MODAL --- */}
      {rejectingStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                  <XCircle size={22} /> Reject Application
                </h2>
                <button
                  onClick={() => { setRejectingStudent(null); setRejectionReason(""); }}
                  className="hover:bg-slate-100 p-1 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-1">
                  Rejecting application for <strong>{rejectingStudent.fullName}</strong> ({rejectingStudent.id})
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Rejection Reason <span className="text-red-500">*</span></label>
                <textarea
                  rows="4"
                  className="w-full border rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-red-400 text-sm"
                  placeholder="Enter the reason for rejecting this application (mandatory)..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                {!rejectionReason.trim() && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> Rejection reason is required
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setRejectingStudent(null); setRejectionReason(""); }}
                  className="flex-1 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectConfirm}
                  disabled={!rejectionReason.trim()}
                  className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                    rejectionReason.trim()
                      ? "bg-red-600 text-white hover:bg-red-700 shadow-lg"
                      : "bg-red-200 text-red-400 cursor-not-allowed"
                  }`}
                >
                  <XCircle size={18} /> Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* --- APPROVING PRICING MODAL --- */}
      {approvingStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-green-600 flex items-center gap-2">
                  <CheckCircle size={22} /> Approve Application
                </h2>
                <button
                  onClick={() => { setApprovingStudent(null); setServicePrice(""); }}
                  className="hover:bg-slate-100 p-1 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-1">
                  Approving application for <strong>{approvingStudent.fullName}</strong> ({approvingStudent.id})
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Total Service Price (₹) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-green-400 text-sm"
                  placeholder="e.g. 500 (Base + Urgency + Travel)"
                  value={servicePrice}
                  onChange={(e) => setServicePrice(e.target.value)}
                />
                <p className="text-[10px] text-slate-400 mt-1 ml-1">
                  This amount will be requested from the student for payment.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setApprovingStudent(null); setServicePrice(""); }}
                  className="flex-1 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApproveConfirm}
                  disabled={!servicePrice || Number(servicePrice) <= 0}
                  className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                    servicePrice && Number(servicePrice) > 0
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                      : "bg-green-200 text-green-400 cursor-not-allowed"
                  }`}
                >
                  <CheckCircle size={18} /> Confirm Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- REQUEST CHANGES MODAL --- */}
      {replyingTo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-yellow-600 flex items-center gap-2">
                  <AlertCircle size={22} /> Request Changes
                </h2>
                <button
                  onClick={() => { setReplyingTo(null); setExactProblem(""); }}
                  className="hover:bg-slate-100 p-1 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-1">
                  Requesting changes for <strong>{replyingTo.fullName}</strong> ({replyingTo.id})
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Issue Details <span className="text-red-500">*</span></label>
                <textarea
                  rows="4"
                  className="w-full border rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  placeholder="Explain exactly what needs to be fixed..."
                  value={exactProblem}
                  onChange={(e) => setExactProblem(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setReplyingTo(null); setExactProblem(""); }}
                  className="flex-1 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestChanges}
                  disabled={!exactProblem.trim()}
                  className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                    exactProblem.trim()
                      ? "bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg"
                      : "bg-yellow-200 text-white cursor-not-allowed"
                  }`}
                >
                  <Send size={18} /> Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewerOpen && selectedStudent?.documentsList?.length > 0 && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col">

            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold">
                {selectedStudent.documentsList[currentDocIndex]?.name}
              </h2>

              <button
                onClick={() => setViewerOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>



            <div className="relative flex-1 bg-slate-100">

              {/* Previous Arrow */}
              {currentDocIndex > 0 && (
                <button
                  onClick={() => setCurrentDocIndex(currentDocIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 text-white text-2xl hover:bg-black/80"
                >
                  ‹
                </button>
              )}

              {/* Document */}
              <img
                src={selectedStudent.documentsList[currentDocIndex]?.url}
                alt="Document"
                className="w-full h-full object-contain"
              />

              {/* Next Arrow */}
              {currentDocIndex <
                selectedStudent.documentsList.length - 1 && (
                  <button
                    onClick={() => setCurrentDocIndex(currentDocIndex + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 text-white text-2xl hover:bg-black/80"
                  >
                    ›
                  </button>
                )}

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                {currentDocIndex + 1} / {selectedStudent.documentsList.length}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>


  );
};

export default StudentRequests;

/* Mobile Responsiveness Styles */
const mobileStyles = `
@media (max-width: 1024px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  
  .overflow-x-auto {
    overflow-x: auto !important;
  }
}

@media (max-width: 768px) {
  .p-6 {
    padding: 1rem !important;
  }
  
  .space-y-6 {
    gap: 1rem !important;
  }
  
  .grid-cols-4, .grid-cols-2 {
    grid-template-columns: 1fr !important;
  }
  
  .text-3xl {
    font-size: 1.5rem !important;
  }
  
  .text-sm {
    font-size: 0.75rem !important;
  }
  
  .space-x-2 > * {
    margin-right: 0.25rem !important;
  }
  
  .p-4 {
    padding: 0.5rem !important;
  }
  
  .px-3 {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  
  .py-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  
  .gap-5 {
    gap: 0.75rem !important;
  }
  
  .gap-6 {
    gap: 1rem !important;
  }
}

@media (max-width: 480px) {
  .p-6 {
    padding: 0.75rem !important;
  }
  
  .text-3xl {
    font-size: 1.25rem !important;
  }
  
  .text-sm {
    font-size: 0.7rem !important;
  }
  
  .space-x-2 {
    gap: 0.125rem !important;
  }
  
  .px-3 {
    padding-left: 0.25rem !important;
    padding-right: 0.25rem !important;
  }
  
  .gap-2 {
    gap: 0.5rem !important;
  }
  
  .table {
    font-size: 0.6rem !important;
  }
  
  .p-4 {
    padding: 0.25rem !important;
  }
  
  .text-xs {
    font-size: 0.6rem !important;
  }
  
  .text-lg {
    font-size: 1rem !important;
  }
}
`;

// Inject mobile styles into the document
if (typeof window !== 'undefined') {
  const styleId = 'student-requests-mobile-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = mobileStyles;
    document.head.appendChild(style);
  }
}