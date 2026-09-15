import React, { useState, useEffect } from "react";
// Added Search to the imports below
import { School, MapPin, Mail, Edit, Plus, X, Save, Search } from 'lucide-react';
import {
  getAllColleges,
  addCollege,
  getCollegeCertificates,
  updateCertificate,
  deleteCertificate,
  addCertificate
} from "../../services/api";

const CollegeRequest = () => {
  // ✅ 1. Added the search state (This fixes the error)
  const [search, setSearch] = useState("");

  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await getAllColleges();

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      setColleges(response.data);

    } catch (err) {
      // Error fetching colleges handled
    }
  };

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);

  const [formData, setFormData] = useState({ name: '', location: '', email: '', district: '', pincode: '', regType: 'Private' });

  // Open the price modal
  const handleEditClick = async (college) => {
    setEditingCollege({ ...college });
    setIsPriceModalOpen(true);
    await fetchCertificates(college.id);
  };

  // Save changes
  const saveUpdatedPrices = () => {
    setColleges(colleges.map(c => c.id === editingCollege.id ? editingCollege : c));
    setIsPriceModalOpen(false);
    setEditingCollege(null);
  };

  // Add new college
  // ✅ ADD COLLEGE (POST)
  const handleAddCollege = async (e) => {
    e.preventDefault();

    try {
      const response = await addCollege(formData);

      if (response.ok) {
        setColleges([...colleges, response.data]);
        setIsModalOpen(false);
        setFormData({
          name: "",
          location: "",
          email: "",
          district: "",
          pincode: "",
          regType: "Private",
        });
      } else {
        alert("Failed to add college");
      }
    } catch (err) {
      alert("Server error");
    }
  };




  const fetchCertificates = async (collegeId) => {
    try {
      const response = await getCollegeCertificates(collegeId);

      setEditingCollege(prev => ({
        ...prev,
        certificates: response.data
      }));

    } catch (err) {
      // Error fetching certificates handled
    }
  };


  const updateCertificateHandler = async (certId, updatedCert) => {
    try {
      const response = await updateCertificate(
        certId,
        updatedCert.college,
        updatedCert.name,
        updatedCert.price
      );

      if (!response.ok) throw new Error("Update failed");

      await fetchCertificates(editingCollege.id);
    } catch (err) {
      // Update error handled
    }
  };

  const deleteCertificateHandler = async (certId) => {
    try {
      const response = await deleteCertificate(certId);

      if (!response.ok) throw new Error("Delete failed");

      await fetchCertificates(editingCollege.id);
    } catch (err) {
      // Delete error handled
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">College Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add College
        </button>
      </div>

      {/* 🔍 SEARCH Section (Kept as you requested) */}
      <div className="mb-5 flex justify-between flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search partner..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select className="px-4 py-2 border rounded-lg">
          <option>All Types</option>
          <option>University</option>
          <option>College</option>
          <option>Verification</option>
        </select>
      </div>

      {/* College List Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-200">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">College Name</th>
                <th className="p-4 font-semibold text-gray-600">Location</th>
                <th className="p-4 font-semibold text-gray-600">Email Address</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* 2. Added filtering to the map so search actually works */}
              {colleges
                .filter((college) =>
                  college.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((college) => (
                  <tr key={college.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <School size={20} />
                      </div>
                      <span className="font-medium text-gray-700">{college.name}</span>
                    </td>
                    <td className="p-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        {college.location}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        {college.email}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleEditClick(college)}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition flex items-center gap-2 mx-auto"
                      >
                        <Edit size={16} /> Update Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-3 p-4">
          {colleges
            .filter((college) =>
              college.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((college) => (
              <div key={college.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <School size={20} />
                  </div>
                  <span className="font-bold text-gray-800">{college.name}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} className="text-gray-400" />
                    {college.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    {college.email}
                  </div>
                </div>
                <button
                  onClick={() => handleEditClick(college)}
                  className="w-full mt-4 bg-blue-50 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-2 font-semibold min-h-[44px]"
                >
                  <Edit size={16} /> Update Details
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* --- MODAL FOR ADDING COLLEGE --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Register New College</h2>

            <form onSubmit={handleAddCollege} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Hyderabad Institute of Technology"
                  className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Official Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="admin@college.edu.in"
                  className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rangareddy"
                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    required
                    type="number"
                    placeholder="500001"
                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City / Location</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Hyderabad"
                  className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Type</label>
                <select
                  className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={formData.regType}
                  onChange={(e) => setFormData({ ...formData, regType: e.target.value })}
                >
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                  <option value="Autonomous">Autonomous</option>
                  <option value="University">University</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg mt-4"
              >
                Save College Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {isPriceModalOpen && editingCollege && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100">

            {/* --- Header --- */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Certificate Pricing</h2>
                <p className="text-xs text-blue-600 font-semibold uppercase">{editingCollege.name}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={saveUpdatedPrices}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-lg shadow-green-100"
                >
                  Submit All
                </button>
                <button onClick={() => setIsPriceModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">

              {/* --- Manual Input Row --- */}
              <div className="bg-blue-50/50 p-5 rounded-2xl border-2 border-dashed border-blue-200 mb-6">
                <div className="grid grid-cols-12 gap-3 items-end">

                  <div className="col-span-5">
                    <label className="block text-[11px] font-bold text-blue-700 uppercase mb-1 ml-1">Certificate Name</label>
                    <input
                      type="text"
                      className="w-full border-2 border-white rounded-xl p-3 text-sm focus:border-blue-500 shadow-sm outline-none transition"
                      placeholder="Type name manually..."
                      value={editingCollege.certType || ''}
                      onChange={(e) => setEditingCollege({ ...editingCollege, certType: e.target.value })}
                    />
                  </div>

                  <div className="col-span-4">
                    <label className="block text-[11px] font-bold text-blue-700 uppercase mb-1 ml-1">Price (₹)</label>
                    <input
                      type="number"
                      className="w-full border-2 border-white rounded-xl p-3 text-sm focus:border-blue-500 shadow-sm outline-none transition"
                      placeholder="0.00"
                      value={editingCollege.certPrice || ''}
                      onChange={(e) => setEditingCollege({ ...editingCollege, certPrice: e.target.value })}
                    />
                  </div>

                  <div className="col-span-3">
                    <button
                      onClick={async () => {
                        if (!editingCollege.certType || !editingCollege.certPrice)
                          return alert("Enter both fields");

                        try {
                          const isEditing = editingCollege.editingCertId;

                          if (isEditing) {
                            // ✅ UPDATE
                            await updateCertificateHandler(isEditing, {
                              name: editingCollege.certType,
                              price: editingCollege.certPrice,
                              college: editingCollege.id,
                            });
                          } else {
                            // ✅ CREATE
                            const response = await addCertificate(
                              editingCollege.id,
                              editingCollege.certType,
                              editingCollege.certPrice
                            );

                            if (!response.ok) throw new Error("Failed to add certificate");
                          }

                          // 🔄 REFRESH LIST
                          await fetchCertificates(editingCollege.id);

                          // 🧹 RESET INPUT
                          setEditingCollege(prev => ({
                            ...prev,
                            certType: "",
                            certPrice: "",
                            editingCertId: null
                          }));

                        } catch (err) {
                          alert("Operation failed");
                        }
                      }}
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 p-3.5 rounded-xl font-bold text-sm transition active:scale-95 shadow-md"
                    >
                      {editingCollege.editingCertId ? "Update" : "Add to List"}
                    </button>
                  </div>
                </div>
              </div>

              {/* --- Certificate List --- */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Current List
                </h3>

                <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
                  {editingCollege.certificates?.map((cert, idx) => (
                    <div
                      key={cert.id || idx}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
                    >
                      {/* LEFT */}
                      <div>
                        <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                        <p className="text-xs font-bold text-blue-600">₹{cert.price}</p>
                      </div>

                      {/* RIGHT */}
                      <div className="flex gap-2">

                        {/* EDIT */}
                        <button
                          onClick={() =>
                            setEditingCollege(prev => ({
                              ...prev,
                              certType: cert.name,
                              certPrice: cert.price,
                              editingCertId: cert.id,
                            }))
                          }
                          className="text-xs font-bold text-gray-500 hover:text-blue-600 p-2"
                        >
                          Edit
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={async () => {
                            try {
                              await deleteCertificateHandler(cert.id);
                              await fetchCertificates(editingCollege.id); // ✅ force refresh
                            } catch (err) {
                              // Delete error handled
                              alert("Delete failed");
                            }
                          }}
                          className="text-xs font-bold text-red-500 hover:text-red-700 p-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeRequest;