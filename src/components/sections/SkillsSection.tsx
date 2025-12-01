import { Card } from '@/components/ui/card';

const skills = [
  { category: 'AI & ML', items: ['GPT Models', 'LangChain', 'Hugging Face', 'TensorFlow'] },
  { category: 'Development', items: ['Python', 'JavaScript', 'React', 'Node.js'] },
  { category: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
  { category: 'Specializations', items: ['RAG Systems', 'Fine-tuning', 'Prompt Engineering', 'MLOps'] },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20 bg-muted/20">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-gold text-center">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <Card key={skill.category} className="p-6 bg-background/50 backdrop-blur border-gold/20 hover:border-gold/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-gold">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span 
                    key={item} 
                    className="px-3 py-1 bg-gold/10 text-foreground rounded-full text-sm border border-gold/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
