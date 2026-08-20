import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative z-10 bg-primary dark:bg-bg-dark text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-2xl tracking-wider mb-3">
              MICHIEL MAESSEN FOTOGRAFIE
            </h3>
            <p className="text-white/50 text-sm">Oss</p>
          </div>

          <div>
            <h4 className="font-heading text-lg tracking-wider text-white/40 mb-3">
              {t("contact")}
            </h4>
            <Link
              href="/contact"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {t("contactLink")}
            </Link>
          </div>

          <div>
            <h4 className="font-heading text-lg tracking-wider text-white/40 mb-3">
              {t("serviceArea")}
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              {t("serviceAreaText")}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/30 text-sm">
          &copy; {new Date().getFullYear()} Michiel Maessen Fotografie
        </div>
      </div>
    </footer>
  );
}
