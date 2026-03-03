import { useState, useMemo } from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import { TEST_CASE_STATUS, STATUS_STYLES } from "../constants/status";
import TestCaseCard from "../components/TestCaseCard";

function Home() {
  const { testCases } = useTestCaseContext();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTestCases = useMemo(() => {
    return testCases
      .filter((tc) =>
        filterStatus === "all" ? true : tc.status === filterStatus,
      )
      .filter((tc) => tc.title.toLowerCase().includes(search.toLowerCase()));
  }, [testCases, filterStatus, search]);

  return (
    <div>
      <h2>Home</h2>

      {/* Search + Filter */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="all">All</option>
        <option value={TEST_CASE_STATUS.PASSED}>Passed</option>
        <option value={TEST_CASE_STATUS.FAILED}>Failed</option>
        <option value={TEST_CASE_STATUS.BLOCKED}>Blocked</option>
      </select>

      {/* Test Cases */}
      <div style={{ marginTop: "20px" }}>
        {filteredTestCases.map((tc) => (
          <TestCaseCard
            key={tc.id}
            testCase={tc}
            style={{ ...STATUS_STYLES[tc.status] }} // pridanie farby podľa statusu
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
