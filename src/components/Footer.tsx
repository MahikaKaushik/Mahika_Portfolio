import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-foreground/[0.06] bg-foreground px-6 py-12 text-primary-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <div>
          <Link to="/" className="font-body text-xl font-medium transition-colors hover:text-primary-foreground/80">
            Mahika Kaushik
          </Link>
          <p className="mt-1 font-body text-sm text-primary-foreground/50">
            UX Designer · Panchkula, India
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-sm text-primary-foreground/50">
          <Link to="/" className="transition-colors hover:text-primary-foreground">Home</Link>
          <Link to="/about" className="transition-colors hover:text-primary-foreground">About</Link>
          <Link to="/work/ucd" className="transition-colors hover:text-primary-foreground">Work</Link>
          <a href="mailto:kaushikmahika@gmail.com" className="transition-colors hover:text-primary-foreground">Email</a>
          <a href="https://www.linkedin.com/in/mahika-kaushik-366649219/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary-foreground">LinkedIn</a>
        </nav>
      </div>

      <div className="mx-auto mt-8 flex max-w-5xl items-center justify-between border-t border-primary-foreground/10 pt-6 font-mono text-[11px] text-primary-foreground/30">
        <span>© {new Date().getFullYear()} Mahika Kaushik</span>
        <span>Designed using Claude</span>
      </div>
    </footer>
  );
}
