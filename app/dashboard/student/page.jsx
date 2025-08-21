'use client'

import StudentFormModal from "./components/StudentFomModal"
import { useState, useEffect } from 'react';

export default function () {
    const [studentsData, setStudentsData] = useState([]);

    useEffect(() => {

        const fetchAllStudents = async () => {

            try {

                const allStudents = await fetch('http://dolphinapi.myportal.co.in/api/DisplayAllStudentsP', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'APIKey': 'Sdt!@#321',
                    },
                    body: JSON.stringify({

                    })

                })

                if (!allStudents.ok) {
                    throw new Error(`HTTP Error ${allStudents.status}`);
                }

                const allStudentsResult = await allStudents.json();
                console.log(allStudentsResult);
                setStudentsData(allStudentsResult)

            } catch (err) {
                console.log(err);
            }

        }

        fetchAllStudents();

    }, [])



    return (
        <div>

            {
                studentsData.map((item) => (
                    <div key={item.UserId} className="flex flex-row gap-4">
                        <p>{item.Name1}</p>
                        <p>{item.Regno}</p>
                        <p>{item.ClassName} </p>
                        <p>{item.Phone}</p>
                        
                    </div>
                ))
            }



        </div>
    )
}