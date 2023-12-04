import "./IconArrow.css";

const IconArrow = ({className}) => {

    if (!className) {
        throw new Error("You need to pass a className prop to IconArrow component.");
    };
    
    return (
        <svg
            className={`arrowIcon ${className}`}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            aria-hidden="true"
        >
            <g fillRule="evenodd">
                <path className="linePath" d="M0 5h7"></path>
                <path className="tipPath" d="M1 1l4 4-4 4"></path>
            </g>
        </svg>
    );
};


export default IconArrow;