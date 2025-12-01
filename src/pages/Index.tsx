import { useRef } from 'react';
import ParticleScene from '@/components/ParticleScene';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ClientsSection from '@/components/sections/ClientsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  const sceneRef = useRef<any>(null);

  return (
    <div className="relative w-full">
      <HeroSection sceneRef={sceneRef} />
      
      <div className="relative z-10 bg-background">
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <ClientsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
