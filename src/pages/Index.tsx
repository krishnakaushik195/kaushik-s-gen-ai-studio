import { useRef } from 'react';
import ParticleScene from '@/components/ParticleScene';

const Index = () => {
  const sceneRef = useRef<any>(null);

  return (
    <div className="relative w-full min-h-screen overflow-y-auto">
      {/* Hero Section with Particle Animation */}
      <section className="relative w-full h-screen">
        <ParticleScene 
          ref={sceneRef} 
          morphToText=""
          onMorphComplete={() => {}}
        />
      </section>

      {/* Projects Section */}
      <section className="relative w-full min-h-screen bg-background py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
            <span className="cosmic-gradient">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project cards will go here */}
            <div className="glass-panel p-6 rounded-lg hover:shadow-glow transition-all">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Project 1</h3>
              <p className="text-muted-foreground mb-4">Description of your project goes here.</p>
            </div>
            
            <div className="glass-panel p-6 rounded-lg hover:shadow-glow transition-all">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Project 2</h3>
              <p className="text-muted-foreground mb-4">Description of your project goes here.</p>
            </div>
            
            <div className="glass-panel p-6 rounded-lg hover:shadow-glow transition-all">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Project 3</h3>
              <p className="text-muted-foreground mb-4">Description of your project goes here.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
