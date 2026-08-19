import { useEffect, useRef, useState } from "react";
import CandidatePanel from "./CandidatePanel";

function App() {
    const mapRef = useRef(null);
    const base = import.meta.env.BASE_URL;
    const [selectedId, setSelectedId] = useState(null);
    const [districtMap, setDistrictMap] = useState({});
    const [candidates, setCandidatesMap] = useState({});
    // const [selectedCandidate, setSelectedCandidate] = useState(null);
    const viewBoxRef = useRef(null);
    const draggingRef = useRef(false);
    const dragStartRef = useRef(null);
    
    useEffect(() => {
        async function loadSVG() {
            const response = await fetch(`${base}map.svg`);
            const svgText = await response.text();
 
            const districtResponse = await fetch(`${base}districts.json`);
            const districtMapData = await districtResponse.json();
            setDistrictMap(districtMapData);
 
            const candidatesResponse = await fetch(`${base}candidates.json`);
            setCandidatesMap(await candidatesResponse.json());
 
            mapRef.current.innerHTML = svgText;

            const svg = mapRef.current.querySelector("svg");

            if (!svg) {
                console.error("SVG not found");
                return;
            }

            svg.removeAttribute("width");
            svg.removeAttribute("height");

            svg.style.width = "100%";
            svg.style.height = "100%";

            const originalViewBox = svg.viewBox.baseVal;

            viewBoxRef.current = {
                x: originalViewBox.x,
                y: originalViewBox.y,
                width: originalViewBox.width,
                height: originalViewBox.height,
            };

            /*
             * Make paths clickable.
             */
            const paths = svg.querySelectorAll("path");

            paths.forEach((path) => {
                path.classList.add("interactive-path");

                const district = districtMapData[path.id];

                path.addEventListener("click", () => {
                    if (!draggingRef.current) {
                        setSelectedId(district?.number ?? path.id);
                    }
                });
            });

            /*
             * ZOOM
             */
            const handleWheel = (event) => {
                event.preventDefault();

                const rect = svg.getBoundingClientRect();
                const viewBox = viewBoxRef.current;

                const mouseX =
                    (event.clientX - rect.left) /
                    rect.width;

                const mouseY =
                    (event.clientY - rect.top) /
                    rect.height;

                const zoomFactor =
                    event.deltaY < 0 ? 0.85 : 1.15;

                let newWidth =
                    viewBox.width * zoomFactor;

                let newHeight =
                    viewBox.height * zoomFactor;

                const original = originalViewBox;

                const minWidth =
                    original.width * 0.1;

                const maxWidth =
                    original.width * 2;

                newWidth = Math.max(
                    minWidth,
                    Math.min(maxWidth, newWidth)
                );

                newHeight =
                    newWidth *
                    (viewBox.height / viewBox.width);

                /*
                 * Keep mouse position fixed.
                 */
                const mouseSvgX =
                    viewBox.x +
                    mouseX * viewBox.width;

                const mouseSvgY =
                    viewBox.y +
                    mouseY * viewBox.height;

                const newX =
                    mouseSvgX -
                    mouseX * newWidth;

                const newY =
                    mouseSvgY -
                    mouseY * newHeight;

                viewBoxRef.current = {
                    x: newX,
                    y: newY,
                    width: newWidth,
                    height: newHeight,
                };

                updateViewBox(svg);
            };

            /*
             * START DRAG
             */
            const handleMouseDown = (event) => {
                if (event.button !== 0) return;

                draggingRef.current = false;

                dragStartRef.current = {
                    clientX: event.clientX,
                    clientY: event.clientY,

                    viewBox: {
                        ...viewBoxRef.current,
                    },
                };

                svg.classList.add("dragging");
            };

            /*
             * DRAG
             */
            const handleMouseMove = (event) => {
                if (!dragStartRef.current) return;

                const rect = svg.getBoundingClientRect();

                const start =
                    dragStartRef.current;

                const dx =
                    event.clientX -
                    start.clientX;

                const dy =
                    event.clientY -
                    start.clientY;

                /*
                 * Don't consider tiny movements
                 * a drag.
                 */
                if (
                    Math.abs(dx) > 3 ||
                    Math.abs(dy) > 3
                ) {
                    draggingRef.current = true;
                }

                /*
                 * Convert screen pixels
                 * to SVG coordinates.
                 */
                const scaleX =
                    start.viewBox.width /
                    rect.width;

                const scaleY =
                    start.viewBox.height /
                    rect.height;

                const newX =
                    start.viewBox.x -
                    dx * scaleX;

                const newY =
                    start.viewBox.y -
                    dy * scaleY;

                viewBoxRef.current = {
                    ...viewBoxRef.current,
                    x: newX,
                    y: newY,
                };

                updateViewBox(svg);
            };

            /*
             * END DRAG
             */
            const handleMouseUp = () => {
                dragStartRef.current = null;

                svg.classList.remove("dragging");

                /*
                 * Reset after click processing.
                 */
                setTimeout(() => {
                    draggingRef.current = false;
                }, 0);
            };

            svg.addEventListener(
                "wheel",
                handleWheel,
                { passive: false }
            );

            svg.addEventListener(
                "mousedown",
                handleMouseDown
            );

            window.addEventListener(
                "mousemove",
                handleMouseMove
            );

            window.addEventListener(
                "mouseup",
                handleMouseUp
            );

            function updateViewBox(svgElement) {
                const viewBox =
                    viewBoxRef.current;

                svgElement.setAttribute(
                    "viewBox",
                    `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
                );
            }

            return () => {
                svg.removeEventListener(
                    "wheel",
                    handleWheel
                );

                svg.removeEventListener(
                    "mousedown",
                    handleMouseDown
                );

                window.removeEventListener(
                    "mousemove",
                    handleMouseMove
                );

                window.removeEventListener(
                    "mouseup",
                    handleMouseUp
                );
            };
        }

        loadSVG();
    }, []);

    const selectedCandidate = selectedId
    ? candidates[selectedId] || {
          district: selectedId,
      }
    : null;
    console.log(selectedCandidate)
    
    return (
        <div className="app">

            <header>
                <h1>Яблочный спас:<br></br>Собираем кандидатов за мир</h1>
                <p>
                    Найди кандидата за мир в своём одномандатном округе
                </p>
            </header>

            <main>

                <div
                    ref={mapRef}
                    className="map"
                />

            </main>
        <CandidatePanel
            candidate={selectedCandidate}
            isOpen={Boolean(selectedId)}
            onClose={() => setSelectedId(null)}
        />
        </div>
    );
}

export default App;