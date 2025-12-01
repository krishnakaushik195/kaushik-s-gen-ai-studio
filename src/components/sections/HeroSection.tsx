import ParticleScene from '@/components/ParticleScene';

interface HeroSectionProps {
  sceneRef: React.RefObject<any>;
}

const HeroSection = ({ sceneRef }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ParticleScene 
        ref={sceneRef} 
        morphToText=""
        onMorphComplete={() => {}}
      />
    </div>
  );
};

export default HeroSection;
