import { useRef } from 'react';
import ParticleScene from '@/components/ParticleScene';

const Index = () => {
  const sceneRef = useRef<any>(null);

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

export default Index;
