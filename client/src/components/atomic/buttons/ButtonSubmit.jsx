import PropTypes from "prop-types";

function ButtonSubmit({ apply, name, onClick = () => {} }) {
  return (
    <button
      className={`${apply} buttonAnimate`}
      type="submit"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

ButtonSubmit.propTypes = {
  apply: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.func,
};

export default ButtonSubmit;
