import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getMyAssignments } from "../../services/api";
import {
  Clock, CheckCircle2, XCircle, FileSearch, Loader2,
  MapPin, Phone, Building2, ChevronRight, AlertTriangle
} from "lucide-react";

const STATUS_CONFIG = {
  ASSIGNED_TO_AGENT: { label: "Pending Acceptance", color: "bg-yellow-100 text-yellow-700", icon: <Clock size={14} /> },
  ACCEPTED: { label: "Accepted", color: "bg-blue-100 text-blue-700", icon: <CheckCircle2 size={14} /> },
  IN_PROGRESS: { label: "In Progress", color: "bg-indigo-100 text-indigo-700", icon: <Loader2 size={14} /> },
  DOCUMENTS_COLLECTED: { label: "Docs Collected", color: "bg-cyan-100 text-cyan-700", icon: <FileSearch size={14} /> },
  SUBMITTED_TO_UNIVERSITY: { label: "At University", color: "bg-purple-100 text-purple-700", icon: <Building2 size={14} /> },
  APPROVED: { label: "Univ. Approved", color: "bg-emerald-100 text-emerald-700", icon: <CheckCircle2 size={14} /> },
  REJECTED_BY_UNIVERSITY: { label: "Univ. Rejected", color: "bg-red-100 text-red-700", icon: <XCircle size={14} /> },
  ADDITIONAL_DOC_REQUIRED: { label: "Docs Needed", color: "bg-orange-100 text-orange-700", icon: <AlertTriangle size={14} /> },
  COMPLETED: { label: "Completed", color: "bg-green-100 text-green-700", icon: <CheckCircle2 size={14} /> },
  REJECTED_BY_AGENT: { label: "Rejected", color: "bg-red-100 text-red-700", icon: <XCircle size={14} /> },
  DELIVERY_ASSIGNED: { label: "Delivery Assigned", color: "bg-teal-100 text-teal-700", icon: <CheckCircle2 size={14} /> },
  PICKED_UP: { label: "Picked Up", color: "bg-blue-100 text-blue-700", icon: <CheckCircle2 size={14} /> },
  OUT_FOR_DELIVERY: { label: "Out for Delivery", color: "bg-yellow-100 text-yellow-700", icon: <CheckCircle2 size={14} /> },
  DELIVERED: { label: "Delivered", color: "bg-green-100 text-green-700", icon: <CheckCircle2 size={14} /> },
};

export default function AgentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active");

  const agentStr = localStorage.getItem("agent");
  let agent = null;
  try { agent = agentStr ? JSON.parse(agentStr) : null; } catch {}
  const agentId = agent?.id;

  const fetchData = useCallback(async () => {
    if (!agentId) return;
    setLoading(true);
    try {
      const res = await getMyAssignments(agentId);
      if (res.ok) setAssignments(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = assignments.filter((a) => {
    if (filter === "pending") return a.status === "ASSIGNED_TO_AGENT";
    if (filter === "active") return !["COMPLETED", "REJECTED_BY_AGENT"].includes(a.status);
    if (filter === "completed") return a.status === "COMPLETED";
    return true;
  });

  const pending = assignments.filter((a) => a.status === "ASSIGNED_TO_AGENT").length;
  const active = assignments.filter((a) => !["COMPLETED", "REJECTED_BY_AGENT", "ASSIGNED_TO_AGENT"].includes(a.status)).length;
  const completed = assignments.filter((a) => a.status === "COMPLETED").length;
  const rejected = assignments.filter((a) => a.status === "REJECTED_BY_AGENT").length;
  const visits = assignments.filter((a) => ["DOCUMENTS_COLLECTED", "SUBMITTED_TO_UNIVERSITY"].includes(a.status)).length;

  // Generate dynamic notifications
  const notifications = [];
  assignments.forEach(a => {
    if (a.status === "ASSIGNED_TO_AGENT") {
      notifications.push({ id: `notif-${a.id}-assigned`, msg: `New assignment waiting: ${a.application_display_id}`, date: new Date(a.assigned_at || Date.now()), type: 'new' });
    }
    if (a.status === "REJECTED_BY_AGENT") {
      notifications.push({ id: `notif-${a.id}-rejected`, msg: `You rejected assignment ${a.application_display_id}`, date: new Date(a.completed_at || Date.now()), type: 'rejected' });
    }
    if (a.status === "ACCEPTED") {
      notifications.push({ id: `notif-${a.id}-accepted`, msg: `You accepted ${a.application_display_id}. Please start progress.`, date: new Date(a.accepted_at || Date.now()), type: 'info' });
    }
  });
  // Sort latest first and take top 4
  notifications.sort((a, b) => b.date - a.date);
  const topNotifications = notifications.slice(0, 4);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Good day, {agent?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">Here are your current assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-600">{pending}</p>
          <p className="text-xs text-yellow-500 font-semibold mt-1">Pending Acceptance</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{active}</p>
          <p className="text-xs text-blue-500 font-semibold mt-1">In Progress</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{visits}</p>
          <p className="text-xs text-purple-500 font-semibold mt-1">Today's Visits</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{completed}</p>
          <p className="text-xs text-green-500 font-semibold mt-1">Completed</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-red-600">{rejected}</p>
          <p className="text-xs text-red-500 font-semibold mt-1">Rejected</p>
        </div>
      </div>

      {/* Notifications Block */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <Clock size={16} className="text-slate-500" /> Recent Activity & Notifications
        </h3>
        {topNotifications.length > 0 ? (
          <div className="space-y-2">
            {topNotifications.map(n => (
              <div key={n.id} className="text-sm flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  n.type === 'new' ? 'bg-blue-500 animate-pulse' :
                  n.type === 'rejected' ? 'bg-red-500' : 'bg-indigo-500'
                }`}></span>
                <div className="flex-1">
                  <p className="text-slate-700">{n.msg}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{n.date.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No recent activity.</p>
        )}
      </div>

      {/* Alert for pending */}
      {pending > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-5 py-4 flex items-center gap-3">
          <AlertTriangle className="text-yellow-500 flex-shrink-0" size={20} />
          <p className="text-sm text-yellow-700 font-medium">
            You have <strong>{pending} pending</strong> assignment{pending > 1 ? "s" : ""} waiting for your acceptance.
          </p>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "active", label: "Active" },
          { key: "pending", label: "Needs Acceptance" },
          { key: "completed", label: "Completed" },
          { key: "all", label: "All" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              filter === tab.key
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <Loader2 size={32} className="mx-auto animate-spin mb-3" />
          <p>Loading assignments...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <FileSearch size={40} className="mx-auto mb-3 opacity-30" />
          <p>No assignments in this category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => {
            const cfg = STATUS_CONFIG[a.status] || { label: a.status, color: "bg-slate-100 text-slate-600" };
            return (
              <Link
                key={a.id}
                to={`/agent/requests/${a.id}`}
                className="block bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-slate-800">{a.application_display_id}</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.color}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                      {a.status === "ASSIGNED_TO_AGENT" && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                          Action Required
                        </span>
                      )}
                    </div>
                    <p className="text-base font-semibold text-slate-700">{a.applicant_name}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1"><Phone size={11} />{a.phone}</span>
                      <span className="flex items-center gap-1"><Building2 size={11} />{a.university || "—"}</span>
                      <span className="flex items-center gap-1 capitalize">{a.requirement}</span>
                    </div>
                    {a.progress_note && (
                      <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-100">
                        📝 {a.progress_note}
                      </p>
                    )}
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
