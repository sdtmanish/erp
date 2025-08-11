'use client'
import { useState, useEffect } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { FaEdit } from 'react-icons/fa'
import ConfirmModal from './popup/ConfirmModal'


export default function AcadmicQualifications() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false)
   const [showConfirm, setShowConfirm] = useState(false);
  const [modalMode, setModalMode] = useState('add') // 'add', 'view', 'modify'
  const [selectedQualification, setSelectedQualification] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [formData, setFormData] = useState({
    acadqname: '',
    Remarks: '',
    Equalification: '',
    Preference: '',
  })
  const [errors, setErrors] = useState({})

  const rowsPerPage = 10

  const filterdData = data.filter(
    (item) =>
      item.acadqname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Remarks?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedData = [...filterdData].sort((a, b) =>
    a.acadqname.localeCompare(b.acadqname),
  )

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(data.length / rowsPerPage)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academicQualifications = await fetch(
          'http://dolphinapi.myportal.co.in/api/DisAcademicQualifications',
          {
            method: 'POST',
            headers: {
              APIKey: 'Sdt!@#321',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          },
        )

        if (!academicQualifications.ok) {
          throw new Error(`HTTP error! ${academicQualifications.status}`)
        }

        const result = await academicQualifications.json()
        setData(result)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleAddNew = () => {
    setModalMode('add')
    setSelectedQualification(null)
    setFormData({
      acadqname: '',
      Remarks: '',
      Equalification: '',
      Preference: '',
    })
    setErrors({})
    setShowModal(true)
  }

  const handleView = (qualification) => {
    setModalMode('view')
    setSelectedQualification(qualification)
    setFormData(qualification)
    setShowModal(true)
  }

  const handleModify = (qualification) => {
    setModalMode('modify')
    setSelectedQualification(qualification)
    setFormData(qualification)
    setErrors({})
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({
      acadqname: '',
      Remarks: '',
      Equalification: '',
      Preference: '',
    })
    setErrors({})
    setSelectedQualification(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    let newErrors = {};

    if (!formData.acadqname.trim()) {
      newErrors.acadqname = 'Qualification Name is required';
    }
    if (!formData.Remarks.trim()) {
      newErrors.Remarks = 'Remarks are required';
    }
    if (!formData.Equalification.trim()) {
      newErrors.Equalification = 'Equivalent To is required';
    }

    // Corrected validation for Preference
    if (formData.Preference === '' || isNaN(Number(formData.Preference))) {
      newErrors.Preference = 'Preference is required and must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (modalMode === 'add') {
        // Your existing logic for adding a new qualification
        const res = await fetch(
          'http://dolphinapi.myportal.co.in/api/AddAcademicQualification',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              APIKey: 'Sdt!@#321',
            },
            body: JSON.stringify(formData),
          },
        );

        if (!res.ok) {
          throw new Error(`HTTP error! ${res.status}`);
        }

        setData((prev) => [...prev, { ...formData, acadq_code: Date.now() }]);
      } else if (modalMode === 'modify') {
        const payload = {
          acadq_code: selectedQualification.acadq_code,
          acadqname: formData.acadqname,
          Remarks: formData.Remarks,
          OldValue: formData.acadqname,
          Equalification: formData.Equalification,
          Preference: Number(formData.Preference),
        };

        // Conditionally add the OldValue field only if acadqname was changed.

        const res = await fetch(
          'http://dolphinapi.myportal.co.in/api/ModAcademicQualification',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              APIKey: 'Sdt!@#321',
            },
            body: JSON.stringify(payload),
          },
        );

        if (!res.ok) {
          throw new Error(`HTTP error! ${res.status}`);
        }

        setData((prev) =>
          prev.map((item) =>
            item.acadq_code === selectedQualification.acadq_code
              ? { ...formData, acadq_code: selectedQualification.acadq_code }
              : item,
          ),
        );
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (acadq_code) => {
    try {
      const deleteQualification = await fetch(
        'http://dolphinapi.myportal.co.in/api/DelAcademicQualification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            APIKey: 'Sdt!@#321',
          },
          body: JSON.stringify({
            acadq_code,
          }),
        },
      )

      if (!deleteQualification.ok) {
        throw new Error(`HTTP error! ${deleteQualification.status}`)
      }
      setData((prev) => prev.filter((item) => item.acadq_code !== acadq_code))
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteSelected = async () => {
    if (!selectedItems.length) {
      alert('please select at least one qualification to delete.')
      return
    }

    if (!window.confirm(`Delete ${selectedItems.length} selected qualification(s)?`)) return

    try {
      //Delete each selected item
      await Promise.all(selectedItems.map((code) => handleDelete(code)))

      //clear selection
      setSelectedItems([])
    } catch (err) {
      console.error('Error deleting selected Qualification:', err)
    }
  }

  const handleCheckboxChange = (acadq_code) => {
    setSelectedItems((prev) =>
      prev.includes(acadq_code)
        ? prev.filter((code) => code !== acadq_code)
        : [...prev, acadq_code],
    )
  }

  return (
    <div className="bg-[#f3f8ff] p-2 w-[96%]  max-w-[1600px] mx-auto md:w-[90%]  ">
      {/* Search Bar + Container Header */}
      <div className="flex justify-between items-center p-4 rounded-2xl shadow-xl backdrop-blur-lg bg-white h-26 ">
        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className=" bg-white border border-gray-400 rounded-xl h-10 pl-9  text-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="px-4 py-2 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-700"
            onClick={handleAddNew}
          >
            Add New
          </button>
          <button
            className="px-4 py-2 bg-red-700 rounded-lg text-white cursor-pointer hover:bg-red-800"
            onClick={handleDeleteSelected}
            disabled={!selectedItems.length}
          >
            Delete All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl backdrop-blur-lg mt-4 px-4 pr-2">
        {/* Header Row */}
        <div className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem]
        sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[12rem_10rem_6rem_10rem_5rem] lg:text-base
         items-center justify-between border-b border-gray-300 mb-2 text-sm font-medium px-4 py-5  ">
          <p>Qualification</p>
          <p>Type</p>
          <p>Level</p>
          <p>Equivalent To</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Data Rows */}
       {/* // State at top of your component */}



