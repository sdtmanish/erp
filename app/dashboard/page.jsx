'use client';


import Attendance from "../components/Attendance";
import DashboardWidgets from "../components/DashboardWidgets";
import Employees from "../components/Employees";
import NoticeBoard from "../components/Noticeboard";
import Tiles from "../components/Tiles";
import Welcome from "../components/Welcome";

export default function DashboardPage() {
  return (
    <div>
      <Welcome/>
      <Tiles/>
      <DashboardWidgets/>
      <NoticeBoard/>
     
      <Attendance/>
       <Employees/>
      
    
    </div>
  );
}
