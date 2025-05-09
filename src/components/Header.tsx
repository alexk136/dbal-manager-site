import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import i18n from "@/i18n";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Документация", href: "/documentation" },
    { label: "GitHub", href: "https://github.com/alexk136/dbal-manager" },
  ];

  const languages = [
    { code: "ru", name: "Русский" },
    { code: "en", name: "English" },
  ];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      location.reload();
    });
  };

  const currentLangName =
    languages.find((l) => i18n.language.startsWith(l.code))?.name ||
    i18n.language;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center md:mr-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground rounded-md p-1">
              <span className="font-bold text-xl">DB</span>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">
              Dbal Bundle
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-between">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.href.startsWith("/") ? (
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center gap-2 px-3"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm">{currentLangName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Mobile navigation */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.name)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card text-card-foreground">
              <nav className="mt-8">
                <ul className="space-y-4">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      {item.href.startsWith("/") ? (
                        <Link
                          to={item.href}
                          className="text-foreground hover:text-foreground/80 text-lg block py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="text-foreground hover:text-foreground/80 text-lg block py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => {
                      toast.info("Скоро будет доступно!");
                      setIsOpen(false);
                    }}
                  >
                    Начать
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
