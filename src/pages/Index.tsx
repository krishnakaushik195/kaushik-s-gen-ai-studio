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
import profilePhoto from '@/assets/profile-photo.png';

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
          
          {/* Perfectly Fitted Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[280px]">
            {filteredProjects.length === 0 ? (
              <div className="lg:col-span-12 text-center py-20 glass-panel rounded-3xl">
                <p className="text-muted-foreground text-xl">No projects found in this category</p>
              </div>
            ) : (
              <>
                {filteredProjects.map((project, index) => {
                  // Perfectly balanced layout - ensures complete grid fill
                  // Pattern creates symmetric, gap-free layouts
                  const layoutPatterns = [
                    { col: 'lg:col-span-8', row: 'lg:row-span-2', minH: 'min-h-[580px]' }, // 0: Large (8x2) - leaves 4 cols
                    { col: 'lg:col-span-4', row: 'lg:row-span-2', minH: 'min-h-[580px]' }, // 1: Tall (4x2) - fills remaining 4 cols
                    { col: 'lg:col-span-6', row: 'lg:row-span-1', minH: 'min-h-[280px]' }, // 2: Half (6x1)
                    { col: 'lg:col-span-6', row: 'lg:row-span-1', minH: 'min-h-[280px]' }, // 3: Half (6x1)
                    { col: 'lg:col-span-4', row: 'lg:row-span-2', minH: 'min-h-[580px]' }, // 4: Tall (4x2)
                    { col: 'lg:col-span-8', row: 'lg:row-span-2', minH: 'min-h-[580px]' }, // 5: Large (8x2) - fills remaining 8 cols
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

      {/* About Me Section */}
      <section className="relative w-full min-h-screen overflow-hidden py-20 px-6 z-10">
        <StarryBackground />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Centered Heading */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="inline-block px-4 py-2 rounded-full glass-panel border border-[hsl(var(--about-accent)_/_0.4)]">
                <span className="about-gradient text-sm font-bold uppercase tracking-wider">About Me</span>
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-display">
              <span className="about-gradient about-glow">My Story</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start lg:items-center">
            {/* Vertical Image Side */}
            <div className="relative animate-fade-in">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Image container */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--about-accent)_/_0.2)] to-[hsl(var(--about-secondary)_/_0.2)] rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative overflow-hidden rounded-3xl border-2 border-[hsl(var(--about-accent)_/_0.3)] glass-panel">
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                  
                  {/* Corner decorations */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[hsl(var(--about-accent))] animate-pulse" />
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[hsl(var(--about-secondary))] animate-pulse" style={{ animationDelay: '500ms' }} />
                </div>
                
                {/* CTA Buttons under image */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: '1200ms' }}>
                  <button className="px-8 py-4 rounded-2xl glass-panel border border-[hsl(var(--about-accent)_/_0.4)] about-gradient-bg font-bold hover:scale-105 transition-all hover:shadow-[0_0_40px_hsl(var(--about-accent)_/_0.4)]">
                    Let's Connect
                  </button>
                  <button className="px-8 py-4 rounded-2xl glass-panel border border-[hsl(var(--about-secondary)_/_0.4)] font-bold hover:scale-105 transition-all">
                    View Resume
                  </button>
                </div>
              </div>
            </div>

            {/* Story Side */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h3 className="text-2xl md:text-3xl font-bold font-display about-gradient animate-fade-in" style={{ animationDelay: '300ms' }}>
                Builder of Practical AI
              </h3>
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                  I'm an independent Generative AI Engineer and Freelance Solution Builder, helping companies turn advanced AI into real products that scale.
                </p>
                
                <p className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                  I started my journey by experimenting with AI models, automation, and data agents — and quickly realized that every business wants AI, but very few know how to make it work in the real world. So I made that my mission:
                </p>
                
                <p className="text-xl font-semibold about-gradient animate-fade-in" style={{ animationDelay: '600ms' }}>
                  Take complex AI technology and deliver it as simple, powerful solutions.
                </p>
                
                <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
                  <p className="font-semibold text-foreground mb-3">Today:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="relative before:content-['→'] before:absolute before:-left-6 before:text-[hsl(var(--about-accent))]">
                      I develop and fine-tune LLM models for production use
                    </li>
                    <li className="relative before:content-['→'] before:absolute before:-left-6 before:text-[hsl(var(--about-accent))]">
                      I build custom AI automation systems for SaaS, DevOps, Data, and FinTech
                    </li>
                    <li className="relative before:content-['→'] before:absolute before:-left-6 before:text-[hsl(var(--about-accent))]">
                      I integrate AI into websites, products, and workflows
                    </li>
                    <li className="relative before:content-['→'] before:absolute before:-left-6 before:text-[hsl(var(--about-accent))]">
                      I help teams go from idea → architecture → deployment → results
                    </li>
                  </ul>
                </div>
                
                <p className="animate-fade-in" style={{ animationDelay: '800ms' }}>
                  I've worked as a contract AI architect for clients across India, Europe, the US, and other regions — building solutions that are actually being used in production today.
                </p>
                
                <div className="animate-fade-in" style={{ animationDelay: '900ms' }}>
                  <p className="mb-3">I'm also a founding member of three AI startups, where I designed:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[hsl(var(--about-secondary))]">
                      AI agents for data intelligence
                    </li>
                    <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[hsl(var(--about-secondary))]">
                      AIOps automation for cloud monitoring
                    </li>
                    <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[hsl(var(--about-secondary))]">
                      FinTech budgeting intelligence for Gen-Z
                    </li>
                  </ul>
                </div>
                
                <p className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
                  I love solving real problems — whether it's turning natural language into business insights, automating DevOps with AI, or launching fully AI-enabled digital products.
                </p>
                
                <p className="text-xl font-semibold about-gradient animate-fade-in" style={{ animationDelay: '1100ms' }}>
                  I believe the next generation of software will be AI-first, and I'm already building it.
                </p>
              </div>
            </div>
          </div>

          {/* Skills/Tech Stack - Full Width Below */}
          <div className="mt-16 space-y-8 animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <h3 className="text-4xl md:text-5xl font-bold font-display about-gradient about-glow text-center">My bests</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Machine, Deep Learnings',
                  description: 'Including natural language processing (NLP) and topics like LLM, empower us to unlock insights from data and drive innovation',
                  techs: []
                },
                {
                  title: 'OpenAi',
                  description: 'Advancing AI with cutting-edge technologies',
                  techs: ['GPT', 'HuggingFaces', 'Langchain']
                },
                {
                  title: 'Web Development',
                  description: 'Mastering CSS, JavaScript, and React, alongside MySQL, empowers me to create dynamic and responsive web applications with seamless data management.',
                  techs: ['CSS', 'JavaScript', 'React', 'MySQL']
                },
                {
                  title: 'Data Structures',
                  description: 'My expertise spans arrays, hashmaps, trees, and graphs, enabling efficient data organization and manipulation for diverse computational tasks.',
                  techs: ['Arrays', 'Hashmaps', 'Trees', 'Graphs']
                },
                {
                  title: 'Image Processing',
                  description: 'OpenCV, leveraging YOLO architectures revolutionizes object detection and recognition, propelling advancements in computer vision applications.',
                  techs: ['OpenCV', 'YOLO']
                },
                {
                  title: 'DevOps',
                  description: "I'm adept at Linux, Docker, Kubernetes, and more, facilitating seamless deployment, scaling, and management of modern software solutions",
                  techs: ['Linux', 'Docker', 'Kubernetes']
                }
              ].map((skill, i) => (
                <div
                  key={skill.title}
                  className="group relative p-6 rounded-2xl glass-panel border border-[hsl(var(--about-accent)_/_0.3)] hover:border-[hsl(var(--about-accent)_/_0.6)] transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--about-accent)_/_0.4)] hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${1200 + i * 100}ms` }}
                >
                  <div className="absolute top-3 right-3 w-2 h-2 bg-[hsl(var(--about-accent))] rounded-full animate-pulse" />
                  
                  <h4 className="text-xl font-bold font-display about-gradient mb-3">{skill.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{skill.description}</p>
                  
                  {skill.techs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skill.techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full glass-panel border border-[hsl(var(--about-secondary)_/_0.4)] text-foreground font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
