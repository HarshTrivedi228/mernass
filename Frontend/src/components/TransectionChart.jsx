import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const data = [
  { name: "Week 1", User: 600, Guest: 400 },
  { name: "Week 2", User: 350, Guest: 550 },
  { name: "Week 3", User: 550, Guest: 250 },
  { name: "Week 4", User: 400, Guest: 320 },
];

export default function ActivitiesChart() {
  return (
 <div className="w-[93%] mx-auto bg-white shadow-lg rounded-2xl mt-5 p-4">
  {/* Heading */}
<YAxis
  axisLine={false}
  tickLine={false}
  domain={[0, 700]} // min aur max fix kiya
  ticks={[0, 100, 200, 300, 400, 500, 600, 700]} // 100 ka step
/>
{/* Heading */}
<div className="flex justify-between items-center mb-3">
  <div className="flex items-center gap-3">
    <h2 className="text-lg font-bold text-gray-700">Activities</h2>
    <p className="text-sm text-gray-400">May - June 2021</p>
  </div>
  <div className="flex items-center gap-4 text-sm">
    <span className="flex items-center gap-1">
      <span className="w-3 h-3 bg-red-400 rounded-full"></span> Guest
    </span>
    <span className="flex items-center gap-1">
      <span className="w-3 h-3 bg-green-400 rounded-full"></span> User
    </span>
  </div>
</div>

  {/* Chart */}
  <div className="w-full h-52"> 
    <ResponsiveContainer>
      <BarChart 
        data={data} 
        barSize={40} 
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey="Guest" fill="#f87171" radius={[8, 8, 0, 0]} />
        <Bar dataKey="User" fill="#4ade80" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

  );
}
