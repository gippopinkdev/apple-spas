import { NavLink } from "react-router-dom";
import "../../styles/layout.css";

export default function Header() {
    return (
        <header className="site-header">
            <div className="site-header-inner">
                <NavLink to="/" className="site-logo">
                    Яблочный спас
                </NavLink>

                <nav className="site-nav">
                    <NavLink to="/" end>
                        Главная
                    </NavLink>

                    <NavLink to="/about">
                        О нас
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}