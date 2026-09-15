import React, { useState, useEffect } from "react";
import { saveVisitDetails, getVisitDetails, uploadVisitPhoto } from "../../services/api";
import { CheckSquare, Square, Save, Upload, Loader2, IndianRupee, Image as ImageIcon } from "lucide-react";

export default function UniversityVisitSection({ agentId, assignmentId, onVisitSaved }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", isError: false });

  const [visit, setVisit] = useState({
    visit_date: "",
    visit_time: "",
    department: "",
    officer_name: "",
    university_reference_number: "",
    remarks: "",
    university_fee_paid: false,
    university_fee_amount: "",
    chk_verified_student_info: false,
    chk_submitted_application: false,
    chk_verified_documents: false,
    chk_met_officials: false,
    chk_submitted_forms: false,
    chk_paid_fees: false,
    chk_recorded_reference_number: false,
    photos: []
  });

  const [photoUpload, setPhotoUpload] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const res = await getVisitDetails(agentId, assignmentId);
        if (res.ok && res.data?.visit) {
          setVisit(prev => ({ ...prev, ...res.data.visit }));
        }
      } catch (e) {
        console.error("Failed to load visit details", e);
      } finally {
        setLoading(false);
      }
    };
    fetchVisit();
  }, [agentId, assignmentId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVisit(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg({ text: "", isError: false });
    try {
      const res = await saveVisitDetails(agentId, assignmentId, visit);
      if (res.ok) {
        setMsg({ text: "Visit details saved successfully!", isError: false });
        if (res.data?.visit) {
          setVisit(prev => ({ ...prev, ...res.data.visit }));
        }
        if (onVisitSaved) onVisitSaved();
        setTimeout(() => setMsg({ text: "", isError: false }), 3000);
      } else {
        setMsg({ text: res.data?.error || "Failed to save", isError: true });
      }
    } catch (e) {
      setMsg({ text: "Network error", isError: true });
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    setMsg({ text: "", isError: false });
    try {
      const res = await uploadVisitPhoto(agentId, assignmentId, file);
      if (res.ok && res.data) {
        setVisit(prev => ({
          ...prev,
          photos: [...(prev.photos || []), { id: res.data.photo_id, url: res.data.photo_url }]
        }));
        setMsg({ text: "Photo uploaded!", isError: false });
        setTimeout(() => setMsg({ text: "", isError: false }), 3000);
      } else {
        setMsg({ text: res.data?.error || "Failed to upload photo", isError: true });
      }
    } catch (err) {
      setMsg({ text: "Network error during upload", isError: true });
    } finally {
      setUploadingPhoto(false);
      e.target.value = null; // Reset input
    }
  };

  if (loading) return <div className="p-6 flex justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;

  const checklistItems = [
    { name: "chk_verified_student_info", label: "Verify Student Information" },
    { name: "chk_submitted_application", label: "Submit Application to University" },
    { name: "chk_verified_documents", label: "Verify Supporting Documents" },
    { name: "chk_met_officials", label: "Meet University Officials" },
    { name: "chk_submitted_forms", label: "Submit Required Forms" },
    { name: "chk_paid_fees", label: "Pay University Fees (If Applicable)" },
    { name: "chk_recorded_reference_number", label: "Record University Reference Number" },
  ];

  return (
    <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-indigo-900 flex items-center gap-2">
          🏛️ University Visit Verification
        </h3>
      </div>

      {msg.text && (
        <div className={`p-3 rounded-lg text-sm font-semibold border ${msg.isError ? "bg-red-50 text-red-600 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
          {msg.text}
        </div>
      )}

      {/* Checklist */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-indigo-50">
        <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Verification Checklist</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {checklistItems.map(item => (
            <label key={item.name} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                name={item.name}
                checked={visit[item.name] || false}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className={`text-sm ${visit[item.name] ? "text-slate-800 font-semibold" : "text-slate-600"}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Visit Details */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-indigo-50 space-y-4">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Visit Details</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Visit Date</label>
            <input type="date" name="visit_date" value={visit.visit_date || ""} onChange={handleChange} 
              className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Visit Time</label>
            <input type="time" name="visit_time" value={visit.visit_time || ""} onChange={handleChange} 
              className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
            <input type="text" name="department" value={visit.department || ""} onChange={handleChange} placeholder="e.g. Examination Branch"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Officer Name</label>
            <input type="text" name="officer_name" value={visit.officer_name || ""} onChange={handleChange} placeholder="e.g. Mr. Sharma"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">University Reference Number</label>
            <input type="text" name="university_reference_number" value={visit.university_reference_number || ""} onChange={handleChange} placeholder="e.g. UNIV/2026/001"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
        </div>

        {/* Fees */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <input type="checkbox" name="university_fee_paid" checked={visit.university_fee_paid || false} onChange={handleChange} 
              className="w-4 h-4 text-indigo-600 rounded" />
            <span className="text-sm font-bold text-slate-800">University Fees Paid?</span>
          </label>
          {visit.university_fee_paid && (
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Fee Amount</label>
              <div className="relative mt-1">
                <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="number" step="0.01" name="university_fee_amount" value={visit.university_fee_amount || ""} onChange={handleChange} placeholder="0.00"
                  className="w-full pl-8 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Remarks / Notes</label>
          <textarea name="remarks" value={visit.remarks || ""} onChange={handleChange} rows={2} placeholder="Any additional notes..."
            className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400 resize-none" />
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-indigo-50">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Visit Photos</h4>
          <div>
            <input type="file" accept="image/*" id="visit_photo" className="hidden" onChange={handlePhotoUpload} disabled={uploadingPhoto} />
            <label htmlFor="visit_photo" className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition ${uploadingPhoto ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}>
              {uploadingPhoto ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              Upload Photo
            </label>
          </div>
        </div>
        
        {visit.photos && visit.photos.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {visit.photos.map(p => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="block w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 hover:border-indigo-400 transition relative group">
                <img src={p.url} alt="Visit" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <ImageIcon size={16} className="text-white" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No photos uploaded yet.</p>
        )}
      </div>

      {/* Save Button */}
      <button 
        onClick={handleSave} 
        disabled={saving}
        className="w-full flex justify-center items-center gap-2 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 shadow-md"
      >
        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        Save Visit Details
      </button>

    </div>
  );
}
