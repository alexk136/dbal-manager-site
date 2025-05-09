import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const languages = [
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" },
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  const footerLinks = t("footer.sections", { returnObjects: true }) as {
    title: string;
    links: { label: string; href: string }[];
  }[];

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground rounded-md p-1">
                <span className="font-bold text-xl">DB</span>
              </div>
              <span className="font-bold text-xl">Dbal Bundle</span>
            </div>
          </div>

          {footerLinks.map((section, i) => (
            <div key={i} className="md:col-span-1">
              <h3 className="font-medium text-foreground">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                size="sm"
                variant="ghost"
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {t("footer.copyright")}
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0 flex items-center">
            {t("footer.madeWith")}{" "}
            <Heart className="h-4 w-4 mx-1 text-destructive" />{" "}
            {t("footer.community")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
