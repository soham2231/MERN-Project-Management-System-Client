// const SearchInput = ({ value, onChange, placeholder }) => {
//   return (
//     <input
//       className="form-control bg-dark text-light border-secondary"
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//     />
//   );
// };

// export default SearchInput;

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      className="form-control search-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;