{currentRows.length > 0 ? (
  currentRows.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem] 
      sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[12rem_10rem_6rem_10rem_5rem] lg:text-sm
      items-center justify-between border-b border-gray-200 mb-2 text-xs px-4 py-3 "
    >
      <div
        key={item.acadq_code}
        className="flex flex-row gap-2 items-center"
      >
        <input
          type="checkbox"
          className="w-4 h-4 border border-gray-400 rounded"
          checked={selectedItems.includes(item.acadq_code)}
          onChange={() => {
            handleCheckboxChange(item.acadq_code);
          }}
        />
        <p>{item.acadqname}</p>
      </div>
      <p>{item.Remarks}</p>
      <p>{item.Preference}</p>
      <p>{item.Equalification}</p>

      <div className="flex gap-4 justify-center">
        <FaEye
          size={14}
          className="text-blue-600 cursor-pointer"
          onClick={() => handleView(item)}
        />
        <FaEdit
          size={14}
          className="text-green-600 cursor-pointer"
          onClick={() => handleModify(item)}
        />
        <FaTrash
          size={14}
          className="text-red-700 cursor-pointer"
          onClick={() => {
            setSelectedId(item.acadq_code); // ✅ store ID before opening modal
            setShowConfirm(true);
          }}
        />
      </div>
    </div>
  ))
) : (
  <div className="text-center py-6 text-gray-500 col-span-full">
    No records found
  </div>
)}

