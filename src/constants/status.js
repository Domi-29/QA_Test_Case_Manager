export const TEST_CASE_STATUS = {
  PASSED: "passed",
  FAILED: "failed",
  BLOCKED: "blocked",
};

export const STATUS_STYLES = {
  [TEST_CASE_STATUS.PASSED]: {
    backgroundColor: "#16a34a",
    color: "white",
  },
  [TEST_CASE_STATUS.FAILED]: {
    backgroundColor: "#dc2626",
    color: "white",
  },
  [TEST_CASE_STATUS.BLOCKED]: {
    backgroundColor: "#f97316",
    color: "white",
  },
};
