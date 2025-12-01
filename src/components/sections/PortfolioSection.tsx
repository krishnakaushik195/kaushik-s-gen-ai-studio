import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'AI Chat Assistant',
    description: 'Built a conversational AI assistant using GPT-4 and LangChain for customer support automation.',
    tech: ['GPT-4', 'LangChain', 'Python', 'FastAPI'],
  },
  {
    title: 'Document Analysis System',
    description: 'Developed an intelligent document processing system with RAG capabilities for enterprise clients.',
    tech: ['RAG', 'Vector DB', 'React', 'Node.js'],
  },
  {
    title: 'Content Generation Platform',
    description: 'Created a multi-modal AI platform for generating marketing content across different channels.',
    tech: ['DALL-E', 'Claude', 'TypeScript', 'AWS'],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-gold text-center">
          Portfolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.title} className="p-6 bg-background/50 backdrop-blur border-gold/20 hover:border-gold/40 transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-3 text-gold group-hover:text-gold/80 transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 bg-gold/10 text-foreground rounded text-xs border border-gold/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full group-hover:bg-gold/10 transition-colors">
                View Project
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
