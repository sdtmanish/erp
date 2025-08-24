"use client";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaBackwardStep, FaForwardStep, FaTrash } from "react-icons/fa6";
import { MdAddToPhotos } from "react-icons/md";
import Image from "next/image";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filterdData = data.filter(
    (item) =>
      item.acadqname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Remarks?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filterdData].sort((a, b) => {
    const nameA = a.acadqname.toLowerCase();
    const nameB = b.acadqname.toLowerCase();

    if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
    if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filterdData.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rowsPerPage]);

  const handleReverseSorting = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleCheckboxChange = (acadq_code) => {
    setSelectedItems((prev) =>
      prev.includes(acadq_code)
        ? prev.filter((code) => code !== acadq_code)
        : [...prev, acadq_code]
    );
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`h-10 w-10 rounded-full cursor-pointer flex items-center justify-center text-sm transition-colors duration-200
            ${
              currentPage === i
                ? "bg-[#8c28e1] text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
            disabled:opacity-90`}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="p-2 w-[96%] max-w-[1600px] bg-primary mx-auto md:w-[90%]">
      {/* Search Bar + Container Header */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-2xl shadow-md backdrop-blur-lg bg-white h-26 mb-4">
        {/* Search and Rows per page */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="bg-white border border-gray-300 rounded-xl h-10 pl-9 pr-3 text-md focus:outline-none focus:border-blue-400 w-full sm:w-auto min-w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="rowsPerPage" className="text-gray-700 text-sm">
              Rows per page:
            </label>
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
            className="px-2 py-2 flex flex-row gap-1 bg-blue-500 rounded-lg text-white cursor-pointer hover:bg-blue-600 active:scale-95 active:bg-blue-800"
          >
            Add New
            <MdAddToPhotos size={16} />
          </button>
          <button
            className={`flex flex-row gap-1 px-4 py-2 rounded-lg text-white cursor-pointer 
              ${
                selectedItems.length
                  ? "bg-red-600 hover:bg-red-700 active:scale-95 active:bg-red-800"
                  : "bg-red-400 cursor-not-allowed"
              }`}
            disabled={!selectedItems.length}
          >
            Delete All
            <FaTrash size={14} />
          </button>
        </div>
      </div>

      <div className="bg-primary rounded-2xl shadow-xl backdrop-blur-lg mt-4 px-4 pr-2">
        {/* Table Header */}
        <div
          className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem] items-center justify-between
            sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[12rem_8rem_8rem_10rem_5rem] lg:text-base bg-[#fbfbfb]
            border-b border-gray-200 text-xs px-4 py-3 rounded-md"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-400 rounded accent-blue-500 cursor-pointer"
              checked={
                selectedItems.length === currentRows.length &&
                currentRows.length > 0
              }
              onChange={() => {
                if (selectedItems.length === currentRows.length) {
                  setSelectedItems([]);
                } else {
                  setSelectedItems(currentRows.map((item) => item.acadq_code));
                }
              }}
            />
            <p>NAME</p>
            <button
              className="cursor-pointer p-1 rounded-full hover:bg-gray-200 active:scale-90 transition-all duration-200"
              onClick={handleReverseSorting}
            >
              <Image
                src="/assets/asc-desc-icon.png"
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
        {/* Data Rows */}
        {currentRows.length > 0 ? (
          currentRows.map((item) => (
            <div
              key={item.acadq_code}
              className="grid grid-cols-[12rem_10rem_6rem_10rem_5rem] items-center justify-between
                sm:grid-cols-[6rem_3rem_2rem_6rem_5rem] lg:grid-cols-[12rem_10rem_6rem_10rem_5rem] lg:text-sm
                border-b border-gray-200 text-xs px-4 py-3 hover:bg-emerald-100 rounded-md"
            >
              <div className="flex flex-row gap-2 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-400 rounded"
                  checked={selectedItems.includes(item.acadq_code)}
                  onChange={() => handleCheckboxChange(item.acadq_code)}
                />
                <p>{item.acadqname}</p>
              </div>
              <p className="text-center">{item.Remarks}</p>
              <p className="text-center">{item.Preference}</p>
              <p className="text-center">{item.Equalification}</p>
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/view.png"
                  alt="View"
                  width={18}
                  height={18}
                  className="cursor-pointer"
                />
                <Image
                  src="/assets/icons/edit.png"
                  alt="Edit"
                  width={18}
                  height={18}
                  className="cursor-pointer"
                />
                <Image
                  src="/assets/icons/trash-bin.png"
                  alt="Delete"
                  width={18}
                  height={18}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 col-span-full">
            No records found
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 pb-4 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-2 flex flex-row items-center gap-1 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 active:scale-95 text-white disabled:opacity-50"
            >
              <FaBackwardStep size={16} />
              Prev
            </button>
            <button
              onClick={() => handlePageChange(1)}
              className="h-10 w-10 mx-1 rounded-full flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              «
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="h-10 w-10 mx-1 rounded-full flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              »
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-2 py-2 flex flex-row items-center gap-1 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 active:scale-95 text-white disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
              <FaForwardStep size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
