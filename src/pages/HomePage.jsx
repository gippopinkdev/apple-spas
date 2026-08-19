import { useEffect, useState } from "react";
import MapView from "../features/map/MapView";
import CandidatePanel from "../features/candidates/CandidatePanel";
import { loadCampaignData } from "../data/campaignData";

export default function HomePage() {
    const baseUrl = import.meta.env.BASE_URL;
    const [selectedId, setSelectedId] = useState(null);
    const [districtMap, setDistrictMap] = useState({});
    const [candidates, setCandidates] = useState({});

    useEffect(() => {
        let disposed = false;

        async function loadData() {
            try {
                const data = await loadCampaignData(baseUrl);

                if (disposed) {
                    return;
                }

                setDistrictMap(data.districtMap);
                setCandidates(data.candidates);
            } catch (error) {
                console.error(error);
            }
        }

        loadData();

        return () => {
            disposed = true;
        };
    }, [baseUrl]);

    const selectedCandidate = selectedId
        ? candidates[selectedId] || { district: selectedId }
        : null;

    return (
        <section className="home-page">
            <header className="home-hero">
                <h1>
                    Яблочный спас:
                    <br />
                    собираем кандидатов за мир
                </h1>
                <p>
                    Найдите кандидата за мир в своём одномандатном округе.
                </p>
            </header>

            <section className="home-map-card" aria-label="Election district map">
                <MapView
                    districtMap={districtMap}
                    candidates={candidates}
                    onSelectDistrict={setSelectedId}
                />
            </section>

            <CandidatePanel
                candidate={selectedCandidate}
                isOpen={Boolean(selectedId)}
                onClose={() => setSelectedId(null)}
            />
        </section>
    );
}
