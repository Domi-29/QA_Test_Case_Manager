import { useState, useEffect } from "react";
import { TEST_CASE_STATUS } from "../utils/constants";

const STORAGE_KEY = "qa-test-cases";

export function useTestCases() {
  const [testCases, setTestCases] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testCases));
  }, [testCases]);

  const addTestCase = (newTestCase) => {
    setTestCases((prev) => [
      ...prev,
      { ...newTestCase, status: TEST_CASE_STATUS.BLOCKED },
    ]);
  };

  const updateTestCase = (id, updatedData) => {
    setTestCases((prev) =>
      prev.map((tc) => (tc.id === id ? { ...tc, ...updatedData } : tc)),
    );
  };

  const deleteTestCase = (id) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  return {
    testCases,
    addTestCase,
    updateTestCase,
    deleteTestCase,
  };
}
