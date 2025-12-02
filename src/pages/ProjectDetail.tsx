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
    title: 'Smart Analytics Dashboard',
    description: 'Real-time analytics platform with AI-powered insights, predictive analytics, and beautiful data visualizations for business intelligence.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tech: ['React', 'D3.js', 'Python', 'TensorFlow'],
    features: [
      'Real-time data processing',
      'Predictive analytics',
      'Custom dashboard builder',
      'Interactive visualizations'
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

      {/* Hero Image */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        <div className="glass-panel p-8 rounded-lg mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="cosmic-gradient">{project.title}</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="glass-panel p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="glass-panel p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Key Features</h2>
          <ul className="space-y-3">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
