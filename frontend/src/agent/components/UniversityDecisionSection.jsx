import React, { useState } from "react";
import { submitUniversityDecision } from "../../services/api";
import { Loader2, CheckCircle2, XCircle, FileText, Upload, Calendar } from "lucide-react";

export default function UniversityDecisionSection({ agentId, assignmentId, onDecisionSaved }) {
  const [decision, setDecision] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", isError: false });

  // Fields
  const [officerName, setOfficerName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionLetter, setRejectionLetter] = useState(null);
  const [requiredDocs, setRequiredDocs] = useState("");
  const [deadline, setDeadline] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [acceptanceDate, setAcceptanceDate] = useState("");

  const handleSubmit = async () => {
    if (!decision) {
      setMsg({ text: "Please select a decision first", isError: true });
      return;
    }
    
    setSaving(true);
    setMsg({ text: "", isError: false });

    const formData = new FormData();
    formData.append("decision", decision);
    formData.append("officer_name", officerName);
    formData.append("remarks", remarks);

    if (decision === "REJECTED") {
      formData.append("rejection_reason", rejectionReason);
      if (rejectionLetter) formData.append("rejection_letter", rejectionLetter);
    } else if (decision === "ADDITIONAL_DOCS") {
      formData.append("required_documents", requiredDocs);
      formData.append("deadline", deadline);
    } else if (decision === "APPROVED") {
      formData.append("university_reference_number", refNumber);
      formData.append("acceptance_date", acceptanceDate);
    }

    try {
      const res = await submitUniversityDecision(agentId, assignmentId, formData);
      if (res.ok) {
        setMsg({ text: "Decision saved successfully!", isError: false });
        if (onDecisionSaved) onDecisionSaved();
      } else {
        setMsg({ text: res.data?.error || "Failed to save decision", isError: true });
      }
    } catch (e) {
      setMsg({ text: "Network error", isError: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
      <h3 className="font-black text-slate-800 flex items-center gap-2">
        🏛️ University Decision
      </h3>

      {msg.text && (
        <div className={`p-3 rounded-xl text-sm font-semibold border ${msg.isError ? "bg-red-50 text-red-600 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
          {msg.text}
        </div>
      )}

      {/* Decision Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setDecision("APPROVED")}
          className={`flex items-center justify-center gap-2 py-3 font-bold rounded-xl border transition ${
            decision === "APPROVED" ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-600/20" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <CheckCircle2 size={18} /> Approved
        </button>
        <button
          onClick={() => setDecision("ADDITIONAL_DOCS")}
          className={`flex items-center justify-center gap-2 py-3 font-bold rounded-xl border transition ${
            decision === "ADDITIONAL_DOCS" ? "bg-yellow-500 text-white border-yellow-500 shadow-md shadow-yellow-500/20" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <FileText size={18} /> Needs Docs
        </button>
        <button
          onClick={() => setDecision("REJECTED")}
          className={`flex items-center justify-center gap-2 py-3 font-bold rounded-xl border transition ${
            decision === "REJECTED" ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <XCircle size={18} /> Rejected
        </button>
      </div>

      {/* Conditional Forms */}
      {decision && (
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {decision === "REJECTED" && (
              <>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Rejection Reason</label>
                  <select 
                    value={rejectionReason} 
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="">Select Reason...</option>
                    <option value="Student Record Not Found">Student Record Not Found</option>
                    <option value="Incomplete Documents">Incomplete Documents</option>
                    <option value="Name Mismatch">Name Mismatch</option>
                    <option value="Pending University Fees">Pending University Fees</option>
                    <option value="Authorization Letter Missing">Authorization Letter Missing</option>
                    <option value="Duplicate Request">Duplicate Request</option>
                    <option value="University Policy Restriction">University Policy Restriction</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Rejection Letter (Optional)</label>
                  <div className="mt-1 flex items-center gap-3">
                    <input type="file" id="rejection_letter" className="hidden" onChange={(e) => setRejectionLetter(e.target.files[0])} accept="image/*,application/pdf" />
                    <label htmlFor="rejection_letter" className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-200 transition">
                      <Upload size={16} /> {rejectionLetter ? rejectionLetter.name : "Upload File"}
                    </label>
                  </div>
                </div>
              </>
            )}

            {decision === "ADDITIONAL_DOCS" && (
              <>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Required Documents</label>
                  <textarea 
                    value={requiredDocs} 
                    onChange={(e) => setRequiredDocs(e.target.value)}
                    placeholder="List the exact documents needed..."
                    rows={2}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Calendar size={12}/> Deadline</label>
                  <input 
                    type="date" 
                    value={deadline} 
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </>
            )}

            {decision === "APPROVED" && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">University Reference Number</label>
                  <input 
                    type="text" 
                    value={refNumber} 
                    onChange={(e) => setRefNumber(e.target.value)}
                    placeholder="e.g. REF-1234"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Calendar size={12}/> Acceptance Date</label>
                  <input 
                    type="date" 
                    value={acceptanceDate} 
                    onChange={(e) => setAcceptanceDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </>
            )}

            <div className="sm:col-span-2 mt-2 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Officer Name</label>
                <input 
                  type="text" 
                  value={officerName} 
                  onChange={(e) => setOfficerName(e.target.value)}
                  placeholder="Officer handled the request"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Detailed Remarks</label>
                <textarea 
                  value={remarks} 
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Any extra notes..."
                  rows={2}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full flex justify-center items-center gap-2 py-3 bg-slate-800 text-white font-black rounded-xl hover:bg-slate-900 transition mt-4 disabled:opacity-50 shadow"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : "Submit Final Decision"}
          </button>
        </div>
      )}
    </div>
  );
}
