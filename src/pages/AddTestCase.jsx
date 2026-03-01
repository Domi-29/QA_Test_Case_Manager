import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTestCaseContext } from "../context/TestCaseContext";
import { TEST_CASE_STATUS } from "../utils/constants";

function AddTestCase() {
  const { addTestCase } = useTestCaseContext();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTestCase({ id: Date.now(), title, status: TEST_CASE_STATUS.BLOCKED });
    navigate("/");
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
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTestCase;
