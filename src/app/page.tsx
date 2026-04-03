import ProfileCard from "@/components/ProfileCard";

const teamMembers = [
  {
    name: "MICHIEL",
    role: "De Boekhouder",
    description:
      "Houdt de papierwinkel op orde. Houdt van sterrenkijken en sudoku. Zonder hem geen facturen, en zonder facturen geen koffie.",
    imageSrc: "/images/team/Michieldeboekhouder.jpg",
    skills: [
      { label: "Koffie", percentage: 40 },
      { label: "Gezelligheid", percentage: 60 },
      { label: "Motivatie", percentage: 85 },
    ],
  },
  {
    name: "MICHIEL",
    role: "De Fotograaf",
    description:
      "Oprichter met meer dan 20 jaar ervaring. Technisch onderlegd en gepassioneerd. Kan niet stoppen met klikken.",
    imageSrc: "/images/team/Michiel Maessen fotograaf.jpg",
    skills: [
      { label: "Koffie", percentage: 90 },
      { label: "Gezelligheid", percentage: 95 },
      { label: "Motivatie", percentage: 100 },
    ],
  },
  {
    name: "MICHIEL",
    role: "De Beeldbewerker",
    description:
      "Medewerker sinds 2008. Perfectionist die elke pixel controleert. Leeft op koffie en deadlines.",
    imageSrc: "/images/team/Michieldebeelbewerker.jpg",
    skills: [
      { label: "Koffie", percentage: 100 },
      { label: "Gezelligheid", percentage: 70 },
      { label: "Motivatie", percentage: 90 },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="relative z-10">
      {/* Hero section */}
      <section className="min-h-[40vh] flex items-center justify-center px-6 pt-24 pb-12">
        <div className="text-center">
          <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
            HET TEAM
          </h1>
          <p className="mt-4 text-secondary max-w-lg mx-auto">
            Drie Michiels. Eén missie. Beelden die blijven hangen.
          </p>
        </div>
      </section>

      {/* Team cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <ProfileCard key={i} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}
