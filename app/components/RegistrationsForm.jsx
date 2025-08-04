'use client';
import { useState } from 'react';

export default function RegistrationsForm() {
  const [upload, setUpload] = useState(null);
  const [formNumber, setFormNumber] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [studentType, setStudentType] = useState('');
  const [category, setCategory] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [yearOfAdmission, setYearOfAdmission] = useState('');
  const [nationality, setNationality] = useState('');
  const [religion, setReligion] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [pen, setPen] = useState('');
  const [apaarId, setApaarId] = useState('');

  const handleRegistration = async () => {
    // Submit logic here
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Student Registration Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        <div>
          <label className="block mb-1">Upload</label>
          <input
            type="file"
            onChange={(e) => setUpload(e.target.files[0])}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Form Number</label>
          <input
            type="text"
            value={formNumber}
            onChange={(e) => setFormNumber(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Registration Date</label>
          <input
            type="date"
            value={registrationDate}
            onChange={(e) => setRegistrationDate(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Middle Name</label>
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Student Type</label>
          <input
            type="text"
            value={studentType}
            onChange={(e) => setStudentType(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Class</label>
          <input
            type="text"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Aadhar Number</label>
          <input
            type="text"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Year of Admission</label>
          <input
            type="text"
            value={yearOfAdmission}
            onChange={(e) => setYearOfAdmission(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Nationality</label>
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Religion</label>
          <input
            type="text"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Blood Group</label>
          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">PEN</label>
          <input
            type="text"
            value={pen}
            onChange={(e) => setPen(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">APAAR ID</label>
          <input
            type="text"
            value={apaarId}
            onChange={(e) => setApaarId(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleRegistration}
      >
        Submit
      </button>
    </div>
  );
}
