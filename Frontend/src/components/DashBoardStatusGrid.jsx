import React from "react";
import { HiOutlineCurrencyDollar, HiOutlineSwitchHorizontal, HiOutlineHeart, HiOutlineUsers } from "react-icons/hi";

const stats = [
  { 
    id: 1, 
    title: "Total Revenues", 
    value: "$2,129,430", 
    change: "+2.5%", 
    changeColor: "bg-green-100 text-green-700", 
    icon: <HiOutlineCurrencyDollar className="text-2xl text-green-600" /> 
  },
  { 
    id: 2, 
    title: "Total Transactions", 
    value: "1,520", 
    change: "+1.7%", 
    changeColor: "bg-green-100 text-green-600", 
    icon: <HiOutlineSwitchHorizontal className="text-2xl text-green-600" /> 
  },
  { 
    id: 3, 
    title: "Total Likes", 
    value: "9,721", 
    change: "+1.4%", 
    changeColor: "bg-green-100 text-green-700", 
    icon: <HiOutlineHeart className="text-2xl text-pink-500" /> 
  },
  { 
    id: 4, 
    title: "Total Users", 
    value: "9,721", 
    change: "+4.2%", 
    changeColor: "bg-green-100 text-green-700", 
    icon: <HiOutlineUsers className="text-2xl text-blue-500" /> 
  },
];

export default function KpiCards() {
  return (
    <div className="w-full sm:w-[90vw] max-w-[93%] mx-auto -mt-5 px-4 sm:px-0">
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
       <div
  key={s.id}
  className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2 hover:shadow-xl transition-shadow"
>
  {/* Icon */}
  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
    {s.icon}
  </div>

  {/* Title */}
  <div className="text-gray-500 text-sm font-bold">{s.title}</div>

  {/* Value + Change */}
  <div className="flex items-center justify-between">
    <div className="text-lg font-bold tracking-tight">{s.value}</div>
    <span
      className={`text-xs px-2 py-0.5 rounded-md font-medium ${s.changeColor}`}
    >
      {s.change}
    </span>
  </div>
</div>

        ))}
      </div>
    </div>
  );
}
