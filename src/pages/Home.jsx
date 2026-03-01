import { useMemo } from "react";
import { useTestCaseContext } from "../context/TestCaseContext";
import { TEST_CASE_STATUS, STATUS_COLORS } from "../utils/constants";

function Home() {
  const { testCases, updateTestCase, deleteTestCase } = useTestCaseContext();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTestCases = useMemo(() => {
    return testCases
      .filter((tc) =>
        selectedStatus === "ALL" ? true : tc.status === selectedStatus,
      )
      .filter((tc) => tc.title.toLowerCase().includes(search.toLowerCase()));
  }, [testCases, selectedStatus, search]);

  return (
    <div>
      <h2>Home</h2>

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

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredCases.map((tc) => (
          <li
            key={tc.id}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>
              <strong>{tc.title}</strong>{" "}
              <span
                style={{
                  color: "white",
                  backgroundColor: STATUS_COLORS[tc.status],
                  padding: "2px 6px",
                  borderRadius: "4px",
                  textTransform: "capitalize",
                  fontSize: "0.85em",
                  marginLeft: "10px",
                }}
              >
                {tc.status}
              </span>
            </span>
            <span>
              <button
                onClick={() =>
                  updateTestCase(tc.id, { status: TEST_CASE_STATUS.PASSED })
                }
                style={{ marginRight: "5px" }}
              >
                ✅
              </button>
              <button
                onClick={() =>
                  updateTestCase(tc.id, { status: TEST_CASE_STATUS.FAILED })
                }
                style={{ marginRight: "5px" }}
              >
                ❌
              </button>
              <button
                onClick={() =>
                  updateTestCase(tc.id, { status: TEST_CASE_STATUS.BLOCKED })
                }
                style={{ marginRight: "5px" }}
              >
                ⏸️
              </button>
              <button onClick={() => deleteTestCase(tc.id)}>🗑️</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
