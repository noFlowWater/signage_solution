import { Link } from "react-router-dom";

const BacktoHome = () => {
    return (
        <Link to={"/"} style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary">
                Home
            </button>
        </Link>
    )
}

export default BacktoHome;