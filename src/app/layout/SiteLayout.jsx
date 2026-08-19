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
        </div>
    );
}
