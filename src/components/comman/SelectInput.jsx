const SelectInput = ({ value, onChange, options }) => {
  return (
    <select
      className="form-select search-input"
      value={value}
      onChange={onChange}
      style={{ width: "180px" }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
