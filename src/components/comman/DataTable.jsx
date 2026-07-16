const DataTable = ({ headers, children, title }) => {
  return (
    <div className="table-card mb-2">
      {title && <div className="table-title">{title}</div>}

      <div className="table-responsive ">
        <table className="table custom-table align-middle mb-0">
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
