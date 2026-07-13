const StatusBadge = ({ status }) => {
  const statusConfig = {
    Completed: {
      bg: "#22C55E",
      text: "Completed",
    },
    Pending: {
      bg: "#F59E0B",
      text: "Pending",
    },
    "In Progress": {
      bg: "#06B6D4",
      text: "In Progress",
    },
  };

  const current = statusConfig[status] || {
    bg: "#6B7280",
    text: status,
  };

  return (
    <span
      style={{
        background: current.bg,
        color: "#fff",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
      }}
    >
      {current.text}
    </span>
  );
};

export default StatusBadge;
