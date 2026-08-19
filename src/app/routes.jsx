import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layout/SiteLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import DistrictPage from "../pages/DistrictPage";
import CandidatePage from "../pages/CandidatePage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<SiteLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="district/:districtId" element={<DistrictPage />} />
                <Route path="candidate/:districtId" element={<CandidatePage />} />
            </Route>
        </Routes>
    );
}
