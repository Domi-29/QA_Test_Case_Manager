import { useState, useMemo } from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import { TEST_CASE_STATUS } from "../constants/status";
import TestCaseCard from "../components/TestCaseCard";
import StatusBadge from "../components/StatusBadge";

function Dashboard() {
  const { testCases } = useTestCaseContext();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCases = useMemo(() => {
    return testCases.filter(
      (tc) =>
        (filterStatus === "all" || tc.status === filterStatus) &&
        tc.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [testCases, filterStatus, search]);

  const stats = useMemo(() => {
    return filteredCases.reduce((acc, tc) => {
      acc[tc.status] = (acc[tc.status] || 0) + 1;
      return acc;
    }, {});
  }, [filteredCases]);

  return (
    <div style={dashboardStyle}>
      <h2 style={headerStyle}>Dashboard</h2>

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

      <div style={{ marginTop: "16px" }}>
        {filteredCases.map((tc) => (
          <TestCaseCard key={tc.id} testCase={tc} />
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "16px" }}>
        {Object.values(TEST_CASE_STATUS).map((status) => (
          <li key={status} style={{ margin: "4px 0", fontSize: "1.05em" }}>
            <StatusBadge status={status} />: {stats[status] || 0}
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "10px", color: "#555" }}>
        Total: {filteredCases.length}
      </p>
    </div>
  );
}
