'use client'

import {useState, useEffect} from 'react'
import DataTable from '../../components/table/DataTable';

export default function(){
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{

        const fetchAllStudentData = async ()=>{

            try{

                const allStudentsData = await fetch('http://dolphinapi.myportal.co.in/api/DisplayAllStudentsP',{
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

                if(!allStudentsData.ok){
                    throw new Error(`HTTP Error ${allStudentsData.status}`);
                }

                const studentsData = await allStudentsData.json();
                console.log(studentsData);
                setData(studentsData);


            }catch(err){
                setError(err);
            }




        }



      fetchAllStudentData();

    },[])

    return (
        <div>

            <DataTable 
            data = {data}
            error = {error}

            columns = {
                [
                    {key:'Name1',label:'Name'},
                    {key:'Regno',label:'Registration No'},
                    {key:'Email', label:'Email'},
                    {key:'Phone',label:'Contact'}
                ]
            }


            
            
            
            />

        </div>
    )
}