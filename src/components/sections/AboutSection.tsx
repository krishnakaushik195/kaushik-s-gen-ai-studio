const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gold">
          About Me
        </h2>
        <div className="space-y-6 text-lg md:text-xl text-muted-foreground">
          <p>
            I'm <span className="text-foreground font-semibold">Kaushik</span>, a Gen AI Developer passionate about 
            building intelligent systems that transform how we interact with technology.
          </p>
          <p>
            With expertise in machine learning, natural language processing, and cutting-edge AI frameworks, 
            I create solutions that push the boundaries of what's possible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
