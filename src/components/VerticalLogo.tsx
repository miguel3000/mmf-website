"use client";

export default function VerticalLogo() {
  return (
    <>
      {/* Desktop: fixed left logo, fully visible */}
      <div
        className="hidden lg:flex fixed left-0 top-0 h-screen w-24 items-center justify-center z-40 pointer-events-none bg-white"
        aria-hidden="true"
      >
        <span
          className="font-heading text-primary text-[4rem] leading-none tracking-[0.15em] whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          MICHIEL MAESSEN FOTOGRAFIE
        </span>
      </div>

      {/* Mobile: fixed transparent watermark behind content */}
      <div
        className="lg:hidden fixed inset-0 flex items-center justify-center z-0 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-heading text-primary/[0.06] text-[20vw] leading-none tracking-[0.1em] whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          MICHIEL MAESSEN FOTOGRAFIE
        </span>
      </div>
    </>
  );
}
