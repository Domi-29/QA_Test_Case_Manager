import React from "react";
import StatusBadge from "./StatusBadge";

const TestCaseCard = React.memo(({ testCase }) => {
  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{testCase.title}</h3>
        <StatusBadge status={testCase.status} />
      </div>

      <p style={descriptionStyle}>{testCase.description || "No description"}</p>
    </div>
  );
});

const cardStyle = {
  padding: "12px 16px",
  margin: "8px 0",
  borderRadius: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
  border: "1px solid #e0e0e0",
  transition: "transform 0.1s ease-in-out",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "6px",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.1rem",
  color: "#333",
  fontWeight: "600",
};

const descriptionStyle = {
  margin: 0,
  fontSize: "0.9rem",
  color: "#666",
};

export default TestCaseCard;
