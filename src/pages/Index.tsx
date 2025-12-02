import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleScene from '@/components/ParticleScene';
import StarryBackground from '@/components/StarryBackground';
import { ChevronDown, ArrowRight, Database, Zap, Globe, Star } from 'lucide-react';
import databaseAgentImg from '@/assets/database-agent.jpg';
import cloudMonitoringImg from '@/assets/cloud-monitoring-bot.jpg';
import aiChatbotRagImg from '@/assets/ai-chatbot-rag.jpg';
import photographyStudioImg from '@/assets/photography-studio.jpg';
import portfolioBuilderImg from '@/assets/portfolio-builder.jpg';
import aiFinTechImg from '@/assets/ai-fintech-automation.jpg';

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
    title: 'AI Chatbot Integration with Website RAG & Local LLM',
    description: 'Fully integrated AI chatbot using lightweight LLaMA model with RAG for accurate, context-aware responses directly from website content. Runs efficiently on low-power CPUs.',
    image: aiChatbotRagImg,
    tags: ['RAG', 'Local LLM', 'Chatbot'],
    category: 'integration',
    rating: 5,
    review: 'Perfectly integrated with our site. Smart and fast!'
  },
  {
    id: '4',
    title: 'Photography Studio Website – Full-Stack Development & AWS Deployment',
    description: 'Modern, fully responsive website for professional photography studio with custom photo galleries, client inquiry forms, and fast image loading. Deployed on AWS with CI/CD pipeline.',
    image: photographyStudioImg,
    tags: ['React', 'AWS', 'Full-Stack'],
    category: 'web-dev',
    rating: 5,
    review: 'Professional online presence launched. Smooth performance!'
  },
  {
    id: '5',
    title: 'Automated Student Portfolio Website Builder + AI Assistant',
    description: 'Fully automated website generator that creates personalized portfolio websites for students with AI voice/chat assistant powered by Gemini. Includes dynamic templates, one-click AWS deployment, and admin dashboard.',
    image: portfolioBuilderImg,
    tags: ['AI', 'Automation', 'AWS'],
    category: 'ai-automation',
    rating: 5,
    review: 'Revolutionary platform! Simplified student portfolios instantly.'
  },
  {
    id: '6',
    title: 'AI FinTech Automation – Smart Budgeting & Financial Planning App',
    description: 'AI-driven financial assistant for Gen-Z with automated budget planning, real-time spending insights, and smart money recommendations. Production-ready with secure KYC, bank integration, and cloud deployment.',
    image: aiFinTechImg,
    tags: ['AI', 'FinTech', 'Automation'],
    category: 'ai-automation',
    rating: 5,
    review: 'Helps young users build healthy money habits effortlessly!'
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
          
          {/* Creative Asymmetric Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[280px]">
            {filteredProjects.length === 0 ? (
              <div className="lg:col-span-12 text-center py-20 glass-panel rounded-3xl">
                <p className="text-muted-foreground text-xl">No projects found in this category</p>
              </div>
            ) : (
              <>
                {filteredProjects.map((project, index) => {
                  // Creative asymmetric layout pattern
                  // Pattern: large, medium, tall, wide, medium, large...
                  const layoutPatterns = [
                    { col: 'lg:col-span-8', row: 'lg:row-span-2', minH: 'min-h-[580px]' }, // 0: Extra large hero
                    { col: 'lg:col-span-4', row: 'lg:row-span-1', minH: 'min-h-[280px]' }, // 1: Small square
                    { col: 'lg:col-span-4', row: 'lg:row-span-2', minH: 'min-h-[580px]' }, // 2: Tall vertical
                    { col: 'lg:col-span-8', row: 'lg:row-span-1', minH: 'min-h-[280px]' }, // 3: Wide horizontal
                    { col: 'lg:col-span-6', row: 'lg:row-span-1', minH: 'min-h-[280px]' }, // 4: Medium
                    { col: 'lg:col-span-6', row: 'lg:row-span-2', minH: 'min-h-[580px]' }, // 5: Large featured
                  ];
                  
                  const pattern = layoutPatterns[index % layoutPatterns.length];
                  const isLarge = pattern.row === 'lg:row-span-2';
                  
                  // Category-based gradient colors
                  const gradientMap = {
                    'ai-automation': 'from-primary/20 via-transparent to-purple-500/20',
                    'integration': 'from-accent/20 via-transparent to-blue-500/20',
                    'web-dev': 'from-secondary/20 via-transparent to-green-500/20',
                  };
                  
                  const gradient = gradientMap[project.category as keyof typeof gradientMap] || 'from-primary/20 via-transparent to-accent/20';
                  
                  return (
                    <div
                      key={project.id}
                      className={`${pattern.col} ${pattern.row} group relative overflow-hidden rounded-3xl cursor-pointer animate-fade-in hover-scale`}
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        transformOrigin: 'center'
                      }}
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      {/* Hover gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                      
                      {/* Connecting line decoration */}
                      <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className={`relative h-full ${pattern.minH} overflow-hidden glass-panel`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className={`w-full h-full object-cover transition-all duration-700 ${
                            isLarge 
                              ? 'group-hover:scale-110 group-hover:rotate-2' 
                              : 'group-hover:scale-105 group-hover:brightness-110'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                        
                        {/* Category badge - Top Left */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-panel border border-primary/40">
                          <span className="text-primary text-xs font-bold uppercase tracking-wider">
                            {project.category.replace('-', ' ')}
                          </span>
                        </div>
                        
                        {/* Golden Star Rating - Top Right */}
                        <div className={`absolute top-4 right-4 flex items-center gap-2 ${
                          isLarge ? 'px-4 py-2' : 'px-3 py-1.5'
                        } rounded-full bg-gold/20 backdrop-blur-sm border border-gold/40`}>
                          <div className="flex gap-0.5">
                            {[...Array(project.rating)].map((_, i) => (
                              <Star key={i} className={`${isLarge ? 'w-4 h-4' : 'w-3.5 h-3.5'} fill-gold text-gold`} />
                            ))}
                          </div>
                          <span className={`text-gold ${isLarge ? 'text-sm' : 'text-xs'} font-bold`}>{project.rating}.0</span>
                        </div>
                        
                        <div className={`absolute bottom-0 left-0 right-0 ${
                          isLarge ? 'p-8' : 'p-6'
                        } transform transition-all duration-500 group-hover:translate-y-[-10px]`}>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`${
                                  isLarge ? 'px-3 py-1' : 'px-2.5 py-1'
                                } rounded-full cosmic-gradient-bg backdrop-blur-sm text-foreground text-xs font-bold border border-primary/40 transform group-hover:scale-110 transition-transform`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className={`text-gold ${isLarge ? 'text-sm' : 'text-xs'} italic mb-2 font-medium line-clamp-1`}>
                            "{project.review}"
                          </p>
                          <h3 className={`${
                            isLarge ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                          } font-bold mb-2 text-foreground ${isLarge ? 'neon-glow' : ''} line-clamp-2`}>
                            {project.title}
                          </h3>
                          <p className={`text-muted-foreground ${
                            isLarge ? 'text-base mb-4' : 'text-sm mb-3'
                          } line-clamp-2`}>
                            {project.description}
                          </p>
                          <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                            <span className={isLarge ? 'text-base' : 'text-sm'}>{isLarge ? 'Explore Project' : 'View Details'}</span>
                            <ArrowRight className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'} transform group-hover:translate-x-2 transition-transform`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
