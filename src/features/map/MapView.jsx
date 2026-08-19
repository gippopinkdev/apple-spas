import { useEffect, useRef, useState } from "react";
import useMapPanZoom from "./useMapPanZoom";
import { loadMapSvg } from "../../data/campaignData";
import "../../styles/map.css";

export default function MapView({
    districtMap,
    candidates,
    onSelectDistrict,
}) {
    const mapRef = useRef(null);
    const baseUrl = import.meta.env.BASE_URL;
    const { draggingRef, bindPanZoom } = useMapPanZoom();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        let disposed = false;
        let cleanup = () => { };

        async function mountMap() {
            setStatus("loading");

            try {
                const svgText = await loadMapSvg(baseUrl);

                if (disposed || !mapRef.current) {
                    return;
                }

                mapRef.current.innerHTML = svgText;

                const svg = mapRef.current.querySelector("svg");

                if (!svg) {
                    setStatus("error");
                    return;
                }

                svg.removeAttribute("width");
                svg.removeAttribute("height");
                svg.style.width = "100%";
                svg.style.height = "100%";

                const paths = svg.querySelectorAll("path");

                paths.forEach((path) => {
                    path.classList.add("interactive-path");

                    const district = districtMap[path.id];
                    const candidate = candidates[district?.number] ?? null;
                    const districtId = district?.number ?? path.id;

                    if (candidate) {
                        path.classList.add("mapped");
                    }

                    path.addEventListener("click", () => {
                        if (!draggingRef.current) {
                            onSelectDistrict(districtId);
                        }
                    });
                });

                cleanup = bindPanZoom(svg);
                setStatus("ready");
            } catch (error) {
                console.error(error);
                setStatus("error");
            }
        }

        mountMap();

        return () => {
            disposed = true;
            cleanup();
        };
    }, [baseUrl, bindPanZoom, candidates, districtMap, draggingRef, onSelectDistrict]);

    return (
        <div className="map-shell" aria-label="Interactive map of constituencies">
            <div ref={mapRef} className="map-stage" />

            {status === "loading" && (
                <p className="map-loading">Загружаем карту округов…</p>
            )}

            {status === "error" && (
                <p className="map-error">Не удалось загрузить карту. Обновите страницу и попробуйте снова.</p>
            )}
        </div>
    );
}
