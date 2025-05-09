import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslation } from "react-i18next";

const CodeExamples = () => {
  const { t } = useTranslation();
  const [examples, setExamples] = useState<Record<string, string>>({});

  const codeExampleTabs = t("examples.categories", { returnObjects: true }) as {
    id: string;
    name: string;
    file: string;
  }[];

  useEffect(() => {
    codeExampleTabs.forEach((tab) => {
      fetch(`/examples/${tab.file}`)
        .then((res) => res.text())
        .then((text) => setExamples((prev) => ({ ...prev, [tab.id]: text })))
        .catch(() =>
          setExamples((prev) => ({ ...prev, [tab.id]: "Ошибка загрузки." })),
        );
    });
  }, [codeExampleTabs]);

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            {t("examples.title")}
          </h3>
          <p className="mx-auto mt-2 max-w-[600px] text-muted-foreground">
            {t("examples.description")}
          </p>
        </motion.div>

        <Tabs
          defaultValue={codeExampleTabs[0]?.id}
          className="w-full max-w-6xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-4">
            {codeExampleTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {codeExampleTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 overflow-x-auto overflow-y-auto max-h-[600px] prose dark:prose-invert w-full max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {examples[tab.id] || t("examples.loading")}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default CodeExamples;
