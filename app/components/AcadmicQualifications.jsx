'use client'
import { useState, useEffect } from 'react'
import { FaRegEye, FaRegTrashAlt } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import ConfirmModal from './popup/ConfirmModal'
import QualificationModal from './popup/QualificationModal'; // Adjust the path as needed
import { MdDelete } from "react-icons/md"; // This import is unused, but kept as per "don't change anything unnecessary"
import Image from "next/image";


export default function AcadmicQualifications() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalMode, setModalMode] = useState('add') // 'add', 'view', 'modify'
  const [selectedQualification, setSelectedQualification] = useState(null) // This will now store the full object or null
  const [selectedItems, setSelectedItems] = useState([])
  const [formData, setFormData] = useState({
    acadqname: '',
    Remarks: '',
    Equalification: '',
    Preference: '',
  })
  const [errors, setErrors] = useState({})
  const [confirmModalContent, setConfirmModalContent] = useState({
    title: '',
    message: '',
    onConfirm: () => { }
  })



  const rowsPerPage = 10

  const filterdData = data.filter(
    (item) =>
      item.acadqname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Remarks?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedData = [...filterdData].sort((a, b) => {
    const nameA = a.acadqname.toLowerCase();
    const nameB = b.acadqname.toLowerCase();

    if (nameA < nameB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0; // names must be equal
  });





  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow)

  // Calculate total pages based on filtered data (important for accurate pagination)
  const totalPages = Math.ceil(filterdData.length / rowsPerPage) // Changed from data.length

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





  const handleReverseSorting = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));

  }

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
    // Set selectedQualification for display in ConfirmModal (if used directly, safer to pass the name)
    setSelectedQualification(qualification); // Store the full object for consistency and potential future use
    setFormData(qualification)
    setShowModal(true)
  }

  const handleModify = (qualification) => {
    setModalMode('modify')
    // FIX: Set selectedQualification with the full original object
    // This is crucial to access original acadq_code and acadqname in handleSubmit
    setSelectedQualification(qualification);
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
        // Ensure selectedQualification is an object before accessing its properties
        if (!selectedQualification || typeof selectedQualification !== 'object') {
          console.error("Error: selectedQualification is not an object. Cannot modify.");
          return; // Prevent API call if state is incorrect
        }

        const payload = {
          acadq_code: selectedQualification.acadq_code,
          acadqname: formData.acadqname,
          Remarks: formData.Remarks,
          OldValue: selectedQualification.acadqname, // Now correctly accesses original name from the object
          Equalification: formData.Equalification,
          Preference: Number(formData.Preference),
        };
        console.log("Payload being sent for modification:", payload); // Log the payload for debugging

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
          // Attempt to log the error response from the API
          const errorText = await res.text();
          console.error(`HTTP error! Status: ${res.status}, Response: ${errorText}`);
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
    // Reverted to original alert/confirm for this function as per request not to change modal logic here
    if (!selectedItems.length) {
      alert('please select at least one qualification to delete.')
      return
    }

    setConfirmModalContent({
      title: 'Delect Selected Row',
      message: `Are you sure you want to delete ${selectedItems.length} selected qualification(s)? `,
      onConfirm: async () => {
        try {
          await Promise.all(selectedItems.map((code) => handleDelete(code)));
          setSelectedItems([]);
        }
        catch (err) {
          console.error("Error deleting selected Qualification:", err);
        }
        setShowConfirm(false);
      }
    })
    setShowConfirm(true);
  }

  const handleCheckboxChange = (acadq_code) => {
    setSelectedItems((prev) =>
      prev.includes(acadq_code)
        ? prev.filter((code) => code !== acadq_code)
        : [...prev, acadq_code],
    )
  }

  // --- Pagination Logic for Page Numbers ---
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Number of page buttons to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if the calculated endPage doesn't allow for maxPagesToShow
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`h-10 w-10 mx-1 rounded-full cursor-pointer flex items-center justify-center text-sm transition-colors duration-200
            ${currentPage === i ? 'bg-[#8c28e1] text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            disabled:opacity-90`}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  // ------------------------------------------

  return (
    <div className=" p-2 w-[96%] max-w-[1600px] bg-primary mx-auto md:w-[90%] ">
      {/* Search Bar + Container Header */}
      <div className="flex justify-between items-center p-4 rounded-2xl shadow-xl backdrop-blur-lg bg-primary h-26 ">
        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className=" bg-white border border-gray-400 rounded-xl h-10 pl-9 text-md focus:outline-none focus:border-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="px-4 py-2 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-700
            active:scale-95 active:bg-blue-800 
            "
            onClick={handleAddNew}
          >
            Add New
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-white cursor-pointer 
              ${selectedItems.length
                ? "bg-red-700 hover:bg-red-800 active:scale-95 active:bg-red-800"
                : "bg-red-400 cursor-not-allowed active:scale-100 active:bg-red-400"
              }`}
            onClick={handleDeleteSelected}
            disabled={!selectedItems.length}
          >
            Delete All
          </button>

        </div>
      </div>

      <div className="bg-primary rounded-2xl shadow-xl backdrop-blur-lg mt-4 px-4 pr-2">
        {/* Header Row */}
        <div className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem]
        sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[12rem_10rem_6rem_10rem_5rem] lg:text-base
        items-center justify-between border-b border-gray-300 mb-2 text-sm font-medium px-4 pt-4 pb-2 ">
          <div className="flex flex-row gap-2 items-center">
            <p>QUALIFICATION</p>

            <button className="cursor-pointer p-1 bg-green-300 rounded-3xl hover:bg-green-400  active:scale-90"
              onClick={handleReverseSorting}
            >
              <Image src="/assets/asc-desc-icon.png"
                alt="ascending-descending-icon"
                height={16}
                width={16}
              /></button>
          </div>

          <p>TYPE</p>
          <p>LEVEL</p>
          <p>EQUIVALENT TO</p>
          <p className="text-center">ACTIONS</p>
        </div>

        {/* Data Rows */}
        {currentRows.length > 0 ? (
          currentRows.map((item) => (
            <div
              key={item.acadq_code}
              className=" grid grid-cols-[12rem_10rem_6rem_10rem_5rem]  items-center justify-between
            sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[12rem_10rem_6rem_10rem_5rem] lg:text-sm
            border-b border-gray-200 text-xs px-4 py-3 hover:bg-emerald-100 rounded-md"
            >
              <div
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
              <p >{item.Preference}</p>
              <p>{item.Equalification}</p>

              <div className="flex gap-4 justify-center">
                <FaRegEye
                  size={16}
                  className="text-blue-400 cursor-pointer"
                  onClick={() => handleView(item)}
                />
                <FaRegEdit
                  size={16}
                  className=" cursor-pointer"
                  onClick={() => handleModify(item)}
                />
                <div className="text-black-700 cursor-pointer"
                  onClick={() => {
                    setSelectedId(item.acadq_code); // Store ID before opening modal
                    setSelectedQualification(item.acadqname)
                    setConfirmModalContent({
                      title: 'Delete Row',
                      message: `Are you sure you want to delete the record: "Qualification: ${item.acadqname}"?`,
                      onConfirm: () => {
                        handleDelete(item.acadq_code);
                        setShowConfirm(false);
                      }
                    })
                    setShowConfirm(true);
                  }}>
                  <Image
                    src="/assets/icons/trash-bin.png"
                    alt="Trash Bin"
                    width={18}
                    height={18}
                  />
                </div>
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
          title={confirmModalContent.title}
          message={confirmModalContent.message}
          onCancel={() => setShowConfirm(false)}
          onConfirm={confirmModalContent.onConfirm}
        />




        {/* Pagination */}
        {totalPages > 1 && ( // Only show pagination if there's more than 1 page
          <div className="flex justify-center items-center mt-4 pb-4 gap-2">
            {/* First Page Button */}


            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-5 py-2 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-700 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <button
              onClick={() => handlePageChange(1)}
              className="h-10 w-10 mx-1 rounded-full flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              «
            </button>

            {/* Numbered Page Buttons */}
            {renderPageNumbers()}

            {/* Last Page Button */}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="h-10 w-10 mx-1 rounded-full flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              »
            </button>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>


          </div>
        )}
      </div>

      <QualificationModal
        showModal={showModal}
        modalMode={modalMode}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
      />

    </div>
  )
}
