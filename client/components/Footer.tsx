import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/20 bg-white/10 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center text-white text-sm">
        <p className="mb-2">{t.footer.copyright}</p>
        <div className="flex gap-2 justify-center">
          <Link to="/terms" className="hover:text-white/80">{t.footer.terms}</Link>
          <span>|</span>
          <Link to="/refund" className="hover:text-white/80">{t.footer.refund}</Link>
          <span>|</span>
          <Link to="/privacy" className="hover:text-white/80">{t.footer.privacy}</Link>
        </div>
      </div>
    </footer>
  );
}
