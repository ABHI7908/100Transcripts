import React, { useState, useEffect, useCallback } from "react";
import {
  Users, Plus, X, Edit2, Trash2, ToggleLeft, ToggleRight,
  Search, MapPin, Briefcase, Phone, Mail, Shield, CheckCircle, XCircle
} from "lucide-react";
import {
  getAgents, createAgent, updateAgent, deleteAgent, toggleAgent
} from "../../services/api";

const EMPTY_FORM = {
  name: "", employee_id: "", mobile: "", email: "",
  password: "", is_active: true, location: "", experience: 0,
};

const statusBadge = (active) =>
  active
    ? <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Active</span>
    : <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">Inactive</span>;

export default function AgentsManagement() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAgents();
      if (res.ok) setAgents(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAgents(); }, [fetchAgents]);

  const openAdd = () => {
    setEditingAgent(null);
    setForm(EMPTY_FORM);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (agent) => {
    setEditingAgent(agent);
    setForm({ ...agent, password: "" }); // don't pre-fill password
    setError("");
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form };
      if (editingAgent && !payload.password) delete payload.password;

      const res = editingAgent
        ? await updateAgent(editingAgent.id, payload)
        : await createAgent(payload);

      if (res.ok) {
        setModalOpen(false);
        fetchAgents();
      } else {
        setError(res.data?.error || "Failed to save agent");
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (agent) => {
    if (!window.confirm(`Delete agent "${agent.name}"? This cannot be undone.`)) return;
    await deleteAgent(agent.id);
    fetchAgents();
  };

  const handleToggle = async (agent) => {
    await toggleAgent(agent.id);
    fetchAgents();
  };

  const filtered = agents.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.employee_id.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" && a.is_active) ||
      (filterStatus === "Inactive" && !a.is_active);
    return matchSearch && matchStatus;
  });

  const totalActive = agents.filter((a) => a.is_active).length;
  const totalInactive = agents.filter((a) => !a.is_active).length;

  return (
    <div className="p-6 space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-blue-600" size={28} /> Agent Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage field agents for certificate processing</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow transition"
        >
          <Plus size={18} /> Add Agent
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow border border-slate-100">
          <p className="text-sm text-slate-500">Total Agents</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{agents.length}</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-5 shadow border border-green-100">
          <p className="text-sm text-green-600">Active</p>
          <p className="text-3xl font-bold text-green-700 mt-1">{totalActive}</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-5 shadow border border-red-100">
          <p className="text-sm text-red-600">Inactive</p>
          <p className="text-3xl font-bold text-red-700 mt-1">{totalInactive}</p>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search by name, ID or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Inactive"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                filterStatus === s
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading agents...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>No agents found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Agent", "Emp ID", "Contact", "Location", "Exp", "Workload", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                          {a.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{a.name}</p>
                          <p className="text-xs text-slate-400">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 font-mono">{a.employee_id}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-600 flex items-center gap-1"><Phone size={12} />{a.mobile}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-600 flex items-center gap-1"><MapPin size={12} />{a.location || "—"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-600">{a.experience} yr{a.experience !== 1 ? "s" : ""}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        a.current_workload === 0 ? "bg-green-100 text-green-700" :
                        a.current_workload <= 3 ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {a.current_workload} active
                      </span>
                    </td>
                    <td className="px-4 py-3">{statusBadge(a.is_active)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(a)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleToggle(a)}
                          className={`p-1.5 rounded-lg transition ${
                            a.is_active ? "hover:bg-orange-50 text-orange-500" : "hover:bg-green-50 text-green-600"
                          }`}
                          title={a.is_active ? "Deactivate" : "Activate"}
                        >
                          {a.is_active ? <ToggleLeft size={18} /> : <ToggleRight size={18} />}
                        </button>
                        <button
                          onClick={() => handleDelete(a)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                {editingAgent ? "Edit Agent" : "Add New Agent"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-2 text-sm">{error}</div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Full Name *</label>
                  <input
                    required className="w-full border rounded-xl p-2.5 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Employee ID *</label>
                  <input
                    required disabled={!!editingAgent}
                    className="w-full border rounded-xl p-2.5 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-slate-50"
                    value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Mobile *</label>
                  <input
                    required className="w-full border rounded-xl p-2.5 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Email *</label>
                  <input
                    required type="email"
                    className="w-full border rounded-xl p-2.5 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Password {editingAgent ? "(leave blank to keep)" : "*"}
                  </label>
                  <input
                    type="password" required={!editingAgent}
                    className="w-full border rounded-xl p-2.5 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Experience (Years)</label>
                  <input
                    type="number" min={0}
                    className="w-full border rounded-xl p-2.5 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.experience} onChange={(e) => setForm({ ...form, experience: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Assigned Location</label>
                  <input
                    className="w-full border rounded-xl p-2.5 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. Hyderabad, Telangana"
                    value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox" checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-semibold text-slate-700">Active (can receive assignments)</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={saving}
                  className="flex-1 py-2.5 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingAgent ? "Update Agent" : "Add Agent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
