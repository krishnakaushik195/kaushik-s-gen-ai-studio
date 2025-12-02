import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleScene from '@/components/ParticleScene';
import StarryBackground from '@/components/StarryBackground';
import { ChevronDown, ArrowRight, Database, Zap, Globe, Star } from 'lucide-react';
import databaseAgentImg from '@/assets/database-agent.jpg';
import cloudMonitoringImg from '@/assets/cloud-monitoring-bot.jpg';
import voiceAssistantImg from '@/assets/voice-assistant-bot.jpg';

const categories = [
  { id: 'all', name: 'All Projects', icon: Globe },
  { id: 'ai-automation', name: 'AI Automation', icon: Database },
  { id: 'integration', name: 'Integration & APIs', icon: Zap },
  { id: 'web-dev', name: 'Web Development', icon: Globe }
];

const projects = [
  {
    id: '1',
    title: 'Database Agent – Natural Language to Data Insights',
    description: 'Intelligent AI agent that converts plain natural language into SQL queries with automated data visualization.',
    image: databaseAgentImg,
    tags: ['AI', 'NLP', 'Data Analytics'],
    category: 'ai-automation',
    rating: 5,
    review: 'Exceptional work! Transformed our data workflow completely.'
  },
  {
    id: '2',
    title: 'Cloud Monitoring & Slack AI Ops Bot',
    description: 'AI-powered DevOps automation with real-time cloud infrastructure monitoring and intelligent incident response.',
    image: cloudMonitoringImg,
    tags: ['AIOps', 'Slack Bot', 'Cloud Monitoring'],
    category: 'integration',
    rating: 5,
    review: 'Game changer for our DevOps team. Highly recommended!'
  },
  {
    id: '3',
    title: 'Voice Assistant Bot',
    description: 'Intelligent voice-activated assistant with multi-language support.',
    image: voiceAssistantImg,
    tags: ['Voice AI', 'NLP', 'AWS'],
    category: 'ai-automation',
    rating: 5,
    review: 'Outstanding quality and seamless integration.'
  }
];

