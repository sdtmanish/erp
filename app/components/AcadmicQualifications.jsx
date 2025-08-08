'use client'
import { useState, useEffect } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

export default function AcadmicQualifications() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    acadqname: '',
    Remarks: '',
    Equalification: '',
    Preference: ''
  });

  const rowsPerPage = 10;

  const filterdData = data.filter((item) =>
    item.acadqname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Remarks?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedData = [...filterdData].sort((a, b) =>
    a.acadqname.localeCompare(b.acadqname)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academicQualifications = await fetch('http://dolphinapi.myportal.co.in/api/DisAcademicQualifications', {
          method: 'POST',
          headers: {
            'APIKey': 'Sdt!@#321',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });

        if (!academicQualifications.ok) {
          throw new Error(`HTTP error! ${academicQualifications.status}`)
        }

        const result = await academicQualifications.json();
        setData(result);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleAddNew = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      acadqname: '',
      Remarks: '',
      Equalification: '',
      Preference: ''
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setShowModal(false);
  }

  return (
    <div className="bg-[#f3f8ff] p-20">

      {/* Search Bar + Container Header */}
      <div className="flex justify-between items-center p-4 rounded-2xl shadow-xl backdrop-blur-lg bg-white h-26 ">
        <div className='relative'>
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className=" bg-white border border-gray-400 rounded-xl h-10 pl-9  text-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-700"
          onClick={handleAddNew}
        >
          Add New
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl backdrop-blur-lg mt-4 px-4 pr-2">
        {/* Header Row */}
        <div className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem] items-center justify-between border-b border-gray-300 mb-2 text-md font-medium px-4 py-3 ">
          <p>Qualification</p>
          <p>Type</p>
          <p>Level</p>
          <p>Equivalent To</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Data Rows */}
        {currentRows.length > 0 ? (
          currentRows.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem] items-center justify-between border-b border-gray-300 mb-2 text-sm px-4 py-2"
            >
              <p>{item.acadqname}</p>
              <p>{item.Remarks}</p>
              <p>{item.Preference}</p>
              <p>{item.Equalification}</p>

              <div className="flex gap-4 justify-center">
                <FaEye size={14} className="text-blue-600 cursor-pointer" />
                <FaTrash size={14} className="text-red-700 cursor-pointer" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 col-span-full">
            No records found
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 pb-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-blue-600 rounded text-white px-4 py-2 cursor-pointer hover:bg-blue-700 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-blue-600 text-white rounded px-6 py-2 cursor-pointer hover:bg-blue-700 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg relative">
            <h2 className="text-lg font-medium mb-4">Add Qualification</h2>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={handleCloseModal}
            >
              <IoMdClose size={20} />
            </button>

            <input
              name="acadqname"
              value={formData.acadqname}
              onChange={handleChange}
              placeholder="Qualification Name"
              className="w-full border border-gray-500 rounded-lg p-2 mb-3"
            />
            <input
              name="Remarks"
              value={formData.Remarks}
              onChange={handleChange}
              placeholder="Remarks"
              className="w-full border border-gray-500 rounded-lg p-2 mb-3"
            />
            <input
              name="Equalification"
              value={formData.Equalification}
              onChange={handleChange}
              placeholder="Equivalent To"
              className="w-full border border-gray-500 rounded-lg p-2 mb-3"
            />
            <input
              name="Preference"
              value={formData.Preference}
              onChange={handleChange}
              placeholder="Preference"
              className="w-full border border-gray-500 rounded-lg p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-green-400 text-white rounded-4xl cursor-pointer hover:bg-green-500"
              >
                Add
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-200 text-red-400 rounded-4xl cursor-pointer hover:bg-red-300 hover:text-white"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
