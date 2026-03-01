import { createContext, useContext } from "react";
import { useTestCases } from "../hooks/useTestCases";

const TestCaseContext = createContext();

export function TestCaseProvider({ children }) {
  const testCaseData = useTestCases();

  return (
    <TestCaseContext.Provider value={testCaseData}>
      {children}
    </TestCaseContext.Provider>
  );
}

export function useTestCaseContext() {
  const context = useContext(TestCaseContext);
  if (!context) {
    throw new Error(
      "useTestCaseContext must be used within a TestCaseProvider",
    );
  }
  return context;
}
