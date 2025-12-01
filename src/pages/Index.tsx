import { useEffect, useRef, useState } from 'react';
import ParticleScene from '@/components/ParticleScene';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [customText, setCustomText] = useState('');
  const [shouldMorphText, setShouldMorphText] = useState('');
  const sceneRef = useRef<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customText.trim()) {
      setShouldMorphText(customText.trim());
      setCustomText('');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ParticleScene 
        ref={sceneRef} 
        morphToText={shouldMorphText}
        onMorphComplete={() => setShouldMorphText('')}
      />
      
      <div className="fixed top-8 left-8 z-10">
        <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none text-gold">
          Kaushik
        </h1>
        <p className="text-sm md:text-base text-gold/70 mt-2 font-medium tracking-wide">
          Gen AI Developer
        </p>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-2xl px-4">
        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-2 flex gap-2 border-gold/20">
          <Input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Type something magical..."
            maxLength={20}
            className="flex-1 bg-transparent border-none text-gold placeholder:text-gold/40 focus-visible:ring-0 text-base md:text-lg font-medium px-4"
          />
          <Button 
            type="submit"
            className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 transition-all rounded-xl px-6"
          >
            <span className="hidden sm:inline mr-2">Create</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;
