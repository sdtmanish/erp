"use client";

import { useState, useEffect } from "react";
import DataTable from "../../components/table/DataTable";
import QualificationModal from "./popup/QualificationModal"
import ConfirmModal from "./popup/ConfirmModal";

export default function AcadmicQualifications() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
 const [selectedItem, setSelectedItem] = useState(null);
 
  // modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit" | "view"
  const [formData, setFormData] = useState({
    acadqname: "",
    Remarks: "",
    Equalification: "",
    Preference: "",
  });
  const [errors, setErrors] = useState({});
   const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchAcadData = async () => {
      try {
        const AcadData = await fetch(
          "http://dolphinapi.myportal.co.in/api/DisAcademicQualifications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              APIKey: "Sdt!@#321",
            },
            body: JSON.stringify({}),
          }
        );

        if (!AcadData.ok) {
          throw new Error(`HTTP ERROR ${AcadData.status}`);
        }

        const Adata = await AcadData.json();
        console.log(Adata);
        setData(Adata);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAcadData();
  }, []);

  // Handlers
  const handleAdd = () => {
    setModalMode("add");
    setFormData({ acadqname: "", Remarks: "", Equalification: "", Preference: "" });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode("edit");
    setFormData(item);
    setShowModal(true);
  };

  const handleView = (item) => {
    setModalMode("view");
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);     // save which row to delete
    setShowConfirm(true);      // open modal
  };

  
  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
  };

    const confirmDelete = () => {
    if (selectedItem) {
      // remove selectedItem from data
      setData((prev) => prev.filter((item) => item !== selectedItem));
      console.log("Deleted:", selectedItem);
    }
    setSelectedItem(null);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    console.log("Cancel delete");
    setSelectedItem(null);
    setShowConfirm(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // simple validation example
    const newErrors = {};
    if (!formData.acadqname) newErrors.acadqname = "Qualification name required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    

    if (modalMode === "add") {
      setData((prev) => [...prev, formData]);
    } else if (modalMode === "edit") {
      setData((prev) =>
        prev.map((item) =>
          item.acadqname === formData.acadqname ? formData : item
        )
      );
    }

    handleCloseModal();
  };

  return (
    <div>
      <DataTable
        data={data}
        error={error}
        columns={[
          { key: "acadqname", label: "Name" },
          { key: "Remarks", label: "Remarks" },
          { key: "Preference", label: "Preference" },
          { key: "Equalification", label: "Equalification" },
        ]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Inject your modal here */}
      <QualificationModal
        showModal={showModal}
        modalMode={modalMode}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        onQualificationAdded={(newQual) => {
    console.log("📌 Adding qualification to table:", newQual);
    setData((prev) => [...prev, newQual]);
  }}
      />

     <ConfirmModal
  isOpen={showConfirm}
  message={`Are you sure you want to delete "${selectedItem?.acadqname}"?`}
  onConfirm={confirmDelete}   // ✅ passing actual function
  onCancel={cancelDelete}     // ✅ passing actual function
/>

    </div>
  );
}
