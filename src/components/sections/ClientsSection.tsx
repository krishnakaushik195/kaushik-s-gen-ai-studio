import { Card } from '@/components/ui/card';

const clients = [
  {
    name: 'TechCorp Inc.',
    project: 'AI-Powered Analytics Platform',
    impact: '40% reduction in processing time',
  },
  {
    name: 'StartupXYZ',
    project: 'Conversational AI Assistant',
    impact: '3x increase in customer satisfaction',
  },
  {
    name: 'Enterprise Solutions',
    project: 'Document Intelligence System',
    impact: '$500K annual cost savings',
  },
  {
    name: 'Digital Agency',
    project: 'Content Generation Tool',
    impact: '10x content production speed',
  },
];

const ClientsSection = () => {
  return (
    <section id="clients" className="min-h-screen flex items-center justify-center px-6 py-20 bg-muted/20">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-gold text-center">
          Clients & Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clients.map((client) => (
            <Card key={client.name} className="p-6 bg-background/50 backdrop-blur border-gold/20 hover:border-gold/40 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gold">{client.name}</h3>
              </div>
              <p className="text-foreground mb-2 font-medium">{client.project}</p>
              <p className="text-muted-foreground text-sm italic">{client.impact}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
