'use client'
import {useState, useEffect} from 'react'

export default function AcadmicQualifications(){

    useEffect(()=>{

    const fetchData = async ()=>{

        
        try{

            const academicQualifications = await fetch('http://dolphinapi.myportal.co.in/api/DisAcademicQualifications',{

                method:'POST',
                headers:{

                 'APIKey':'Sdt!@#321',
                 'Content-Type':'application/json',
                },
                
                body: JSON.stringify({

                }),

            })

        }catch (err) {
            console.log(err);

        }
         const AcadmicQualificationsData = await AcadmicQualifications.json();
    console.log(AcadmicQualificationsData);

    }

    

    fetchData();

    },[])



    return (

        <div>


        </div>
    )


}
    