import PropTypes from "prop-types";

export default function FormInputCandidat({
  id,
  label,
  type,
  handleChange,
  name,
  value,
  placeholder,
}) {
  return (
    <label
      className="w-[34rem] flex flex-col mb-4 gap-4 text-[var(--primary-color)] font-medium max-sm:w-64 max-md:w-96 max-md:text-base max-md:font-normal "
      htmlFor={id}
    >
      {label}
      {type === "textarea" ? (
        <textarea
          className="h-72 border-2 outline-[var(--primary-color)] rounded-s px-2 py-2 text-[var(--text-color)]"
          id={id}
          name={name}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="h-12 border-2 outline-[var(--primary-color)] rounded-s px-2 text-[var(--text-color)]"
          id={id}
          name={name}
          type={type}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

FormInputCandidat.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  placeholder: PropTypes.string,
};

FormInputCandidat.defaultProps = {
  placeholder: "",
};
