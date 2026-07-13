import SearchInput from "./SearchInput";

const TableToolbar = ({ search, setSearch, button, children }) => {
  return (
    <div className="table-toolbar">
      <div className="toolbar-left">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Projects..."
        />

        {children}
      </div>

      <div className="toolbar-right">{button}</div>
    </div>
  );
};

export default TableToolbar;
