import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gold">
          Let's Connect
        </h2>
        <p className="text-xl text-muted-foreground mb-12">
          Interested in working together? Let's discuss how AI can transform your business.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="bg-gold hover:bg-gold/90 text-background">
            <Mail className="mr-2 w-5 h-5" />
            Email Me
          </Button>
          <Button size="lg" variant="outline" className="border-gold/40 hover:bg-gold/10">
            <Linkedin className="mr-2 w-5 h-5" />
            LinkedIn
          </Button>
          <Button size="lg" variant="outline" className="border-gold/40 hover:bg-gold/10">
            <Github className="mr-2 w-5 h-5" />
            GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
