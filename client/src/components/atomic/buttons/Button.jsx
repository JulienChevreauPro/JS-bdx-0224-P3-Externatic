import PropTypes from "prop-types";

function Button({ name, img = null, apply, handleChange = () => {}, buttonAnimate = true }) {
  return (
    <button
      onClick={handleChange}
      className={`${apply} ${buttonAnimate}`}
      type="button"
    >
      {name}
      {img && <img src={img} alt={name} className="w-4" />}
    </button>
  );
}
Button.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,]).isRequired,
  // eslint-disable-next-line react/require-default-props
  img: PropTypes.string,
  apply: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  handleChange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  buttonAnimate: PropTypes.bool,
};

export default Button;
