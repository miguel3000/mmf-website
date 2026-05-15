import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex items-center justify-center px-6 pt-24 pb-8">
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
          {t("title")}
        </h1>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-24">
        <div className="space-y-8">
          <div className="border-b border-border pb-6">
            <h2 className="font-heading text-2xl tracking-wider text-primary mb-2">
              {t("phone.title")}
            </h2>
            <p className="text-secondary text-sm mb-3">
              {t("phone.description")}
            </p>
            <a
              href="tel:+31653117778"
              className="text-primary text-lg font-medium hover:text-secondary transition-colors"
            >
              +31 6 53117778
            </a>
          </div>

          <div className="border-b border-border pb-6">
            <h2 className="font-heading text-2xl tracking-wider text-primary mb-2">
              {t("email.title")}
            </h2>
            <p className="text-secondary text-sm mb-3">
              {t("email.description")}
            </p>
            <a
              href="mailto:website@michielmaessen.com"
              className="text-primary text-lg font-medium hover:text-secondary transition-colors"
            >
              website@michielmaessen.com
            </a>
          </div>

          <div>
            <h2 className="font-heading text-2xl tracking-wider text-primary mb-2">
              {t("location.title")}
            </h2>
            <p className="text-secondary text-sm mb-3">
              {t("location.description")}
            </p>
            <p className="text-secondary text-sm leading-relaxed">
              {t("location.serviceAreas")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
