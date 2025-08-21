'use client'

import {useState, useEffect} from 'react'
import EmployeeFormModal from "./components/EmployeeFormModal"

export default function AllEmployeeDetails(){
    const [employeeData, setEmployeeData] = useState([]);


    useEffect(()=>{

        const fetchAllEmployees = async ()=>{

            try{

                const allEmployees = await fetch('http://dolphinapi.myportal.co.in/api/DisplayAllEmployeeP',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                       APIKey: 'Sdt!@#321',
                    },
                    body:JSON.stringify({})

                    
                })

                if(!allEmployees.ok){
                    throw new Error(`HTTP Error ${allEmployees.status}`)
                }

                const allEmployeesResult = await allEmployees.json();
                console.log(allEmployeesResult);
                setEmployeeData(allEmployeesResult);

            }catch(err){
                console.log(err);
            }
        }

        fetchAllEmployees()

    },[])

      
     

    return (

        
  <div>
    {employeeData.map((item) => (
      <div key={item.UserId}  className="flex flex-row gap-6 justify-center items-center">

       <p className="text-center">{item.Name1}</p> 
       <p className="text-center" >{item.EmployeeCode}</p>
       <p className="text-center"> {item.email}</p>
       <p className="text-center">{item.Contact}</p>
      </div>
    ))}
  </div>
)


    
}