'use client'

import { useState, useEffect } from 'react';
import { Eye, Edit, Search, ChevronLeftCircle, ChevronRightCircle, PlusCircle,  } from 'lucide-react';
import Image from 'next/image'
import { FaTrash } from 'react-icons/fa';
import { MdAddToPhotos, MdDeleteForever } from "react-icons/md";

export default function AllStudentDetails() {
    const [studentsData, setStudentsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        Regno: '',
        ClassName: '',
        Phone: ''
    });
    const [errors, setErrors] = useState({});

    // Fetches all student data when the component mounts.
    // It makes a POST request to a specified API endpoint.
    useEffect(() => {
        const fetchAllStudents = async () => {
            try {
                const allStudents = await fetch('http://dolphinapi.myportal.co.in/api/DisplayAllStudentsP', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'APIKey': 'Sdt!@#321',
                    },
                    body: JSON.stringify({})
                });

                if (!allStudents.ok) {
                    throw new Error(`HTTP Error ${allStudents.status}`);
                }

                const allStudentsResult = await allStudents.json();
                setStudentsData(allStudentsResult);
            } catch (err) {
                console.error("Failed to fetch student data:", err);
                // In a real application, you might want to show an error message to the user.
            }
        };
        fetchAllStudents();
    }, []);

    // Resets the current page to 1 whenever the search term or rows per page changes.
    // This ensures that the pagination is correct for the new data view.
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, rowsPerPage]);

    // Data filtering based on search term.
    const filteredData = studentsData.filter(
        (item) =>
            item.Name1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Regno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.ClassName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Data sorting based on the student name and current sort order (ascending/descending).
    const sortedData = [...filteredData].sort((a, b) => {
        const nameA = a.Name1.toLowerCase();
        const nameB = b.Name1.toLowerCase();
        if (nameA < nameB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (nameA > nameB) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Pagination logic to determine which rows to display on the current page.
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // Toggles the sort order between ascending and descending.
    const handleReverseSorting = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    // Opens the modal for adding a new student, resetting form data and errors.
    const handleAddNew = () => {
        setModalMode('add');
        setSelectedStudent(null);
        setFormData({ name: '', Regno: '', ClassName: '', Phone: '' });
        setErrors({});
        setShowModal(true);
    };

    // Opens the modal in view mode, populating the form with the selected student's data.
    const handleView = (student) => {
        setModalMode('view');
        setSelectedStudent(student);
        setFormData({
            name: student.Name1,
            Regno: student.Regno,
            ClassName: student.ClassName,
            Phone: student.Phone
        });
        setShowModal(true);
    };

    // Opens the modal in modify mode, populating the form with the selected student's data.
    const handleModify = (student) => {
        setModalMode('modify');
        setSelectedStudent(student);
        setFormData({
            name: student.Name1,
            Regno: student.Regno,
            ClassName: student.ClassName,
            Phone: student.Phone
        });
        setErrors({});
        setShowModal(true);
    };

    // Closes the modal and resets form data and errors.
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ name: '', Regno: '', ClassName: '', Phone: '' });
        setErrors({});
        setSelectedStudent(null);
    };

    // Handles changes to the form input fields, updating the formData state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validates the form data, setting error messages if fields are empty.
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) { newErrors.name = 'Student Name is required'; }
        if (!formData.Regno.trim()) { newErrors.Regno = 'Registration Number is required'; }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handles the submission of the form (add or modify).
    // In a real application, this would involve API calls to add or update student data.
    const handleSubmit = async () => {
        if (!validateForm()) return;
        try {
            if (modalMode === 'add') {
                console.log('Adding new student:', formData);
                // Example: await fetch('/api/addStudent', { method: 'POST', body: JSON.stringify(formData) });
            } else if (modalMode === 'modify') {
                console.log('Modifying student:', selectedStudent.UserId, formData);
                // Example: await fetch(`/api/updateStudent/${selectedStudent.UserId}`, { method: 'PUT', body: JSON.stringify(formData) });
            }
            // After successful operation, refresh data or update state
            handleCloseModal();
        } catch (err) {
            console.error("Error submitting form:", err);
            // Handle error (e.g., show an error message to the user)
        }
    };

    // Handles the deletion of a single student record.
    // In a real application, this would involve an API call to delete the student.
    const handleDelete = async (userId) => {
        try {
            console.log('Deleting student with UserId:', userId);
            // Example: await fetch(`/api/deleteStudent/${userId}`, { method: 'DELETE' });
            setStudentsData((prev) => prev.filter((item) => item.UserId !== userId));
        } catch (err) {
            console.error("Error deleting student:", err);
            // Handle error (e.g., show an error message to the user)
        }
    };

    // Handles the deletion of multiple selected student records.
    const handleDeleteSelected = async () => {
        if (!selectedItems.length) {
            console.log('Please select at least one student to delete.'); // Replaced alert
            return;
        }

        if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected student(s)?`)) {
            try {
                await Promise.all(selectedItems.map((id) => handleDelete(id)));
                setSelectedItems([]); // Clear selections after deletion
                console.log('Selected students deleted successfully.');
            } catch (err) {
                console.error('Error deleting selected students:', err);
            }
        }
    };

    // Toggles the selection state of a student checkbox.
    const handleCheckboxChange = (userId) => {
        setSelectedItems((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
    };

    // Handles page navigation for pagination.
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Renders pagination buttons.
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // Maximum number of page buttons to display
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // Adjust startPage if there aren't enough pages after currentPage to fill maxPagesToShow
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`h-10 w-10 rounded-full cursor-pointer flex items-center justify-center text-sm transition-colors duration-200 ${currentPage === i ? 'bg-[#8c28e1] text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} disabled:opacity-90`}
                    disabled={currentPage === i}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="p-2 w-[96%] max-w-[1600px] bg-primary mx-auto md:w-[90%] font-inter">
            {/* Top section with search, rows per page, and action buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-2xl shadow-md backdrop-blur-lg bg-white h-26 mb-4">
                {/* Search and Rows per page */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-white border border-gray-300 rounded-xl h-10 pl-9 pr-3 text-md focus:outline-none focus:border-blue-400 w-full sm:w-auto min-w-[200px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="rowsPerPage" className="text-gray-700 text-sm">Rows per page:</label>
                        <select
                            id="rowsPerPage"
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                            className="border border-gray-300 rounded-lg px-2 py-1 text-md focus:outline-none focus:border-blue-400 cursor-pointer"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                   <button
                              className="px-2 py-2 flex flex-row gap-1  bg-blue-500 rounded-lg text-white cursor-pointer hover:bg-blue-600
                              active:scale-95 active:bg-blue-800 
                              "
                              onClick={handleAddNew}
                            >
                              Add New
                              <MdAddToPhotos
                                size={16} />
                  
                            </button>
                    <button
                               className={` flex flex-row gap-1 px-4 py-2 rounded-lg  text-white cursor-pointer 
                                 ${selectedItems.length
                                   ? "bg-red-600 hover:bg-red-700 active:scale-95 active:bg-red-800"
                                   : "bg-red-400 cursor-not-allowed active:scale-100 active:bg-red-400"
                                 }`}
                               onClick={handleDeleteSelected}
                               disabled={!selectedItems.length}
                             >
                               Delete All
                               <FaTrash size={14} />
                             </button>
                </div>
            </div>

            {/* Student Data Table */}
            <div className="bg-white rounded-2xl shadow-xl backdrop-blur-lg mt-4 px-4 py-2 overflow-x-auto">
                <div className="min-w-[700px]"> {/* Ensures horizontal scroll on small screens */}
                    {/* Table Header */}
                    <div className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem]  items-center justify-between
            sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[12rem_8rem_8rem_10rem_5rem] lg:text-base bg-[#fbfbfb]
            border-b border-gray-200 text-xs px-4 py-3 rounded-md" >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="w-4 h-4 border border-gray-400 rounded accent-blue-500 cursor-pointer"
                                checked={selectedItems.length === currentRows.length && currentRows.length > 0}
                                onChange={() => {
                                    if (selectedItems.length === currentRows.length) {
                                        setSelectedItems([]);
                                    } else {
                                        setSelectedItems(currentRows.map(item => item.UserId));
                                    }
                                }}
                            />
                            <p>NAME</p>
                            <button className="cursor-pointer p-1 rounded-full hover:bg-gray-200 active:scale-90 transition-all duration-200" onClick={handleReverseSorting}>
                                <Image src="/assets/asc-desc-icon.png"
                                               alt="ascending-descending-icon"
                                               height={12}
                                               width={12}
                                             />
                            </button>
                        </div>
                        <p className="text-center">REG. NO</p>
                        <p className="text-center">CLASS NAME</p>
                        <p className="text-center">PHONE</p>
                        <p className="text-center">ACTIONS</p>
                    </div>

                    {/* Table Rows */}
                    {currentRows.length > 0 ? (
                        currentRows.map((item) => (
                            <div
                                key={item.UserId}
                                className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem]  items-center justify-between
                                        sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[12rem_8rem_8rem_10rem_5rem] lg:text-sm
                                         border-b border-gray-200 text-xs px-4 py-3 hover:bg-emerald-100 rounded-md"
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-400 rounded accent-blue-500 cursor-pointer"
                                        checked={selectedItems.includes(item.UserId)}
                                        onChange={() => handleCheckboxChange(item.UserId)}
                                    />
                                    <p className="truncate">{item.Name1}</p>
                                </div>
                                <p className="text-center truncate">{item.Regno}</p>
                                <p className="text-center truncate">{item.ClassName}</p>
                                <p className="text-center truncate">{item.Phone}</p>
                                <div className="flex gap-4 justify-center">
                                    <Eye
                                        size={16}
                                        className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-200"
                                        onClick={() => handleView(item)}
                                    />
                                    <Edit
                                        size={16}
                                        className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
                                        onClick={() => handleModify(item)}
                                    />
                                    <div
                                        className="text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-200"
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to delete the record for: "${item.Name1}"?`)) {
                                                handleDelete(item.UserId);
                                            }
                                        }}
                                    >
                                        <Image
                                            src="/assets/icons/trash-bin.png"
                                            alt="Trash Bin"
                                            width={18}
                                            height={18} />
                                    </div>
                                </div>
                            </div>
                           
                ))
                ) : (
                <div className="text-center py-6 text-gray-500 col-span-full">No records found</div>
                    )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 pb-4 gap-2 flex-wrap">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 flex items-center gap-2 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 active:scale-95 transition-all duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeftCircle size={16} className="text-white" />
                        Prev
                    </button>
                    <button
                        onClick={() => handlePageChange(1)}
                        className="h-10 w-10 mx-1 rounded-full flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    {renderPageNumbers()}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className="h-10 w-10 mx-1 rounded-full flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 flex items-center gap-2 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 active:scale-95 transition-all duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <ChevronRightCircle size={16} className="text-white" />
                    </button>
                </div>
            )}
        </div>

            {/* Student Form Modal (Add/View/Modify) */ }
    <StudentFormModal
        showModal={showModal}
        modalMode={modalMode}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
    />
        </div >
    );
}

// StudentFormModal Component
const StudentFormModal = ({ showModal, modalMode, formData, errors, handleChange, handleSubmit, handleCloseModal }) => {
    if (!showModal) return null;

    const title = modalMode === 'add' ? 'Add New Student' :
        modalMode === 'modify' ? 'Modify Student' :
            'Student Details';
    const isViewMode = modalMode === 'view';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto transform transition-all duration-300 scale-100 opacity-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Student Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            readOnly={isViewMode}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${isViewMode ? 'bg-gray-100 border-gray-200' : 'border-gray-300 focus:border-blue-400'} ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Regno" className="block text-gray-700 text-sm font-semibold mb-2">Registration No.</label>
                        <input
                            type="text"
                            id="Regno"
                            name="Regno"
                            value={formData.Regno}
                            onChange={handleChange}
                            readOnly={isViewMode}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${isViewMode ? 'bg-gray-100 border-gray-200' : 'border-gray-300 focus:border-blue-400'} ${errors.Regno ? 'border-red-500' : ''}`}
                        />
                        {errors.Regno && <p className="text-red-500 text-xs mt-1">{errors.Regno}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ClassName" className="block text-gray-700 text-sm font-semibold mb-2">Class Name</label>
                        <input
                            type="text"
                            id="ClassName"
                            name="ClassName"
                            value={formData.ClassName}
                            onChange={handleChange}
                            readOnly={isViewMode}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${isViewMode ? 'bg-gray-100 border-gray-200' : 'border-gray-300 focus:border-blue-400'}`}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="Phone" className="block text-gray-700 text-sm font-semibold mb-2">Phone</label>
                        <input
                            type="text"
                            id="Phone"
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleChange}
                            readOnly={isViewMode}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${isViewMode ? 'bg-gray-100 border-gray-200' : 'border-gray-300 focus:border-blue-400'}`}
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        {!isViewMode && (
                            <button
                                type="submit"
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:scale-95 transition-all duration-200 shadow-md"
                            >
                                {modalMode === 'add' ? 'Add Student' : 'Save Changes'}
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-md"
                        >
                            {isViewMode ? 'Close' : 'Cancel'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
