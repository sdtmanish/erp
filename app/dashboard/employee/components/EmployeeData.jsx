'use client'

import {useState, useEffect} from 'react';
import DataTable from '../../components/table/DataTable';

export default function EmployeeData(){
    const [data,setData] = useState([]);
    const [error, setError] = useState(null);

  useEffect(()=>{

    const fetchAllEmployeeData = async ()=>{

        try{
        
            const allEmployeeData = await fetch('http://dolphinapi.myportal.co.in/api/DisplayAllEmployeeP',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'APIKey':'Sdt!@#321'

                }, 
                body:JSON.stringify(
                    {

                    }
                )


            })
            
            if(!allEmployeeData.ok){
                throw new Error(`HTTP ERROR ${allEmployeeData.status}`);
            }
        
            const employeeData = await allEmployeeData.json();
            console.log(employeeData);
            setData(employeeData)

        }catch(err){
            setError(err);

        }
    }

    fetchAllEmployeeData();

  },[])

    return (
        <div>
            
            <DataTable

            data={data}
            error = {error}
            columns = {
                [
                    {key:"Name1",label:"Name"},
                    {key:"EmployeeCode",label:"Employee Code"},
                    {key:"email",label:"Email"},
                    {key:"Contact",label:"Contact"},
                ]
            }

               

             />
        </div>
    )
}