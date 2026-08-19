import { useCallback, useRef } from "react";

export default function useMapPanZoom() {
    const viewBoxRef = useRef(null);
    const draggingRef = useRef(false);
    const dragStartRef = useRef(null);

    const updateViewBox = useCallback((svgElement) => {
        const viewBox = viewBoxRef.current;

        if (!viewBox) {
            return;
        }

        svgElement.setAttribute(
            "viewBox",
            `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
        );
    }, []);

    const bindPanZoom = useCallback((svgElement) => {
        const originalViewBox = svgElement.viewBox.baseVal;

        viewBoxRef.current = {
            x: originalViewBox.x,
            y: originalViewBox.y,
            width: originalViewBox.width,
            height: originalViewBox.height,
        };

        const handleWheel = (event) => {
            event.preventDefault();

            const rect = svgElement.getBoundingClientRect();
            const viewBox = viewBoxRef.current;

            if (!viewBox) {
                return;
            }

            const mouseX = (event.clientX - rect.left) / rect.width;
            const mouseY = (event.clientY - rect.top) / rect.height;
            const zoomFactor = event.deltaY < 0 ? 0.85 : 1.15;

            let newWidth = viewBox.width * zoomFactor;
            let newHeight = viewBox.height * zoomFactor;

            const minWidth = originalViewBox.width * 0.1;
            const maxWidth = originalViewBox.width * 2;

            newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
            newHeight = newWidth * (viewBox.height / viewBox.width);

            const mouseSvgX = viewBox.x + mouseX * viewBox.width;
            const mouseSvgY = viewBox.y + mouseY * viewBox.height;

            const newX = mouseSvgX - mouseX * newWidth;
            const newY = mouseSvgY - mouseY * newHeight;

            viewBoxRef.current = {
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight,
            };

            updateViewBox(svgElement);
        };

        // Touch support: single-finger pan, two-finger pinch-to-zoom
        const touchState = {
            mode: null, // 'pan' | 'pinch'
            startDistance: 0,
            startCenter: null,
            startViewBox: null,
        };

        const getTouchDistance = (t0, t1) => {
            const dx = t1.clientX - t0.clientX;
            const dy = t1.clientY - t0.clientY;
            return Math.hypot(dx, dy);
        };

        const getTouchCenter = (t0, t1) => {
            return {
                clientX: (t0.clientX + t1.clientX) / 2,
                clientY: (t0.clientY + t1.clientY) / 2,
            };
        };

        const handleTouchStart = (event) => {
            if (!svgElement) return;
            if (event.touches.length === 1) {
                // start pan
                const t = event.touches[0];
                dragStartRef.current = {
                    clientX: t.clientX,
                    clientY: t.clientY,
                    viewBox: { ...viewBoxRef.current },
                };
                touchState.mode = 'pan';
            } else if (event.touches.length === 2) {
                // start pinch
                const t0 = event.touches[0];
                const t1 = event.touches[1];
                touchState.mode = 'pinch';
                touchState.startDistance = getTouchDistance(t0, t1);
                touchState.startCenter = getTouchCenter(t0, t1);
                touchState.startViewBox = { ...viewBoxRef.current };
            }
        };

        const handleTouchMove = (event) => {
            if (!svgElement) return;
            if (touchState.mode === 'pan' && event.touches.length === 1) {
                event.preventDefault();
                const t = event.touches[0];
                const rect = svgElement.getBoundingClientRect();
                const start = dragStartRef.current;
                if (!start) return;

                const dx = t.clientX - start.clientX;
                const dy = t.clientY - start.clientY;

                const scaleX = start.viewBox.width / rect.width;
                const scaleY = start.viewBox.height / rect.height;

                const newX = start.viewBox.x - dx * scaleX;
                const newY = start.viewBox.y - dy * scaleY;

                viewBoxRef.current = {
                    ...viewBoxRef.current,
                    x: newX,
                    y: newY,
                };

                updateViewBox(svgElement);
            } else if (touchState.mode === 'pinch' && event.touches.length === 2) {
                event.preventDefault();
                const t0 = event.touches[0];
                const t1 = event.touches[1];
                const rect = svgElement.getBoundingClientRect();

                const currentDistance = getTouchDistance(t0, t1);
                const scale = touchState.startDistance / currentDistance;

                const startVB = touchState.startViewBox || viewBoxRef.current;

                let newWidth = startVB.width * scale;
                const minWidth = originalViewBox.width * 0.1;
                const maxWidth = originalViewBox.width * 2;
                newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
                const newHeight = newWidth * (startVB.height / startVB.width);

                const center = getTouchCenter(t0, t1);
                const centerX = (center.clientX - rect.left) / rect.width;
                const centerY = (center.clientY - rect.top) / rect.height;

                const centerSvgX = startVB.x + centerX * startVB.width;
                const centerSvgY = startVB.y + centerY * startVB.height;

                const newX = centerSvgX - centerX * newWidth;
                const newY = centerSvgY - centerY * newHeight;

                viewBoxRef.current = {
                    x: newX,
                    y: newY,
                    width: newWidth,
                    height: newHeight,
                };

                updateViewBox(svgElement);
            }
        };

        const handleTouchEnd = (event) => {
            if (event.touches.length === 0) {
                dragStartRef.current = null;
                touchState.mode = null;
            } else if (event.touches.length === 1) {
                // if one finger remains, treat as pan start
                const t = event.touches[0];
                dragStartRef.current = {
                    clientX: t.clientX,
                    clientY: t.clientY,
                    viewBox: { ...viewBoxRef.current },
                };
                touchState.mode = 'pan';
            }
        };

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

            svgElement.classList.add("dragging");
        };

        const handleMouseMove = (event) => {
            if (!dragStartRef.current) return;

            const rect = svgElement.getBoundingClientRect();
            const start = dragStartRef.current;
            const dx = event.clientX - start.clientX;
            const dy = event.clientY - start.clientY;

            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                draggingRef.current = true;
            }

            const scaleX = start.viewBox.width / rect.width;
            const scaleY = start.viewBox.height / rect.height;

            const newX = start.viewBox.x - dx * scaleX;
            const newY = start.viewBox.y - dy * scaleY;

            viewBoxRef.current = {
                ...viewBoxRef.current,
                x: newX,
                y: newY,
            };

            updateViewBox(svgElement);
        };

        const handleMouseUp = () => {
            dragStartRef.current = null;
            svgElement.classList.remove("dragging");

            window.setTimeout(() => {
                draggingRef.current = false;
            }, 0);
        };

        svgElement.addEventListener("wheel", handleWheel, { passive: false });
        svgElement.addEventListener("mousedown", handleMouseDown);
        svgElement.addEventListener("touchstart", handleTouchStart, { passive: false });
        svgElement.addEventListener("touchmove", handleTouchMove, { passive: false });
        svgElement.addEventListener("touchend", handleTouchEnd, { passive: false });
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            svgElement.removeEventListener("wheel", handleWheel);
            svgElement.removeEventListener("mousedown", handleMouseDown);
            svgElement.removeEventListener("touchstart", handleTouchStart);
            svgElement.removeEventListener("touchmove", handleTouchMove);
            svgElement.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [updateViewBox]);

    return {
        draggingRef,
        bindPanZoom,
    };
}
