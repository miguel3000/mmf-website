"use client";

export default function VerticalLogo() {
  return (
    <>
      {/* Desktop: fixed left logo column, fully visible like the invoice */}
      <div
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[80px] items-center justify-center z-0 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-heading text-primary text-[3.5rem] leading-none tracking-[0.2em] whitespace-nowrap"
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
