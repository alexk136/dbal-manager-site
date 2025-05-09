import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslation } from "react-i18next";

export const DbalBundleDescription = () => {
  const { i18n } = useTranslation();
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    const lang = (i18n.language || "ru").split("-")[0];
    console.log(i18n);
    console.log(`/content/locale/${lang}/dbal-bundle.md`);
    fetch(`/content/locale/${lang}/dbal-bundle.md`)
      .then((res) => res.text())
      .then(setMarkdown)
      .catch(() => setMarkdown("## Dbal Bundle\nОписание недоступно."));
  }, [i18n.language]);

  return (
    <section className="py-16 md:py-20 bg-background/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-primary/20">
            <CardContent className="pt-6 prose prose-neutral dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DbalBundleDescription;
