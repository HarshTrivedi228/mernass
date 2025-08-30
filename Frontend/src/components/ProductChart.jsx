import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import Welcome from "./Welcome"; // Ensure this exists

const data = [
  { name: "Basic Tees", value: 55, color: "#4ade80" },
  { name: "Custom Short Pants", value: 31, color: "#facc15" },
  { name: "Super Hoodies", value: 14, color: "#f87171" },
];

export default function TopProducts() {
  const [activeTab, setActiveTab] = useState("Basic");
  const [showModal, setShowModal] = useState(false);

  // Basic fields
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  // Social fields
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [discord, setDiscord] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({});

  // Welcome overlay
  const [submittedName, setSubmittedName] = useState("");

  // Validation function
 const validate = () => {
  const errs = {};
  if (activeTab === "Basic") {
    // Name: 3-12 chars, only letters and spaces
    const nameRegex = /^[A-Za-z ]{3,12}$/;
    if (!fullName.trim() || !nameRegex.test(fullName)) {
      errs.fullName = "Full Name must be 3-12 letters and no numbers";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!mobileNumber.trim() || !phoneRegex.test(mobileNumber)) {
      errs.mobileNumber = "Mobile Number must be 10 digits";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = "Invalid email address";
    }
  }
  return errs;
};

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const formData =
      activeTab === "Basic"
        ? { fullName, mobileNumber, email }
        : { twitter, linkedIn, gitHub, discord };

    try {
      const res = await fetch("https://mernass-1.onrender.com/api/profiles/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await res.json();

      // Clear all fields
      setFullName("");
      setMobileNumber("");
      setEmail("");
      setTwitter("");
      setLinkedIn("");
      setGitHub("");
      setDiscord("");
      setErrors({});
      setShowModal(false);

      // Show welcome overlay only for Basic
      if (activeTab === "Basic") setSubmittedName(formData.fullName);
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  return (
    <div className="w-[93%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative">
      {/* Left Card - Donut Chart */}
      <div className="bg-white shadow-xl hover:shadow-2xl rounded-2xl p-3 mt-5 flex flex-col transition-shadow h-[300px] md:h-[200px]">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-700">Top Products</h2>
          <p className="text-sm text-gray-400">May - June 2021</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between -mt-2 h-full w-full">
          <div className="w-[70%] md:w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={5}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 space-y-1 mt-2 md:mt-0">
            {data.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs md:text-sm">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-gray-700 font-medium truncate">{item.name}</span>
                <span className="text-gray-400 text-[10px] md:text-xs">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Card - Add Profile */}
      <div
        onClick={() => setShowModal(true)}
        className="bg-white shadow-xl hover:shadow-2xl rounded-2xl p-3 mt-5 flex flex-col items-center justify-center cursor-pointer transition-shadow h-[200px]"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 text-xl">+</div>
        <p className="mt-1 text-gray-500 font-medium text-sm">Add Profile</p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-5 min-w-[320px] max-w-[500px] w-full md:w-[450px]"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Add New Profile</h2>
              <div className="flex border-b mb-3">
                <button
                  className={`flex-1 py-2 text-center font-medium ${
                    activeTab === "Basic" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("Basic")}
                >
                  Basic
                </button>
                <button
                  className={`flex-1 py-2 text-center font-medium ${
                    activeTab === "Social" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("Social")}
                >
                  Social
                </button>
              </div>

              {activeTab === "Basic" ? (
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.fullName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.mobileNumber ? "border-red-500" : ""
                      }`}
                    />
                    {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium mb-1">Twitter</label>
                    <input type="text" placeholder="@twitterhandle" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium mb-1">LinkedIn</label>
                    <input type="text" placeholder="LinkedIn URL" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium mb-1">GitHub</label>
                    <input type="text" placeholder="GitHub URL" value={gitHub} onChange={(e) => setGitHub(e.target.value)} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium mb-1">Discord</label>
                    <input type="text" placeholder="Discord ID" value={discord} onChange={(e) => setDiscord(e.target.value)} className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <button onClick={() => { setShowModal(false); setErrors({}); }} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Overlay */}
      <AnimatePresence>
        {submittedName && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Welcome name={submittedName} goBack={() => setSubmittedName("")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
