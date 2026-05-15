import { useTranslations } from "next-intl";
import ProfileCard from "@/components/ProfileCard";

const teamImages = [
  "/images/team/Michieldeboekhouder.jpg",
  "/images/team/Michiel Maessen fotograaf.jpg",
  "/images/team/Michieldebeelbewerker.jpg",
];

const teamSkillPercentages = [
  [40, 60, 85],
  [90, 95, 100],
  [100, 70, 90],
];

export default function HomePage() {
  const t = useTranslations();
  const memberKeys = ["michiel1", "michiel2", "michiel3"] as const;
  const skillKeys = ["coffee", "fun", "motivation"] as const;

  const teamMembers = memberKeys.map((key, i) => ({
    name: "MICHIEL",
    role: t(`team.${key}.role`),
    description: t(`team.${key}.description`),
    imageSrc: teamImages[i],
    skills: skillKeys.map((sk, j) => ({
      label: t(`team.skills.${sk}`),
      percentage: teamSkillPercentages[i][j],
    })),
  }));

  return (
    <div className="relative z-10">
      <section className="min-h-[40vh] flex items-center justify-center px-6 pt-24 pb-12">
        <div className="text-center">
          <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
            {t("home.title")}
          </h1>
          <p className="mt-4 text-secondary max-w-lg mx-auto">
            {t("home.subtitle")}
          </p>
        </div>
      </section>

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
