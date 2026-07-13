const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 className="text-white fw-bold mb-1">{title}</h2>

        <p className="text-secondary mb-0">{subtitle}</p>
      </div>

    </div>
  );
};

export default PageHeader;
