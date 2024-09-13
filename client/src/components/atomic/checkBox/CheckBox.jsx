import PropTypes from "prop-types";

function CheckBox({
  id,
  apply,
  labelContent,
  checked,
  onChange,
  required = false,
}) {
  return (
    <label>
      <input
        type="checkbox"
        id={id}
        className={` ${apply} accent-[var(--primary-color)] hover:accent-[var(--primary-color)] mr-4 align-middle`}
        checked={checked}
        onChange={onChange}
        required={required}
      />
      {labelContent}
    </label>
  );
}

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  apply: PropTypes.string.isRequired,
  labelContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  required: PropTypes.bool,
};

export default CheckBox;
