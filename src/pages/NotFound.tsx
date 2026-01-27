import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const META_TITLE = "Seite nicht gefunden | Räumzwerge";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = META_TITLE;
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Seite nicht gefunden</p>
        <p className="mb-6 text-muted-foreground">Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
};

export default NotFound;
