import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Plus, Edit, Trash2, Search, Filter } from "lucide-react";

const AdminUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [formData, setFormData] = useState({
    short: "",
    title: "",
    logo: null,
    heroImage: null
  });

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/universities/");
      if (!response.ok) throw new Error("Failed to fetch universities");
      const data = await response.json();
      // Convert object to array for easier rendering
      const universitiesArray = Object.entries(data).map(([id, university]) => ({
        id,
        ...university
      }));
      setUniversities(universitiesArray);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingUniversity 
        ? `http://localhost:8000/api/universities/${editingUniversity.id}/`
        : "http://localhost:8000/api/universities/create/";
      
      const method = editingUniversity ? "PUT" : "POST";
      
      // Create FormData for file uploads
      const formDataToSend = new FormData();
      
      // Add basic fields
      formDataToSend.append('short', formData.short);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', ''); // Add empty description for compatibility
      
      // Add files if they exist
      if (formData.logo instanceof File) {
        formDataToSend.append('logo', formData.logo);
      }
      if (formData.heroImage instanceof File) {
        formDataToSend.append('heroImage', formData.heroImage);
      }
      


      const response = await fetch(url, {
        method,
        body: formDataToSend // Don't set Content-Type header, let browser set it for FormData
      });

      if (!response.ok) throw new Error("Failed to save university");
      
      await fetchUniversities();
      setShowAddForm(false);
      setEditingUniversity(null);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (university) => {
    setEditingUniversity(university);
    setFormData({
      short: university.short,
      title: university.title,
      logo: null, // Reset to null for file upload
      heroImage: null // Reset to null for file upload
    });
    setShowAddForm(true);
  };

  const handleDelete = async (university) => {
    if (!confirm("Are you sure you want to delete this university?")) return;
    
    try {
      // Use the numeric primary key for deletion
      const response = await fetch(`http://localhost:8000/api/universities/${university.id}/`, {
        method: "DELETE"
      });
      
      if (!response.ok) throw new Error("Failed to delete university");
      
      await fetchUniversities();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      short: "",
      title: "",
      logo: null,
      heroImage: null
    });
  };

  
  const filteredUniversities = universities.filter(uni =>
    uni.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.short.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Universities Management</h1>
        <p className="text-gray-600">Manage partnered universities and their information</p>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button
            onClick={() => {
              resetForm();
              setEditingUniversity(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add University
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Universities Grid */}
      {filteredUniversities.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No universities found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first university"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => {
                resetForm();
                setEditingUniversity(null);
                setShowAddForm(true);
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Your First University
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredUniversities.map((university, index) => (
          <motion.div
            key={university.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {university.logo_url ? (
                    <img src={university.logo_url} alt={university.short} className="w-12 h-12 rounded-lg object-cover" 
                         onError={(e) => {
                           e.target.style.display = 'none';
                           e.target.parentElement.innerHTML = `
                             <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                               <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                               </svg>
                             </div>
                           `;
                         }} />
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{university.short}</h3>
                    <p className="text-sm text-gray-500">{university.services?.length || 0} services</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(university)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(university)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{university.title}</h4>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{university.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {university.services && university.services.length > 0 ? (
                  <>
                    {university.services.slice(0, 3).map((service, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                    {university.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                        +{university.services.length - 3} more
                      </span>
                    )}
                  </>
                ) : (
                  <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                    No services added
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}
      
      {/* Add/Edit University Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingUniversity ? "Edit University" : "Add New University"}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Code</label>
                  <input
                    type="text"
                    value={formData.short}
                    onChange={(e) => setFormData(prev => ({ ...prev, short: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                    placeholder="e.g., JNTUH"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                    placeholder="e.g., Exclusive Transcript Services for JNTUH Students"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.files[0] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  {formData.logo && (
                    <p className="text-xs text-gray-500 mt-1">Selected: {formData.logo.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({ ...prev, heroImage: e.target.files[0] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  {formData.heroImage && (
                    <p className="text-xs text-gray-500 mt-1">Selected: {formData.heroImage.name}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingUniversity(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  {editingUniversity ? "Update" : "Create"} University
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminUniversities;
