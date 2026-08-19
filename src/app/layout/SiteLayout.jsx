import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../../styles/layout.css";

export default function SiteLayout() {
    return (
        <div className="site-shell">
            <Header />
            <main className="site-main">
                <Outlet />
            </main>

            <a
                className="site-github-corner"
                href="https://github.com/gippopinkdev/apple-spas"
                target="_blank"
                rel="noreferrer"
            >
                Данный проект доступен на GitHub
            </a>
        </div>
    );
}
