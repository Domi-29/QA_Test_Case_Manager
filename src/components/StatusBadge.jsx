import { STATUS_STYLES } from "../constants/status";

const StatusBadge = ({ status }) => {
  return (
    <span
      style={{
        ...badgeStyle,
        ...STATUS_STYLES[status],
      }}
    >
      {status}
    </span>
  );
};

const badgeStyle = {
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "bold",
};

export default StatusBadge;
