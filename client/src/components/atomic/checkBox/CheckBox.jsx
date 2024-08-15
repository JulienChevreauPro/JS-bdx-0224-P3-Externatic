import PropTypes from "prop-types";

function CheckBox({ apply, labelContent }) {
  return (
    <label>
      <input
        type="checkbox"
        className={` ${apply} accent-[var(--primary-color)] hover:accent-[var(--primary-color)] mr-4 align-middle`}
      />
      {labelContent}
    </label>
  );
}

CheckBox.propTypes = {
  apply: PropTypes.string.isRequired,
  labelContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,]).isRequired,
};

export default CheckBox;
