import PropTypes from "prop-types";

function Tag({ text = null, apply }) {
  return (
    <p className={`px-2 text-center w-max max-md:text-base ${apply}`}>{text}</p>
  );
}

Tag.propTypes = {
  // eslint-disable-next-line react/require-default-props
  text: PropTypes.string,
  apply: PropTypes.string.isRequired,
};

export default Tag;
