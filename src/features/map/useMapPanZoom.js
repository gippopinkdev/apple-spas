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
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            svgElement.removeEventListener("wheel", handleWheel);
            svgElement.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [updateViewBox]);

    return {
        draggingRef,
        bindPanZoom,
    };
}
