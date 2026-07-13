const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    High: "#EF4444",
    Medium: "#F59E0B",
    Low: "#22C55E",
  };

  return (
    <span
      style={{
        background: priorityConfig[priority] || "#6B7280",
        color: "#fff",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
      }}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;