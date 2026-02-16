import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="text-center mt-20 text-white">
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link to='/' className="text-blue-500 hover:underline">
                ← Go back to Home
            </Link>
        </div>
    );
}

export default NotFound;