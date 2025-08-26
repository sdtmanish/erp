"use client";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaBackwardStep, FaForwardStep, FaTrash } from "react-icons/fa6";

import { FaRegEye } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import { PiEye } from 'react-icons/pi';
import { MdAddToPhotos } from "react-icons/md";
import Image from "next/image";

export default function DataTable({ data = [], error, columns = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(columns[0]?.key || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ✅ Filter based on search term across all columns
  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.key] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  // ✅ Dynamic sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    const valA = a[sortColumn];
    const valB = b[sortColumn];

    if (valA == null) return sortOrder === "asc" ? 1 : -1;
    if (valB == null) return sortOrder === "asc" ? -1 : 1;

    if (!isNaN(valA) && !isNaN(valB)) {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();
    if (strA < strB) return sortOrder === "asc" ? -1 : 1;
    if (strA > strB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rowsPerPage]);

  const handleSortChange = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(columnKey);
      setSortOrder("asc");
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((code) => code !== id)
        : [...prev, id]
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
      {/* Search Bar + Header */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-2xl shadow-md backdrop-blur-lg bg-white h-26 mb-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-white border border-gray-300 rounded-xl h-10 pl-9 pr-3 text-md focus:outline-none focus:border-blue-400 w-full sm:w-auto min-w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Rows per page */}
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
          <button className="px-2 py-2 flex flex-row gap-1 bg-blue-500 rounded-lg text-white cursor-pointer hover:bg-blue-600 active:scale-95 active:bg-blue-800">
            Add New <MdAddToPhotos size={16} />
          </button>
          <button
            className={`flex flex-row gap-1 px-4 py-2 rounded-lg text-white cursor-pointer ${
              selectedItems.length
                ? "bg-red-600 hover:bg-red-700 active:scale-95 active:bg-red-800"
                : "bg-red-400 cursor-not-allowed"
            }`}
            disabled={!selectedItems.length}
          >
            Delete All <FaTrash size={14} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-primary rounded-2xl shadow-xl backdrop-blur-lg mt-4 px-4 pr-2">
        {/* Table Header */}
        <div className="grid grid-cols-[24px_minmax(200px,1fr)_minmax(100px,1fr)_minmax(70px,1fr)_minmax(140px,1fr)_minmax(120px,1fr)] items-center bg-[#fbfbfb] border-b border-gray-200 text-xs px-4 py-3 rounded-md">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-400 rounded accent-blue-500 cursor-pointer"
              checked={selectedItems.length === currentRows.length && currentRows.length > 0}
              onChange={() => {
                if (selectedItems.length === currentRows.length) {
                  setSelectedItems([]);
                } else {
                  setSelectedItems(currentRows.map((item) => item[columns[0].key]));
                }
              }}
            />
          </div>
          {columns.map((col) => (
            <div key={col.key} className="min-w-0">
              <p
                className="truncate cursor-pointer text-base"
                onClick={() => handleSortChange(col.key)}
              >
                {col.label} {sortColumn === col.key ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </p>
            </div>
          ))}
          <p className="text-center text-base">Actions</p>
        </div>

        {/* Table Rows */}
        {currentRows.length > 0 ? (
          currentRows.map((item) => (
            <div
              key={item[columns[0].key]}
              className="grid grid-cols-[24px_minmax(200px,1fr)_minmax(100px,1fr)_minmax(70px,1fr)_minmax(140px,1fr)_minmax(120px,1fr)] items-center border-b border-gray-200 text-xs px-4 py-2 h-12 hover:bg-emerald-100 rounded-md"
            >
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-400 rounded"
                  checked={selectedItems.includes(item[columns[0].key])}
                  onChange={() => handleCheckboxChange(item[columns[0].key])}
                />
              </div>
              {columns.map((col) => (
                <div key={col.key} className="min-w-0">
                  <p className="truncate">{item[col.key]}</p>
                </div>
              ))}
              <div className="flex gap-4 justify-center">
                <MdOutlineRemoveRedEye size={18} className="cursor-pointer" />
                <FaRegEdit size={18} className="cursor-pointer" />
                <Image src="/assets/icons/trash-bin.png" alt="Delete" width={18} height={18} className="cursor-pointer" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 col-span-full">No records found</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 pb-4 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-2 flex flex-row items-center gap-1 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 active:scale-95 text-white disabled:opacity-50"
            >
              <FaBackwardStep size={16} /> Prev
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
              Next <FaForwardStep size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
