"use client";

import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiCode() {
  const [active, setActive] = useState(false);
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      bufferRef.current = [...bufferRef.current, e.key].slice(-KONAMI.length);
      if (
        bufferRef.current.length === KONAMI.length &&
        bufferRef.current.every((k, i) => k === KONAMI[i])
      ) {
        setActive((prev) => !prev);
        bufferRef.current = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("konami-active", active);
    return () => {
      document.documentElement.classList.remove("konami-active");
    };
  }, [active]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        className="absolute"
      >
        <filter id="pixelate" x="0" y="0" width="100%" height="100%">
          <feFlood x="3" y="3" height="1" width="1" />
          <feComposite width="8" height="8" />
          <feTile result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
          <feMorphology operator="dilate" radius="4" />
        </filter>
      </svg>
      {active && (
        <button
          onClick={() => setActive(false)}
          className="konami-close"
          aria-label="Disable pixel mode"
        >
          &#x2716;
        </button>
      )}
    </>
  );
}
