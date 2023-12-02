import "./loading.css";
import LoadingGif from "../../assets/loading.gif";

export default function Loading({}) {
    return (
        <div className="loading">
            <img src={LoadingGif} alt="loading" />
        </div>
    )
}