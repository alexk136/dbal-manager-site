import { Toaster } from "sonner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DbalBundleDescription from "@/components/DbalBundleDescription";
import FeaturesSection from "@/components/FeaturesSection";
import CodeExamples from "@/components/CodeExamples";
import Footer from "@/components/Footer";

const Home = () => {
  return (
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
  );
};

export default Home;
