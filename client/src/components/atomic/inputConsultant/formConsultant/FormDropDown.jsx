import PropTypes from "prop-types";

export default function FormDropDown({
  id,
  label,
  name,
  multiple,
  options,
  handleChange,
}) {

  return (
    <label
      className="w-[34rem] flex flex-col mb-4 gap-4 text-[var(--primary-color)] font-medium max-sm:w-64 max-md:w-96 max-md:text-base max-md:font-normal "
      htmlFor={id}
    >
      {label}
      <select
        className="border-2 outline-[var(--primary-color)] rounded-s px-2 text-[var(--text-color)]"
        id={id}
        name={name}
        onChange={handleChange}
        multiple={multiple}
      >
        {!multiple ? (
          <option value={null} className="h-12">
            Choisissez une option
          </option>
        ) : (
          <option
            value={null}
            className="h-8 scrollbar-thumb-[var(--primary-color)] scrollbar-track-[var(--primary-color)]"
          >
            Choisissez vos options
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

FormDropDown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};
