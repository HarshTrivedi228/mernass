import React from "react";
import { Link } from "react-router-dom";

// import dashboard components
import KpiCards from "./DashBoardStatusGrid";
import ActivitiesChart from "./TransectionChart";
import TopProducts from "./ProductChart";

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Top cards with KPIs */}
      <KpiCards />

      {/* Activity chart */}
      <ActivitiesChart />

      {/* Top products chart */}
      <TopProducts />
    </div>
  );
}
