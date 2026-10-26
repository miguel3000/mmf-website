"use client";

import { useRef, useEffect, useCallback } from "react";

interface SpinViewProps {
  folder: string;
  frameCount: number;
  prefix?: string;
  suffix?: string;
  padDigits?: number;
  extension?: string;
  width?: number;
  height?: number;
  hint?: string;
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
  hint,
  width = 800,
  height = 800,
  autoplay = false,
  autoplaySpeed = 80,
}: SpinViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);
  const loadedRef = useRef(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const pad = (n: number) => String(n + 1).padStart(padDigits, "0");
  const getSrc = useCallback(
    (i: number) => `${folder}/${prefix}${pad(i)}${suffix}.${extension}`,
    [folder, prefix, suffix, padDigits, extension]
  );

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    let count = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        count++;
        if (i === 0) drawFrame(0);
        if (count === frameCount) {
          loadedRef.current = true;
          if (loadingRef.current) loadingRef.current.style.display = "none";
          drawFrame(frameRef.current);
        }
      };
      img.src = getSrc(i);
      images.push(img);
    }
    framesRef.current = images;
  }, [frameCount, getSrc, drawFrame]);

  useEffect(() => {
    if (!autoplay) {
      clearInterval(autoplayRef.current);
      return;
    }
    autoplayRef.current = setInterval(() => {
      if (draggingRef.current) return;
      frameRef.current = (frameRef.current + 1) % frameCount;
      drawFrame(frameRef.current);
    }, autoplaySpeed);
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, frameCount, autoplaySpeed, drawFrame]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateFrame = (clientX: number) => {
      if (!draggingRef.current) return;
      const rect = container.getBoundingClientRect();
      const delta = clientX - dragStartX.current;
      const sensitivity = rect.width / frameCount;
      const frameDelta = Math.round(delta / sensitivity);
      const newFrame = ((dragStartFrame.current - frameDelta) % frameCount + frameCount) % frameCount;
      if (newFrame !== frameRef.current) {
        frameRef.current = newFrame;
        drawFrame(newFrame);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      draggingRef.current = true;
      dragStartX.current = e.clientX;
      dragStartFrame.current = frameRef.current;
      container.style.cursor = "grabbing";
    };
    const onTouchStart = (e: TouchEvent) => {
      draggingRef.current = true;
      dragStartX.current = e.touches[0].clientX;
      dragStartFrame.current = frameRef.current;
    };
    const onMouseMove = (e: MouseEvent) => updateFrame(e.clientX);
    const onTouchMove = (e: TouchEvent) => updateFrame(e.touches[0].clientX);
    const onEnd = () => {
      draggingRef.current = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onEnd);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [frameCount, drawFrame]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden bg-surface dark:bg-surface-dark rounded-lg"
        style={{ aspectRatio: `${width}/${height}`, maxWidth: width, cursor: "grab", touchAction: "pan-y" }}
      >
        <div ref={loadingRef} className="absolute inset-0 flex items-center justify-center text-primary dark:text-white/70 text-sm">
          Loading 360°…
        </div>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full h-full"
        />
      </div>
      {hint && (
        <p className="text-xs text-primary dark:text-white/70 text-center mt-2">
          ↔ {hint}
        </p>
      )}
    </>
  );
}
