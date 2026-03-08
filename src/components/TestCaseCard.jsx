import React from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import { STATUS_STYLES } from "../constants/status";

export default function TestCaseCard({ testCase, onEdit, showDelete = false }) {
  const { deleteTestCase } = useTestCaseContext();

  const statusStyle = STATUS_STYLES[testCase.status] || {
    backgroundColor: "#ccc",
    color: "#fff",
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test case?",
    );

    if (confirmDelete) {
      deleteTestCase(testCase.id);
    }
  };

  return (
    <div
      style={{
        ...cardStyle,
        borderLeft: `5px solid ${statusStyle.backgroundColor}`,
      }}
    >
      <div style={headerStyle}>
        <h3>{testCase.title}</h3>
        <span style={{ ...statusBadgeStyle, ...statusStyle }}>
          {testCase.status}
        </span>
      </div>

      <p>{testCase.description || "No description"}</p>

      <div style={buttonWrapperStyle}>
        {onEdit && (
          <button style={editButtonStyle} onClick={() => onEdit(testCase)}>
            Edit
          </button>
        )}

        {showDelete && (
          <button style={deleteButtonStyle} onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

// 🎨 Styles
const cardStyle = {
  backgroundColor: "#fff",
  padding: "15px 20px",
  borderRadius: "12px",
  marginBottom: "15px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

const statusBadgeStyle = {
  color: "#fff",
  padding: "2px 10px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "bold",
};

const buttonWrapperStyle = {
  marginTop: "10px",
  display: "flex",
  gap: "10px",
};

const editButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
