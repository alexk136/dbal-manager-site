import { Toaster } from "sonner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DbalBundleDescription from "@/components/DbalBundleDescription";
import FeaturesSection from "@/components/FeaturesSection";
import CodeExamples from "@/components/CodeExamples";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();

  return (
      <>
      <Helmet>
          <title>{t("home.title")}</title>
          <meta name="description" content={t("home.description")} />
      </Helmet>

        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <HeroSection />
            <DbalBundleDescription />
            <FeaturesSection />
            <CodeExamples />
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </>
  );
};

export default Home;
