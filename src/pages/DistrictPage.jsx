import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadCampaignData } from "../data/campaignData";

export default function DistrictPage() {
    const { districtId } = useParams();
    const baseUrl = import.meta.env.BASE_URL;
    const [district, setDistrict] = useState(null);

    useEffect(() => {
        let disposed = false;

        async function loadDistrict() {
            try {
                const { districtMap } = await loadCampaignData(baseUrl);
                const match = Object.values(districtMap).find(
                    (entry) => String(entry.number) === String(districtId)
                );

                if (!disposed) {
                    setDistrict(match ?? null);
                }
            } catch (error) {
                console.error(error);
            }
        }

        loadDistrict();

        return () => {
            disposed = true;
        };
    }, [baseUrl, districtId]);

    return (
        <section className="content-page">
            <article className="content-card">
                <h1>Округ №{districtId}</h1>
                {district ? (
                    <p>
                        {district.region}
                    </p>
                ) : (
                    <p>

                    </p>
                )}
            </article>
        </section>
    );
}
