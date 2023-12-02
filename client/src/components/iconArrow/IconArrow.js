import "./IconArrow.css";
import PropTypes from "prop-types";
import classNames from "classnames";

const IconArrow = (props) => {
    const { rootClassName, className } = props;
    const classes = classNames(rootClassName || css.root, className);
    
    return (
        <svg
            className={classes}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            aria-hidden="true"
        >
            <g fillRule="evenodd">
                <path className={css.linePath} d="M0 5h7"></path>
                <path className={css.tipPath} d="M1 1l4 4-4 4"></path>
            </g>
        </svg>
    );
};

const { string } = PropTypes;

IconArrow.defaultProps = {
    rootClassName: null,
    className: null
};

IconArrow.propTypes = {
    rootClassName: string,
    className: string
};

export default IconArrow;