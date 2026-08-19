import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadCampaignData } from "../data/campaignData";

export default function CandidatePage() {
    const { districtId } = useParams();
    const baseUrl = import.meta.env.BASE_URL;
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        let disposed = false;

        async function loadCandidate() {
            try {
                const { candidates } = await loadCampaignData(baseUrl);
                const match = candidates[districtId] ?? null;

                if (!disposed) {
                    setCandidate(match);
                }
            } catch (error) {
                console.error(error);
            }
        }

        loadCandidate();

        return () => {
            disposed = true;
        };
    }, [baseUrl, districtId]);

    return (
        <section className="content-page">
            <article className="content-card">
                <h1>{candidate?.name || `Кандидат округа №${districtId}`}</h1>
                {candidate ? (
                    <div className="content-grid">
                        <p>{candidate.region}</p>
                        <p>{candidate.bio}</p>
                        <p>Партия: {candidate.party}</p>
                    </div>
                ) : (
                    <p>
                        Страница кандидата может использоваться как отдельный SEO-адрес и
                        детальный текстовый профиль.
                    </p>
                )}
            </article>
        </section>
    );
}