const Index = () => {
  const sceneRef = useRef<any>(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  // Track scroll to move particle animation upward
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Calculate progress (0 to 1) based on scroll
      const progress = Math.min(scrollPosition / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-y-auto scroll-smooth">
      {/* Hero Section with Particle Animation - Moves up on scroll */}
      <section 
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{
          transform: `translateY(-${scrollProgress * 100}%)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <ParticleScene 
          ref={sceneRef} 
          morphToText=""
          onMorphComplete={() => {}}
        />
        
        {/* Scroll Down Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in cursor-pointer z-10"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          style={{ opacity: 1 - scrollProgress }}
        >
          <span className="text-muted-foreground text-sm">Scroll Down</span>
          <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
        </div>
      </section>

      {/* Spacer to allow scrolling */}
      <div className="h-screen" />

      {/* Projects Section - Comes up from below */}
      <section className="relative w-full min-h-screen overflow-hidden py-20 px-6 z-10">
        {/* Starry Background with Shooting Stars */}
        <StarryBackground />
        
        {/* Subtle Gradient Overlays */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="cosmic-gradient">AI Automation for Clients</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
              Proven AI solutions I've built for real businesses - transforming workflows with intelligent automation
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 ${
                      selectedCategory === category.id
                        ? 'glass-panel shadow-glow scale-105'
                        : 'glass-panel hover:scale-105'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform group-hover:rotate-12 cosmic-gradient ${
                      selectedCategory === category.id ? 'animate-pulse' : ''
                    }`} />
                    <span className="cosmic-gradient">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-fr">
            {filteredProjects.length === 0 ? (
              <div className="lg:col-span-12 text-center py-20 glass-panel rounded-3xl">
                <p className="text-muted-foreground text-xl">No projects found in this category</p>
              </div>
            ) : (
              <>
                {/* Large Featured Project - Spans more space */}
                {filteredProjects[0] && (
                  <div
                    className="lg:col-span-7 lg:row-span-2 group relative overflow-hidden rounded-3xl cursor-pointer animate-fade-in"
                    style={{ animationDelay: '0ms' }}
                    onClick={() => navigate(`/project/${filteredProjects[0].id}`)}
            >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative h-full min-h-[500px] overflow-hidden glass-panel">
                      <img
                        src={filteredProjects[0].image}
                        alt={filteredProjects[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                      
                      {/* Golden Star Rating - Top Right */}
                      <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/40">
                        <div className="flex gap-0.5">
                          {[...Array(filteredProjects[0].rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                          ))}
                        </div>
                        <span className="text-gold text-sm font-bold">{filteredProjects[0].rating}.0</span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {filteredProjects[0].tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full cosmic-gradient-bg backdrop-blur-sm text-foreground text-xs font-bold border border-primary/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-gold text-sm italic mb-2 font-medium">"{filteredProjects[0].review}"</p>
                        <h3 className="text-3xl md:text-4xl font-bold mb-3 text-foreground neon-glow">
                          {filteredProjects[0].title}
                        </h3>
                        <p className="text-muted-foreground text-lg mb-4 line-clamp-2">
                          {filteredProjects[0].description}
                        </p>
                        <div className="flex items-center gap-3 text-primary font-bold group-hover:gap-5 transition-all">
                          <span className="text-lg">Explore Project</span>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Second Project - Medium Size */}
                {filteredProjects[1] && (
                  <div
                    className="lg:col-span-5 lg:row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer animate-fade-in"
                    style={{ animationDelay: '150ms' }}
                    onClick={() => navigate(`/project/${filteredProjects[1].id}`)}
            >
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative h-full min-h-[300px] overflow-hidden glass-panel">
                      <img
                        src={filteredProjects[1].image}
                        alt={filteredProjects[1].title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      
                      {/* Golden Star Rating - Top Right */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/40">
                        <div className="flex gap-0.5">
                          {[...Array(filteredProjects[1].rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                          ))}
                        </div>
                        <span className="text-gold text-xs font-bold">{filteredProjects[1].rating}.0</span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {filteredProjects[1].tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full cosmic-gradient-bg backdrop-blur-sm text-foreground text-xs font-bold border border-primary/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-gold text-xs italic mb-2 font-medium">"{filteredProjects[1].review}"</p>
                        <h3 className="text-2xl font-bold mb-2 text-foreground">
                          {filteredProjects[1].title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {filteredProjects[1].description}
                        </p>
                        <div className="flex items-center gap-2 text-secondary font-bold group-hover:gap-4 transition-all">
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Third Project - Medium Size */}
                {filteredProjects[2] && (
                  <div
                    className="lg:col-span-5 lg:row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer animate-fade-in"
                    style={{ animationDelay: '300ms' }}
                    onClick={() => navigate(`/project/${filteredProjects[2].id}`)}
            >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative h-full min-h-[300px] overflow-hidden glass-panel">
                      <img
                        src={filteredProjects[2].image}
                        alt={filteredProjects[2].title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:saturate-150"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      
                      {/* Golden Star Rating - Top Right */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/40">
                        <div className="flex gap-0.5">
                          {[...Array(filteredProjects[2].rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                          ))}
                        </div>
                        <span className="text-gold text-xs font-bold">{filteredProjects[2].rating}.0</span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {filteredProjects[2].tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full cosmic-gradient-bg backdrop-blur-sm text-foreground text-xs font-bold border border-primary/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-gold text-xs italic mb-2 font-medium">"{filteredProjects[2].review}"</p>
                        <h3 className="text-2xl font-bold mb-2 text-foreground">
                          {filteredProjects[2].title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {filteredProjects[2].description}
                        </p>
                        <div className="flex items-center gap-2 text-accent font-bold group-hover:gap-4 transition-all">
                          <span>Discover More</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
