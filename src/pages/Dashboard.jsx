// Dashboard.jsx
import { useState, useMemo } from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import { TEST_CASE_STATUS, STATUS_COLORS } from "../utils/constants";
import TestCaseCard from "./TestCaseCard";

function Dashboard() {
  const { testCases } = useTestCaseContext();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // -----------------------------
  // Memoizovaná filtrácia
  // -----------------------------
  const filteredCases = useMemo(() => {
    return testCases.filter(
      (tc) =>
        (filterStatus === "all" || tc.status === filterStatus) &&
        tc.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [testCases, filterStatus, search]);

  // -----------------------------
  // Memoizované počítanie statusov
  // -----------------------------
  const stats = useMemo(() => {
    return filteredCases.reduce((acc, tc) => {
      acc[tc.status] = (acc[tc.status] || 0) + 1;
      return acc;
    }, {});
  }, [filteredCases]);

  return (
    <div style={dashboardStyle}>
      <h2 style={headerStyle}>Dashboard</h2>

      {/* Inputs */}
      <div style={inputContainerStyle}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="all">All</option>
          <option value={TEST_CASE_STATUS.PASSED}>Passed</option>
          <option value={TEST_CASE_STATUS.FAILED}>Failed</option>
          <option value={TEST_CASE_STATUS.BLOCKED}>Blocked</option>
        </select>
      </div>

      {/* Test Cases List */}
      <div style={{ marginTop: "16px" }}>
        {filteredCases.map((tc) => (
          <TestCaseCard key={tc.id} testCase={tc} />
        ))}
      </div>

      {/* Status Summary */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: "16px" }}>
        {Object.values(TEST_CASE_STATUS).map((status) => (
          <li key={status} style={{ margin: "4px 0", fontSize: "1.05em" }}>
            <span
              style={{
                color: "white",
                backgroundColor: STATUS_COLORS[status],
                padding: "4px 10px",
                borderRadius: "999px",
                textTransform: "capitalize",
              }}
            >
              {status}: {stats[status] || 0}
            </span>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "10px", color: "#555" }}>
        Total: {filteredCases.length}
      </p>
    </div>
  );
}

// -----------------------------
// Styles
// -----------------------------
const dashboardStyle = {
  padding: "20px",
  maxWidth: "700px",
  margin: "0 auto",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const headerStyle = {
  marginBottom: "12px",
  color: "#222",
};

const inputContainerStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "12px",
};

const inputStyle = {
  flex: 1,
  padding: "6px 10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

export default Dashboard;
