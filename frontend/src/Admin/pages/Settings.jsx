import React, { useState } from "react";
import { Upload, Save } from "lucide-react";

const Settings = () => {
  const [image, setImage] = useState(null);

  // 📸 Handle Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* 🔵 HEADER */}
        <div className="bg-[#0b2a4a] text-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Admin Profile</h1>
            <p className="text-sm text-blue-200">Manage your account</p>
          </div>
        </div>

        {/* 🧾 CARD */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">

          {/* 📸 PHOTO UPLOAD */}
          <div className="flex items-center gap-6">

            {/* Image Preview */}
            <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden">
              {image ? (
                <img src={image} alt="profile" className="w-full h-full object-cover"/>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* Upload Button */}
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Upload size={16}/> Upload Photo
              <input type="file" className="hidden" onChange={handleImageChange}/>
            </label>

          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-slate-500">Full Name</label>
              <input
                type="text"
                defaultValue="Super Admin"
                className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-slate-500">Phone</label>
              <input
                type="text"
                defaultValue="+91 88888 00000"
                className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-slate-500">Email</label>
              <input
                type="email"
                defaultValue="admin@edutech.com"
                className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-slate-500">Role</label>
              <input
                type="text"
                value="Super Admin"
                disabled
                className="w-full mt-1 border p-2 rounded-lg bg-slate-100"
              />
            </div>

          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-slate-500">Office Address</label>
            <textarea
              defaultValue="Hyderabad, Telangana, India"
              className="w-full mt-1 border p-2 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* SAVE */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-[#0b2a4a] text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              <Save size={16}/> Save Changes
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;