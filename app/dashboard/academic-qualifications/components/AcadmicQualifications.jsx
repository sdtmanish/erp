"use client";

import { useState, useEffect } from "react";
import DataTable from "../../components/table/DataTable";
import QualificationModal from "./popup/QualificationModal";
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
        console.log("Fetched Data:", Adata);
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
    setFormData({
      ...item,
      OldValue: item.acadqname, // original value
    });
    setShowModal(true);
  };

  const handleView = (item) => {
    setModalMode("view");
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (items) => {
    if (Array.isArray(items)) {
      setSelectedItem(items.map((i) => i.acadq_code)); // store IDs
    } else {
      setSelectedItem([items.acadq_code]);
    }
    setShowConfirm(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
  };

  const confirmDelete = async () => {
    if (!selectedItem || selectedItem.length === 0) return;

    try {
      // Call API for all selected IDs in parallel
      const responses = await Promise.all(
        selectedItem.map((id) =>
          fetch("http://dolphinapi.myportal.co.in/api/DelAcademicQualification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              APIKey: "Sdt!@#321",
            },
            body: JSON.stringify({ acadq_code: String(id) }),
          }).then(async (res) => {
            const result = await res.json();
            console.log("Delete response for", id, ":", result);
            if (!res.ok || result?.status === "error") {
              throw new Error(result?.message || `Failed to delete ${id}`);
            }
            return result;
          })
        )
      );

      console.log("✅ All deleted:", responses);

      // Update UI after all deletes succeed
      setData((prev) =>
        prev.filter((item) => !selectedItem.includes(item.acadq_code))
      );
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedItem(null);
      setShowConfirm(false);
    }
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
        setErrors={setErrors}
        handleCloseModal={handleCloseModal}
        onQualificationAdded={(savedQual) => {
          console.log("📌 Saved qualification:", savedQual);

          setData((prev) => {
            if (modalMode === "add") {
              return [...prev, savedQual];
            } else if (modalMode === "edit") {
              return prev.map((item) =>
                item.acadq_code === savedQual.acadq_code ? savedQual : item
              );
            }
            return prev;
          });
        }}
      />

      <ConfirmModal
        isOpen={showConfirm}
        message={
          !selectedItem
            ? "Are you sure you want to delete?"
            : selectedItem.length === 1
            ? `Are you sure you want to delete "${
                data.find((d) => String(d.acadq_code) === String(selectedItem[0]))
                  ?.acadqname || "this item"
              }"?`
            : `Are you sure you want to delete ${selectedItem.length} items?`
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
