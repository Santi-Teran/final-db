const Select = ({ options, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="flex items-center justify-between py-1 px-4 rounded-full border-2 border-dark-gray shadow-1 shadow-yellow"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
