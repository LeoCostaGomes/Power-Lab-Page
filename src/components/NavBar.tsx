import { Link } from "react-router";
import "./NavBar.css";

export default function NavBar() {
    return (
        <header className="NavBar">
            <div className="logo-placeholder">PowerLab</div>

            <nav className="links">
                <Link to="/">Página Inicial</Link>
                <Link to="/wiki">Wiki</Link>
            </nav>

            <div className="UserMenuWrapper">
                <button
                    type="button"
                    className="user-icon-btn"
                    id="userMenuBtn"
                    aria-label="Menu do usuário"
                >
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.5h19.6v-2.5c0-3.3-6.5-4.9-9.8-4.9z" />
                    </svg>
                </button>

                <div className="UserDropdown" id="userDropdown"></div>
            </div>
        </header>
    );
}