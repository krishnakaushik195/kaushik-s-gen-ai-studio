import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projectsData = {
  '1': {
    title: 'AI Content Generator',
    description: 'A powerful AI-driven content generation platform that creates engaging marketing copy, blog posts, and social media content using advanced language models.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tech: ['React', 'TypeScript', 'OpenAI', 'TailwindCSS'],
    features: [
      'Multiple content types generation',
      'Tone and style customization',
      'Real-time preview',
      'Export in various formats'
    ],
    github: '#',
    demo: '#'
  },
  '2': {
    title: 'Cloud Monitoring & Slack AI Ops Bot',
    description: 'AI-powered Slack Bot that connects directly to cloud infrastructure monitoring tools to provide real-time DevOps automation. Features live error monitoring, interactive AI assistant for root-cause analysis, and command execution from Slack.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tech: ['Slack Bot API', 'Python', 'Grafana', 'AWS Lambda', 'LangChain'],
    features: [
      'Live cloud error monitoring with Grafana integration',
      'Automated Slack incident alerts with severity levels',
      'Interactive AI assistant for root-cause analysis',
      'Command execution from Slack with role-based permissions',
      'Web dashboard with error history and AI insights',
      '60% reduction in incident response time'
    ],
    github: '#',
    demo: '#'
  },
  '3': {
    title: 'Voice Assistant Bot',
    description: 'Intelligent voice-activated assistant with natural language processing, task automation, and multi-language support.',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
    tech: ['Python', 'NLP', 'AWS', 'WebRTC'],
    features: [
      'Voice recognition',
      'Multi-language support',
      'Task automation',
      'Context awareness'
    ],
    github: '#',
    demo: '#'
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData[id as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-border/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Github className="w-4 h-4" />
              Code
            </Button>
            <Button size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Image with Parallax Effect */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scale-110 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-6">
          <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="inline-block glass-panel px-6 py-3 rounded-full mb-6">
              <span className="cosmic-gradient text-sm font-bold">Client Project</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-40 relative z-10 pb-20">
        <div className="glass-panel p-10 rounded-3xl mb-8 shadow-glow animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 neon-glow">
            <span className="cosmic-gradient">{project.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="glass-panel p-8 rounded-3xl mb-8 hover:shadow-glow transition-all animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-3xl font-bold mb-6 text-foreground">Tech Stack</h2>
          <div className="flex flex-wrap gap-4">
            {project.tech.map((tech, index) => (
              <span
                key={tech}
                className="px-6 py-3 rounded-2xl bg-primary/10 text-primary border-2 border-primary/30 text-base font-bold hover:scale-110 hover:bg-primary/20 transition-all cursor-default animate-fade-in"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="glass-panel p-8 rounded-3xl hover:shadow-glow transition-all animate-fade-in" style={{ animationDelay: '600ms' }}>
          <h2 className="text-3xl font-bold mb-6 text-foreground">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-4 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-all group animate-fade-in"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-foreground font-medium leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
