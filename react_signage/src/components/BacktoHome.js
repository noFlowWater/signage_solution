import { Link } from "react-router-dom/cjs/react-router-dom.min"

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