{/* Confirm Modal - only render once, outside the map */}
<ConfirmModal
  isOpen={showConfirm}
  title="Delete Row"
  message="Are you sure you want to delete this row?"
  onCancel={() => setShowConfirm(false)}
  onConfirm={() => {
    handleDelete(selectedId); // ✅ deletes correct row
    setShowConfirm(false);
  }}
/>


        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 pb-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-blue-600 rounded-lg text-white px-4 py-2 cursor-pointer hover:bg-blue-700 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-blue-600 text-white rounded-lg px-6 py-2 cursor-pointer hover:bg-blue-700 disabled:opacity-50"
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
      <h2 className="text-lg font-medium mb-4">
        {modalMode === 'add'
          ? 'Add Qualification'
          : modalMode === 'view'
          ? 'View Qualification'
          : 'Modify Qualification'}
      </h2>
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
        onClick={handleCloseModal}
      >
        <IoMdClose size={20} />
      </button>

      {/* Qualification Name */}
      <label htmlFor="acadqname" className="block text-sm font-medium mb-1">
        Qualification Name
      </label>
      <input
        id="acadqname"
        name="acadqname"
        value={formData.acadqname}
        onChange={handleChange}
        placeholder="Qualification Name"
        className={`w-full focus:outline-none focus:border-blue-300 border rounded-lg p-2 mb-1 ${
          errors.Preference ? 'border-red-500' : 'border-gray-500'
        }`}
        disabled={modalMode === 'view'}
      />
      {errors.acadqname && (
        <p className="text-red-500 text-sm mb-2">{errors.acadqname}</p>
      )}

      {/* Remarks */}
      <label htmlFor="Remarks" className="block text-sm font-medium mb-1">
        Remarks
      </label>
      <input
        id="Remarks"
        name="Remarks"
        value={formData.Remarks}
        onChange={handleChange}
        placeholder="Remarks"
        className={`w-full focus:outline-none focus:border-blue-300 border rounded-lg p-2 mb-1 ${
          errors.Preference ? 'border-red-500' : 'border-gray-500'
        }`}
        disabled={modalMode === 'view'}
      />
      {errors.Remarks && (
        <p className="text-red-500 text-sm mb-2">{errors.Remarks}</p>
      )}

      {/* Equivalent To */}
      <label htmlFor="Equalification" className="block text-sm font-medium mb-1">
        Equivalent To
      </label>
      <input
        id="Equalification"
        name="Equalification"
        value={formData.Equalification}
        onChange={handleChange}
        placeholder="Equivalent To"
        className={`w-full focus:outline-none focus:border-blue-300 border rounded-lg p-2 mb-1 ${
          errors.Preference ? 'border-red-500' : 'border-gray-500'
        }`}
        disabled={modalMode === 'view'}
      />
      {errors.Equalification && (
        <p className="text-red-500 text-sm mb-2">{errors.Equalification}</p>
      )}

      {/* Preference */}
      <label htmlFor="Preference" className="block text-sm font-medium mb-1">
        Preference
      </label>
      <input
        id="Preference"
        name="Preference"
        value={formData.Preference}
        onChange={handleChange}
        placeholder="Preference"
        className={`w-full focus:outline-none focus:border-blue-300 border rounded-lg p-2 mb-1 ${
          errors.Preference ? 'border-red-500' : 'border-gray-500'
        }`}
        disabled={modalMode === 'view'}
      />
      {errors.Preference && (
        <p className="text-red-500 text-sm mb-2">{errors.Preference}</p>
      )}

      <div className="flex justify-end gap-2 mt-4">
        {modalMode !== 'view' && (
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-green-400 text-white rounded-4xl cursor-pointer hover:bg-green-500"
          >
            {modalMode === 'add' ? 'Add' : 'Update'}
          </button>
        )}
        <button
          onClick={handleCloseModal}
          className="px-4 py-2 bg-red-200 text-red-400 rounded-4xl cursor-pointer hover:bg-red-300 hover:text-white"
        >
          {modalMode === 'view' ? 'Close' : 'Discard'}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}