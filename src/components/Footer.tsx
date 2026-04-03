export default function Footer() {
  return (
    <footer className="relative z-10 bg-primary text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl tracking-wider mb-3">
              MICHIEL MAESSEN FOTOGRAFIE
            </h3>
            <p className="text-white/50 text-sm">
              Oss
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg tracking-wider text-white/40 mb-3">
              CONTACT
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="tel:+31653117778" className="hover:text-white transition-colors">
                  +31 6 53117778
                </a>
              </li>
              <li>
                <a href="mailto:website@michielmaessen.com" className="hover:text-white transition-colors">
                  website@michielmaessen.com
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas (SEO) */}
          <div>
            <h4 className="font-heading text-lg tracking-wider text-white/40 mb-3">
              WERKGEBIED
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Fotograaf Oss · Den Bosch · Nijmegen · Uden · Eindhoven · Utrecht · Breda
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/30 text-sm">
          &copy; {new Date().getFullYear()} Michiel Maessen Fotografie
        </div>
      </div>
    </footer>
  );
}
