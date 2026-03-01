export const TEST_CASE_STATUS = {
  PASSED: "passed",
  FAILED: "failed",
  BLOCKED: "blocked",
};

export const STATUS_COLORS = {
  [TEST_CASE_STATUS.PASSED]: "green",
  [TEST_CASE_STATUS.FAILED]: "red",
  [TEST_CASE_STATUS.BLOCKED]: "orange",
};
