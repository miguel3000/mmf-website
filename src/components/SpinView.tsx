"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface SpinViewProps {
  folder: string;
  frameCount: number;
  prefix?: string;
  suffix?: string;
  padDigits?: number;
  extension?: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

export default function SpinView({
  folder,
  frameCount,
  prefix = "frame-",
  suffix = "",
  padDigits = 3,
  extension = "jpg",
  width = 800,
  height = 800,
  autoplay = false,
  autoplaySpeed = 80,
}: SpinViewProps) {
  const [frame, setFrame] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const pad = (n: number) => String(n + 1).padStart(padDigits, "0");
  const src = (i: number) => `${folder}/${prefix}${pad(i)}${suffix}.${extension}`;

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new globalThis.Image();
      img.onload = () => {
        count++;
        if (count === frameCount) setLoaded(true);
      };
      img.src = src(i);
    }
  }, [folder, frameCount, prefix, extension]);

  useEffect(() => {
    if (!autoplay || dragging) {
      clearInterval(autoplayRef.current);
      return;
    }
    autoplayRef.current = setInterval(() => {
      setFrame((f) => (f + 1) % frameCount);
    }, autoplaySpeed);
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, dragging, frameCount, autoplaySpeed]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const delta = clientX - dragStartX.current;
      const sensitivity = rect.width / frameCount;
      const frameDelta = Math.round(delta / sensitivity);
      setFrame(((dragStartFrame.current + frameDelta) % frameCount + frameCount) % frameCount);
    },
    [dragging, frameCount]
  );

  const startDrag = (clientX: number) => {
    setDragging(true);
    dragStartX.current = clientX;
    dragStartFrame.current = frame;
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onEnd = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [dragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden bg-surface dark:bg-surface-dark rounded-lg"
      style={{ aspectRatio: `${width}/${height}`, maxWidth: width, cursor: dragging ? "grabbing" : "grab", touchAction: "pan-y" }}
      onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX); }}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-primary dark:text-white/70 text-sm">
          Loading 360°…
        </div>
      )}
      <Image
        src={src(frame)}
        alt={`360° view — frame ${frame + 1} of ${frameCount}`}
        width={width}
        height={height}
        className="w-full h-full object-contain"
        priority={frame === 0}
        draggable={false}
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-primary dark:text-white/70 pointer-events-none">
        ↔ drag to rotate
      </div>
    </div>
  );
}
