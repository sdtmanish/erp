'use client'

import { useState, useEffect } from 'react'
import { Eye, Edit, Search, ChevronLeftCircle, ChevronRightCircle, PlusCircle, Trash2 } from 'lucide-react'; // Replaced react-icons with lucide-react
import Image from "next/image";
import { MdAddToPhotos, MdDeleteForever } from "react-icons/md"
import { FaTrash } from 'react-icons/fa';
import EmployeeFormModal from './components/EmployeeFormModal';

export default function AllEmployeeDetails() {
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add', 'view', 'modify'
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        email: '',
        contact: '',
        dob:'',
        designation:'',
    });
    const [errors, setErrors] = useState({});

    // This useEffect fetches all employee data when the component mounts.
    // It makes a POST request to a specified API endpoint.
    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                const allEmployees = await fetch('http://dolphinapi.myportal.co.in/api/DisplayAllEmployeeP', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        APIKey: 'Sdt!@#321',
                    },
                    body: JSON.stringify({})
                });

                if (!allEmployees.ok) {
                    throw new Error(`HTTP Error ${allEmployees.status}`);
                }
                const allEmployeesResult = await allEmployees.json();
                setEmployeeData(allEmployeesResult);
            } catch (err) {
                console.error("Failed to fetch employee data:", err);
                // In a real application, you might want to show an error message to the user.
            }
        };
        fetchAllEmployees();
    }, []);

    // This useEffect resets the current page to 1 whenever the search term or rows per page changes.
    // This ensures that the pagination is correct for the new data view.
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, rowsPerPage]);

    // Data filtering based on search term.
    const filteredData = employeeData.filter(
        (item) =>
            item.Name1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.EmployeeCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Contact?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Data sorting based on the employee name and current sort order (ascending/descending).
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

    // Opens the modal for adding a new employee, resetting form data and errors.
    const handleAddNew = () => {
        setModalMode('add');
        setSelectedEmployee(null);
        setFormData({ name: '', EmployeeCode: '', email: '', contact: '' });
        setErrors({});
        setShowModal(true);
    };

    // Opens the modal in view mode, populating the form with the selected employee's data.
    const handleView = async (employee) => {

        try{

            const employeeDetails = await fetch('http://dolphinapi.myportal.co.in/api/EmployeeDetailsP',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    APIKey: 'Sdt!@#321',
                },
                body:JSON.stringify({
                    UserId:employee.UserId,
                    UserType:employee.UserType
                })
            })

            if(!employeeDetails.ok){
                throw new Error(`HTTP  error ${employeeDetails.status}`);
            }

          const  employeeDetailsResult = await employeeDetails.json();
            console.log(employeeDetailsResult);
            const employeeData = employeeDetailsResult[0]
             setModalMode('view');
        setSelectedEmployee(employeeDetailsResult);
        setFormData({
            name: employeeData.Name1,
            employeeCode:employeeData.EmployeeCode,
            dob:employeeData.DOB,
            designation:employeeData.DesignationDescrription,
            gender: employeeData.Gender,
            email: employeeData.email,
            contact: employeeData.Contact
        });
        setShowModal(true);

        }catch(err){
            console.log(err);
        }

       
    };

    // Opens the modal in modify mode, populating the form with the selected employee's data.
    const handleModify = (employee) => {
        setModalMode('modify');
        setSelectedEmployee(employee);
        setFormData({
            name: employeeData.Name1,
            gender: employeeData.Gender,
            email: employeeData.email,
            contact: employeeData.Contact

        });
        setErrors({});
        setShowModal(true);
    };

    // Closes the modal and resets form data and errors.
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ name: '', EmployeeCode: '', email: '', contact: '' });
        setErrors({});
        setSelectedEmployee(null);
    };

    // Handles changes to the form input fields, updating the formData state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validates the form data, setting error messages if fields are empty.
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) { newErrors.name = 'Employee Name is required'; }
        if (!formData.EmployeeCode.trim()) { newErrors.EmployeeCode = 'Employee Code is required'; }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handles the submission of the form (add or modify).
    // In a real application, this would involve API calls to add or update employee data.
    const handleSubmit = async () => {
        if (!validateForm()) return;
        try {
            if (modalMode === 'add') {
                console.log('Adding new employee:', formData);
                // Example: await fetch('/api/addEmployee', { method: 'POST', body: JSON.stringify(formData) });
            } else if (modalMode === 'modify') {
                console.log('Modifying employee:', selectedEmployee.UserId, formData);
                // Example: await fetch(`/api/updateEmployee/${selectedEmployee.UserId}`, { method: 'PUT', body: JSON.stringify(formData) });
            }
            // After successful operation, refresh data or update state
            // For now, just closing the modal.
            handleCloseModal();
        } catch (err) {
            console.error("Error submitting form:", err);
            // Handle error (e.g., show an error message to the user)
        }
    };

    // Handles the deletion of a single employee record.
    // In a real application, this would involve an API call to delete the employee.
    const handleDelete = async (userId) => {
        try {
            console.log('Deleting employee with UserId:', userId);
            // Example: await fetch(`/api/deleteEmployee/${userId}`, { method: 'DELETE' });
            setEmployeeData((prev) => prev.filter((item) => item.UserId !== userId));
        } catch (err) {
            console.error("Error deleting employee:", err);
            // Handle error (e.g., show an error message to the user)
        }
    };

    // Handles the deletion of multiple selected employee records.
    const handleDeleteSelected = async () => {
        if (!selectedItems.length) {
            console.log('Please select at least one employee to delete.'); // Replaced alert
            return;
        }

        if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected employee(s)?`)) {
            try {
                await Promise.all(selectedItems.map((id) => handleDelete(id)));
                setSelectedItems([]); // Clear selections after deletion
                console.log('Selected employees deleted successfully.');
            } catch (err) {
                console.error('Error deleting selected employees:', err);
            }
        }
    };

    // Toggles the selection state of an employee checkbox.
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
        <div className="p-2 w-[96%] max-w-[1600px] bg-primary  mx-auto md:w-[90%] font-inter">
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

            {/* Employee Data Table */}
            <div className="bg-white rounded-2xl shadow-xl backdrop-blur-lg mt-4 px-4 py-2 overflow-x-auto">
                <div className="min-w-[700px]"> {/* Ensures horizontal scroll on small screens */}
                    {/* Table Header */}
                    <div className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem]
        sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[8rem_10rem_10rem_10rem_5rem] bg-[#fbfbfb] lg:text-base
        items-center justify-between border-b border-gray-300 mb-2 text-sm font-medium px-4 pt-4 pb-2 text-gray-800">
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
                        <p className="text-center">EMPLOYEE CODE</p>
                        <p className="text-center">EMAIL</p>
                        <p className="text-center">CONTACT</p>
                        <p className="text-center">ACTIONS</p>
                    </div>

                    {/* Table Rows */}
                    {currentRows.length > 0 ? (
                        currentRows.map((item) => (
                            <div
                                key={item.UserId}
                                className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem]  items-center justify-between
            sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[8rem_10rem_10rem_10rem_5rem] lg:text-sm
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
                                <p className="text-center truncate">{item.EmployeeCode}</p>
                                <p className="text-center truncate">{item.email}</p>
                                <p className="text-center truncate">{item.Contact}</p>
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

            {/* Employee Form Modal (Add/View/Modify) */}
            <EmployeeFormModal
                showModal={showModal}
                modalMode={modalMode}
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCloseModal={handleCloseModal}
            />
        </div>
    );
}

    

