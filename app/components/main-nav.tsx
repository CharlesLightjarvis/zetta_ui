import { useState } from "react";
import { Menu } from "lucide-react";

import { Link } from "react-router";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Accueil" },
    { to: "/formations", label: "Formations" },
    { to: "/certifications", label: "Certifications" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="flex w-full items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold">TechCert</span>
      </Link>
      <nav className="hidden md:flex md:items-center md:space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
        <Button asChild>
          <Link to="/contact#interest-form">Exprimer mon intérêt</Link>
        </Button>
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-4">
              <Link
                to="/contact#interest-form"
                onClick={() => setIsOpen(false)}
              >
                Exprimer mon intérêt
              </Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
