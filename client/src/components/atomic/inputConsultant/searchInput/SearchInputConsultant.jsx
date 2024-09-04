import PropTypes from "prop-types";
import IconSearch from "../../../../assets/images/ICONSEARCH.svg";

export default function SearchInputConsultant({
  id =0,
  placeholder,
  value,
  onChange,
}) {
  return (
    <label
      className=" text-[0] relative flex items-center w-[37rem] h-24 max-sm:w-64 max-sm:h-14"
      htmlFor={id}
    >
      Search
      <input
        className="text-sm bg-[var(--secondary-background-color)] w-full h-full pl-12 pr-4 rounded-lg outline-[var(--primary-color)]"
        id={id}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <img
        src={IconSearch}
        alt="logo recherche"
        className="absolute left-4 w-6 h-6"
      />
    </label>
  );
}

SearchInputConsultant.propTypes = {
  // eslint-disable-next-line react/require-default-props
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
