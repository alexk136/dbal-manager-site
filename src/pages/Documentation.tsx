import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Book, Code, Database, FileText, Shield } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const documentationCategories = [
  {
    title: "Введение",
    icon: <Book className="h-5 w-5" />,
    items: [
      {
        title: "Обзор Dbal Bundle",
        content: "Назначение и цели модуля.",
        link: "/guides/overview.mdx",
      },
      {
        title: "Установка",
        content: "Инструкция по установке и подключению бандла.",
        link: "/guides/installation.mdx",
      },
    ],
  },
  {
    title: "Основы",
    icon: <Database className="h-5 w-5" />,
    items: [
      {
        title: "DbalManagerFactory",
        content: "Создание компонентов для работы с базой данных.",
        link: "/guides/dbal-manager.mdx",
      },
      {
        title: "Итераторы",
        content: "Работа с CursorIterator и OffsetIterator.",
        link: "/guides/iterators.mdx",
      },
    ],
  },
  {
    title: "Bulk-операции",
    icon: <Code className="h-5 w-5" />,
    items: [
      {
        title: "Bulk Insert",
        content: "Массовая вставка записей в БД.",
        link: "/guides/bulk-insert.mdx",
      },
      {
        title: "Bulk Update",
        content: "Массовое обновление данных.",
        link: "/guides/bulk-update.mdx",
      },
      {
        title: "Bulk Upsert",
        content: "Комбинированная вставка и обновление.",
        link: "/guides/bulk-upsert.mdx",
      },
    ],
  },
  {
    title: "Дополнительно",
    icon: <Shield className="h-5 w-5" />,
    items: [
      {
        title: "Совместимость",
        content: "Требования к PHP, Symfony, Doctrine и БД.",
        link: "/guides/compatibility.mdx",
      },
    ],
  },
];

const Documentation = () => {
  const { t } = useTranslation();

  const documentationCategories = t("documentation.categories", {
    returnObjects: true,
  }) as {
    title: string;
    icon: JSX.Element;
    items: { title: string; content: string; link: string }[];
  }[];

  const [selectedItem, setSelectedItem] = useState(
    documentationCategories[0]?.items[0],
  );
  const [guideContent, setGuideContent] = useState("");

  useEffect(() => {
    if (selectedItem?.link) {
      fetch(selectedItem.link)
        .then((res) => res.text())
        .then(setGuideContent)
        .catch(() => setGuideContent(t("documentation.error")));
    }
  }, [selectedItem, t]);

  const iconMap: Record<string, JSX.Element> = {
    book: <Book className="h-5 w-5" />,
    database: <Database className="h-5 w-5" />,
    code: <Code className="h-5 w-5" />,
    file: <FileText className="h-5 w-5" />,
    shield: <Shield className="h-5 w-5" />,
  };

  return (
      <>
        <Helmet>
          <title>{t("documentation.header.title")}</title>
          <meta name="description" content={t("documentation.header.description")} />
        </Helmet>

        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 bg-background py-12">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 text-center"
              >
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                  {t("documentation.title")}
                </h1>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto md:text-xl">
                  {t("documentation.description")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                <aside className="space-y-6">
                  {documentationCategories.map((category, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                        {iconMap[category.icon as keyof typeof iconMap] || null}
                        {category.title}
                      </div>
                      <ul className="space-y-1">
                        {category.items.map((item, j) => (
                          <li key={j}>
                            <button
                              onClick={() => setSelectedItem(item)}
                              className={`text-left text-sm w-full rounded px-2 py-1 hover:bg-muted/40 transition ${
                                selectedItem?.title === item.title
                                  ? "bg-muted/50 font-semibold"
                                  : ""
                              }`}
                            >
                              {item.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </aside>

                <section className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {guideContent}
                  </ReactMarkdown>
                </section>
              </div>
            </div>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </>
  );
};

export default Documentation;
