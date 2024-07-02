import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PreviousPage({ source }) {
  return (
    <Link
      to={source}
      className="flex mt-10 gap-2 content-center font-medium text-[var(--secondary-color)] text-xl hover:text-[var(--primary-color)] duration-300 group"
    >
      <svg
        className=" self-center"
        width="21"
        height="16"
        viewBox="0 0 21 16"
        fill="#851342"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="group-hover:fill-[var(--primary-color)] duration-300"
          d="M7.33087 2.12442C7.72803 1.639 7.72857 0.851337 7.33209 0.365108C6.9356 -0.121122 6.29222 -0.121785 5.89507 0.363615L7.33087 2.12442ZM0.298228 7.20403C-0.0989292 7.68953 -0.0994708 8.47708 0.297009 8.96341C0.693503 9.44957 1.33687 9.45024 1.73403 8.9649L0.298228 7.20403ZM1.71141 7.17733C1.30215 6.70709 0.659103 6.7323 0.275115 7.23323C-0.108873 7.73432 -0.0884017 8.52153 0.320854 8.99161L1.71141 7.17733ZM5.91769 15.4207C6.32695 15.8909 6.97 15.8657 7.35398 15.3648C7.73797 14.8637 7.7175 14.0765 7.30824 13.6064L5.91769 15.4207ZM1.01613 6.84045C0.454942 6.84045 1.18369e-06 7.39744 1.18369e-06 8.08447C1.18369e-06 8.7715 0.454942 9.32849 1.01613 9.32849V6.84045ZM15.0658 8.08447V9.32849H15.0689L15.0658 8.08447ZM18.9677 14.0742C18.9692 14.7612 19.4255 15.3165 19.9867 15.3147C20.5479 15.3129 21.0015 14.7542 21 14.0672L18.9677 14.0742ZM5.89507 0.363615L0.298228 7.20403L1.73403 8.9649L7.33087 2.12442L5.89507 0.363615ZM0.320854 8.99161L5.91769 15.4207L7.30824 13.6064L1.71141 7.17733L0.320854 8.99161ZM1.01613 9.32849H15.0658V6.84045H1.01613V9.32849ZM15.0689 9.32849C16.1 9.32467 17.0901 9.82245 17.8213 10.7125L19.2542 8.94815C18.1406 7.59283 16.6329 6.83464 15.0627 6.84045L15.0689 9.32849ZM17.8213 10.7125C18.5525 11.6026 18.9649 12.8117 18.9677 14.0742L21 14.0672C20.9957 12.1449 20.3677 10.3035 19.2542 8.94815L17.8213 10.7125Z"
          fill="#851342"
        />
      </svg>
      Retour
    </Link>
  );
}

PreviousPage.propTypes = {
  source: PropTypes.string.isRequired,
};

export default PreviousPage;
