import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTestCaseContext } from "../context/TestCaseContext";
import { TEST_CASE_STATUS } from "../constants/status";

function AddTestCase() {
  const { addTestCase } = useTestCaseContext();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    // Pridáme nový test case s default statusom BLOCKED
    const newTestCase = {
      id: Date.now(),
      title,
      status: TEST_CASE_STATUS.BLOCKED, // default status
    };

    addTestCase(newTestCase);
    setTitle(""); // vyčistíme input
    navigate("/"); // presmerovanie späť na Home/Dashboard
  };

  return (
    <div>
      <h2>Add Test Case</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Test case title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTestCase;
