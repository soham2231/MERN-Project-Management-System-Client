const DataTable = ({ headers, children }) => {
  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="table table-dark custom-table align-middle mb-0">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
