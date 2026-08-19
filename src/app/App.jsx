import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

export default function App() {
    const baseUrl = import.meta.env.BASE_URL;

    return (
        <BrowserRouter basename={baseUrl}>
            <AppRoutes />
        </BrowserRouter>
    );
}
