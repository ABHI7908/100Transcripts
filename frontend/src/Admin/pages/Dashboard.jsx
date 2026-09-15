import React, { useState, useEffect } from "react";
import { apiGet } from "../../services/api";

const Dashboard = () => {
  const [data, setData] = useState({
    stats: {
      "Total Requests": 0,
      "Pending": 0,
      "Approved": 0,
      "Delivered": 0,
    },
    pipeline: [
      { label: "Submitted", count: 0 },
      { label: "Verified", count: 0 },
      { label: "College", count: 0 },
      { label: "Dispatched", count: 0 }
    ],
    recent_activity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiGet("/api/dashboard-stats/");
        if (response.ok) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading Dashboard Data...</div>;
  }

  return (
    <div className="p-2 md:p-4">
      {/* HEADER - Premium Gradient */}
      {/* <div className="bg-gradient-to-br from-[#0b2a4a] to-[#123d6b] text-white p-8 rounded-2xl mb-8 shadow-lg">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 opacity-80 text-lg">
          Academic Certificate Management
        </p>
      </div> */}

      {/* STATS CARDS - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Total Requests", value: data.stats["Total Requests"], color: "border-blue-500" },
          { title: "Pending", value: data.stats["Pending"], color: "border-amber-500" },
          { title: "Approved", value: data.stats["Approved"], color: "border-emerald-500" },
          { title: "Delivered", value: data.stats["Delivered"], color: "border-purple-500" },
        ].map((card, i) => (
          <div
            key={i}
            className={`bg-white p-4 md:p-6 rounded-2xl shadow-md border-l-8 ${card.color} transition-transform hover:scale-105 cursor-default`}
          >
            <h4 className="text-slate-500 font-semibold uppercase text-[10px] md:text-xs tracking-wider">
              {card.title}
            </h4>
            <h2 className="text-[#0b2a4a] text-2xl md:text-3xl font-bold mt-2">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
        {/* PIPELINE - Larger Section */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl shadow-md border border-slate-100">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6">Request Pipeline</h3>

          <div className="flex justify-between items-center overflow-x-auto pb-4 gap-4">
            {data.pipeline.map((step, i) => (
              <div key={i} className="flex flex-col items-center min-w-[80px] md:min-w-[100px]">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#0b2a4a] font-bold text-base md:text-lg mb-2 border-2 border-blue-100">
                  {step.count}
                </div>
                <p className="text-xs md:text-sm font-medium text-slate-600">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY - Sidebar style */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md border border-slate-100">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6">Recent Activity</h3>
          <div className="space-y-3 md:space-y-4">
            {data.recent_activity.length > 0 ? (
              data.recent_activity.map((item, i) => (
                <div key={i} className="flex items-start space-x-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-slate-700 font-medium">{item.label}</p>
                    <p className="text-slate-400 text-xs">{item.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm italic">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;