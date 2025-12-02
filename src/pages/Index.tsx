import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleScene from '@/components/ParticleScene';
import { ChevronDown, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: '1',
    title: 'AI Content Generator',
    description: 'Advanced AI-powered content creation platform with natural language processing.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    tags: ['AI', 'NLP', 'React']
  },
  {
    id: '2',
    title: 'Smart Analytics Dashboard',
    description: 'Real-time analytics with predictive insights and beautiful visualizations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    tags: ['Analytics', 'D3.js', 'Python']
  },
  {
    id: '3',
    title: 'Voice Assistant Bot',
    description: 'Intelligent voice-activated assistant with multi-language support.',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&q=80',
    tags: ['Voice AI', 'NLP', 'AWS']
  }
];

const Index = () => {
  const sceneRef = useRef<any>(null);
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen overflow-y-auto">
      {/* Hero Section with Particle Animation */}
      <section className="relative w-full h-screen">
        <ParticleScene 
          ref={sceneRef} 
          morphToText=""
          onMorphComplete={() => {}}
        />
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in cursor-pointer z-10"
             onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span className="text-muted-foreground text-sm">Scroll Down</span>
          <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative w-full min-h-screen bg-background py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="cosmic-gradient">Featured Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Innovative AI solutions that push boundaries and solve real-world problems
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group glass-panel rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-500 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
