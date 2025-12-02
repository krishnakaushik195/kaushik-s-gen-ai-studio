import { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Star class
    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleDirection: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity <= 0 || this.opacity >= 1) {
          this.twinkleDirection *= -1;
        }
      }
    }

    // Shooting star class
    class ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number;
      tail: { x: number; y: number; opacity: number }[];

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5; // Top half of screen
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 8 + 6;
        this.opacity = 1;
        this.angle = Math.PI / 4; // 45 degrees
        this.tail = [];
      }

      draw() {
        if (!ctx) return;
        
        // Draw main shooting star
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();

        // Draw glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 10);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Draw tail trail
        this.tail.forEach((point, index) => {
          const size = (1 - index / this.tail.length) * 3;
          ctx.fillStyle = `rgba(255, 255, 255, ${point.opacity})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      update() {
        // Add current position to tail
        this.tail.unshift({ x: this.x, y: this.y, opacity: this.opacity });
        if (this.tail.length > 20) {
          this.tail.pop();
        }

        // Fade out tail
        this.tail.forEach((point, index) => {
          point.opacity = this.opacity * (1 - index / this.tail.length);
        });

        // Move shooting star
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Fade out
        this.opacity -= 0.01;

        // Reset when off screen or faded
        if (
          this.opacity <= 0 ||
          this.x > canvas.width ||
          this.y > canvas.height
        ) {
          this.reset();
          this.opacity = 0; // Start invisible, will fade in on next cycle
          setTimeout(() => {
            this.opacity = 1;
          }, Math.random() * 5000 + 2000); // Random delay before next shooting star
        }
      }
    }

    // Create stars
    const stars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push(new Star());
    }

    // Create shooting stars
    const shootingStars: ShootingStar[] = [];
    for (let i = 0; i < 3; i++) {
      const star = new ShootingStar();
      star.opacity = 0; // Start invisible
      setTimeout(() => {
        star.opacity = 1;
      }, Math.random() * 3000 + i * 2000);
      shootingStars.push(star);
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      // Draw and update shooting stars
      shootingStars.forEach((shootingStar) => {
        shootingStar.update();
        shootingStar.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #000000, #0a0a1a, #050510)' }}
    />
  );
};

export default StarryBackground;
