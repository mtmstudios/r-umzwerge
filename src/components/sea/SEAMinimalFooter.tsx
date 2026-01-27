import { Link } from 'react-router-dom';

export function SEAMinimalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 bg-muted/50 border-t border-border/50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/impressum"
              className="hover:text-foreground transition-colors"
            >
              Impressum
            </Link>
            <span className="text-border">|</span>
            <Link
              to="/datenschutz"
              className="hover:text-foreground transition-colors"
            >
              Datenschutz
            </Link>
          </div>

          {/* Copyright */}
          <p>© {currentYear} Räumzwerge</p>
        </div>
      </div>
    </footer>
  );
}
