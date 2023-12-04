import PropTypes from "prop-types";

const Image = (props) => {
    const { className, src, alt } = props;

    if (!src || !alt) {
        throw new Error("You need to pass src and alt props to Image component.");
    };

    return <img className={className} src={src} alt={alt} />;
};

const { string } = PropTypes;

Image.defaultProps = {
    className: null,
    src: null,
    alt: null
};

Image.propTypes = {
    className: string,
    src: string.isRequired,
    alt: string.isRequired
};

export default Image;