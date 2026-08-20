import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex items-center justify-center px-6 pt-24 pb-8">
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary dark:text-white/90">
          {t("title")}
        </h1>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-24">
        <p className="text-secondary dark:text-white/50 text-sm mb-8">
          {t("subtitle")}
        </p>

        <ContactForm />
      </section>
    </div>
  );
}
