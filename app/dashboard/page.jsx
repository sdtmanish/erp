'use client';


import DashboardWidgets from "../components/DashboardWidgets";
import Employees from "../components/Employees";
import Tiles from "../components/Tiles";
import Welcome from "../components/Welcome";

export default function DashboardPage() {
  return (
    <div>
      <Welcome/>
      <Tiles/>
      <DashboardWidgets/>
      <Employees/>
    
    </div>
  );
}
