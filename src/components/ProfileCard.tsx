import Image from "next/image";

interface SkillBar {
  label: string;
  percentage: number;
}

interface ProfileCardProps {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  skills: SkillBar[];
}

export default function ProfileCard({
  name,
  role,
  description,
  imageSrc,
  skills,
}: ProfileCardProps) {
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      <div className="aspect-[3/4] relative">
        <Image
          src={imageSrc}
          alt={`${name} - ${role}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="font-heading text-3xl tracking-wider text-primary">
          {name}
        </h2>
        <p className="text-secondary text-sm uppercase tracking-wider mt-1 mb-4">
          {role}
        </p>
        <p className="text-secondary text-sm leading-relaxed mb-6">
          {description}
        </p>
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.label}>
              <div className="flex justify-between text-xs text-muted mb-1">
                <span>{skill.label}</span>
                <span>{skill.percentage}%</span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
