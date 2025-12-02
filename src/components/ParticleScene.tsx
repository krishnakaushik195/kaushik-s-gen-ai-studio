import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface ParticleSceneProps {
  morphToText?: string;
  onMorphComplete?: () => void;
}

const ParticleScene = forwardRef(({ morphToText, onMorphComplete }: ParticleSceneProps, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const particlesRef = useRef<any>(null);
  const currentStateRef = useRef<string>('sphere');
  const animationFrameRef = useRef<number>();
  const sequenceRef = useRef<number>(0);

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === 'undefined' || !(window as any).THREE) return;

    const THREE = (window as any).THREE;
    const gsap = (window as any).gsap;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 25;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create particles
    const count = 12000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const sphericalDistribution = (i: number) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      return {
        x: 8 * Math.cos(theta) * Math.sin(phi),
        y: 8 * Math.sin(theta) * Math.sin(phi),
        z: 8 * Math.cos(phi),
      };
    };

    for (let i = 0; i < count; i++) {
      const point = sphericalDistribution(i);
      
      positions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;

      // Tech-inspired colors: green, cyan, blue, purple
      const colorChoice = Math.random();
      const color = new THREE.Color();
      
      if (colorChoice < 0.3) {
        // Cyan/green
        color.setRGB(0, 1, 0.67); // #00FFAA
      } else if (colorChoice < 0.6) {
        // Green
        color.setRGB(0, 1, 0.4); // #00FF66
      } else if (colorChoice < 0.8) {
        // Light blue
        color.setRGB(0.4, 0.78, 1); // #66C8FF
      } else {
        // Purple
        color.setRGB(0.78, 0.59, 1); // #C896FF
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.07, // Particle size
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Create static background stars
    const starCount = 500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Spread stars across a large area
      starPositions[i * 3] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20; // Behind particles

      // Same tech colors as particles
      const colorChoice = Math.random();
      const color = new THREE.Color();
      
      if (colorChoice < 0.3) {
        color.setRGB(0, 1, 0.67); // Cyan/green
      } else if (colorChoice < 0.6) {
        color.setRGB(0, 1, 0.4); // Green
      } else if (colorChoice < 0.8) {
        color.setRGB(0.4, 0.78, 1); // Light blue
      } else {
        color.setRGB(0.78, 0.59, 1); // Purple
      }

      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.07, // Same size as main particles
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.6, // Slightly dimmer for background effect
      sizeAttenuation: true,
    });

    const staticStars = new THREE.Points(starGeometry, starMaterial);
    scene.add(staticStars); // Add before main particles so they're behind

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (currentStateRef.current === 'sphere' && particles) {
        particles.rotation.y += 0.002;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Auto sequence
    const startSequence = () => {
      const textConfigs = [
        { lines: [{ text: 'WELCOME', size: 100 }] },
        { lines: [
          { text: 'this is', size: 30 },
          { text: 'KAUSHIK', size: 100 }
        ] },
        { lines: [
          { text: 'I am', size: 30 },
          { text: 'GEN AI', size: 100 },
          { text: 'developer', size: 30 }
        ] }
      ];
      
      const runSequence = () => {
        const config = textConfigs[sequenceRef.current % textConfigs.length];
        morphToMultiLineText(config);
        sequenceRef.current++;
        
        setTimeout(() => {
          morphToSphere();
          setTimeout(runSequence, 2000);
        }, 3000);
      };

      setTimeout(runSequence, 1000);
    };

    startSequence();

    // Text morphing functions
    const createMultiLineTextPoints = (config: { lines: { text: string; size: number }[] }) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return [];

      const padding = 20;
      const lineSpacing = 1.2;
      
      // Calculate total height and max width
      let totalHeight = 0;
      let maxWidth = 0;
      
      const lineMetrics = config.lines.map(line => {
        ctx.font = `bold ${line.size}px Space Grotesk, Arial, sans-serif`;
        const metrics = ctx.measureText(line.text);
        const height = line.size * lineSpacing;
        totalHeight += height;
        maxWidth = Math.max(maxWidth, metrics.width);
        return { ...line, metrics, height };
      });

      canvas.width = maxWidth + padding * 2;
      canvas.height = totalHeight + padding * 2;

      // Draw each line
      let currentY = padding;
      lineMetrics.forEach(line => {
        ctx.fillStyle = 'white';
        ctx.font = `bold ${line.size}px Space Grotesk, Arial, sans-serif`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText(line.text, canvas.width / 2, currentY);
        currentY += line.height;
      });

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const points: { x: number; y: number }[] = [];
      const threshold = 128;

      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > threshold) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor(i / 4 / canvas.width);
          
          // Find which line this pixel belongs to
          let currentLineY = padding;
          let samplingRate = 0.3;
          
          for (const line of lineMetrics) {
            if (y >= currentLineY && y < currentLineY + line.height) {
              // Use higher sampling rate for smaller text
              samplingRate = line.size < 50 ? 0.7 : 0.3;
              break;
            }
            currentLineY += line.height;
          }
          
          if (Math.random() < samplingRate) {
            points.push({
              x: (x - canvas.width / 2) / 10,
              y: -(y - canvas.height / 2) / 10,
            });
          }
        }
      }

      return points;
    };

    const morphToMultiLineText = (config: { lines: { text: string; size: number }[] }) => {
      if (!particles || !gsap) return;
      
      currentStateRef.current = 'text';
      const textPoints = createMultiLineTextPoints(config);
      const positions = particles.geometry.attributes.position.array;
      const targetPositions = new Float32Array(count * 3);

      gsap.to(particles.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
      });

      for (let i = 0; i < count; i++) {
        if (i < textPoints.length) {
          targetPositions[i * 3] = textPoints[i].x;
          targetPositions[i * 3 + 1] = textPoints[i].y;
          targetPositions[i * 3 + 2] = 0;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 20 + 10;
          targetPositions[i * 3] = Math.cos(angle) * radius;
          targetPositions[i * 3 + 1] = Math.sin(angle) * radius;
          targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
      }

      for (let i = 0; i < positions.length; i += 3) {
        gsap.to(particles.geometry.attributes.position.array, {
          [i]: targetPositions[i],
          [i + 1]: targetPositions[i + 1],
          [i + 2]: targetPositions[i + 2],
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            particles.geometry.attributes.position.needsUpdate = true;
          },
        });
      }
    };

    const morphToSphere = () => {
      if (!particles || !gsap) return;
      
      currentStateRef.current = 'sphere';
      const positions = particles.geometry.attributes.position.array;
      const targetPositions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const point = sphericalDistribution(i);
        
        targetPositions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
        targetPositions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
        targetPositions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;
      }

      for (let i = 0; i < positions.length; i += 3) {
        gsap.to(particles.geometry.attributes.position.array, {
          [i]: targetPositions[i],
          [i + 1]: targetPositions[i + 1],
          [i + 2]: targetPositions[i + 2],
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            particles.geometry.attributes.position.needsUpdate = true;
          },
        });
      }
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (morphToText && particlesRef.current && (window as any).gsap) {
      const morphToSingleText = (text: string) => {
        if (!particlesRef.current) return;
        
        const THREE = (window as any).THREE;
        const gsap = (window as any).gsap;
        const particles = particlesRef.current;
        const count = 12000;

        currentStateRef.current = 'text';
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const fontSize = 100;
        const padding = 20;

        ctx.font = `bold ${fontSize}px Space Grotesk, Arial, sans-serif`;
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;

        canvas.width = textWidth + padding * 2;
        canvas.height = textHeight + padding * 2;

        ctx.fillStyle = 'white';
        ctx.font = `bold ${fontSize}px Space Grotesk, Arial, sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const points: { x: number; y: number }[] = [];
        const threshold = 128;

        for (let i = 0; i < pixels.length; i += 4) {
          if (pixels[i] > threshold) {
            const x = (i / 4) % canvas.width;
            const y = Math.floor(i / 4 / canvas.width);
            
            if (Math.random() < 0.3) {
              points.push({
                x: (x - canvas.width / 2) / (fontSize / 10),
                y: -(y - canvas.height / 2) / (fontSize / 10),
              });
            }
          }
        }

        const positions = particles.geometry.attributes.position.array;
        const targetPositions = new Float32Array(count * 3);

        gsap.to(particles.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
        });

        for (let i = 0; i < count; i++) {
          if (i < points.length) {
            targetPositions[i * 3] = points[i].x;
            targetPositions[i * 3 + 1] = points[i].y;
            targetPositions[i * 3 + 2] = 0;
          } else {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 20 + 10;
            targetPositions[i * 3] = Math.cos(angle) * radius;
            targetPositions[i * 3 + 1] = Math.sin(angle) * radius;
            targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
          }
        }

        for (let i = 0; i < positions.length; i += 3) {
          gsap.to(particles.geometry.attributes.position.array, {
            [i]: targetPositions[i],
            [i + 1]: targetPositions[i + 1],
            [i + 2]: targetPositions[i + 2],
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
              particles.geometry.attributes.position.needsUpdate = true;
            },
          });
        }

        setTimeout(() => {
          if (onMorphComplete) onMorphComplete();
        }, 3000);
      };

      morphToSingleText(morphToText);
    }
  }, [morphToText, onMorphComplete]);

  return <div ref={containerRef} id="three-container" />;
});

ParticleScene.displayName = 'ParticleScene';

export default ParticleScene;
