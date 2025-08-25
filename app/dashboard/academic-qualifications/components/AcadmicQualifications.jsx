"use client";

import { useState, useEffect } from "react";
import DataTable from "../../components/table/DataTable";


export default function AcadmicQualifications() {
   const [data, setData] = useState([]);
   const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcadData = async () => {
      try {
        const AcadData =  await fetch(
          "http://dolphinapi.myportal.co.in/api/DisAcademicQualifications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              APIKey: "Sdt!@#321",
            },
            body: JSON.stringify({}),
          }
        );

        if (!AcadData.ok) {
          throw new Error(`HTTP ERROR ${AcadData.status}`);
        }

       const Adata =   await AcadData.json()
       console.log(Adata);
       setData(Adata);

      } catch (err) {
        setError(err.message);
      }
    };

    fetchAcadData()
  }, []);

  return (
   <div>
    <DataTable
    data = {data}
    error = {error}

    columns={[
              {key:"acadqname", label:"Name"},
              {key:"Remarks",label:"Remarks"},
              {key:"Preference",label:"Preference"},
              {key:"Equalification",label:"Equalification"}
    ]}
    

     />

  </div>
  )
}
