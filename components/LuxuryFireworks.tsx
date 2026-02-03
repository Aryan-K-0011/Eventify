import React, { useEffect, useRef } from 'react';

const LuxuryFireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const fireworks: Firework[] = [];
    const colors = ['#D4AF37', '#F3E5AB', '#FFFDD0', '#AA8C2C']; // Gold, Champagne, Cream, Dark Gold

    class Firework {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      angle: number;
      velocity: { x: number; y: number };
      brightness: number;
      radius: number;
      dead: boolean;
      distanceToTarget: number;
      distanceTraveled: number;
      coordinates: number[][];
      coordinateCount: number;
      acceleration: number;
      targetRadius: number;

      constructor(sx: number, sy: number, tx: number, ty: number) {
        this.x = sx;
        this.y = sy;
        this.targetX = tx;
        this.targetY = ty;
        this.distanceToTarget = this.calculateDistance(sx, sy, tx, ty);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(ty - sy, tx - sx);
        this.speed = 2;
        this.acceleration = 1.05;
        this.brightness = Math.random() * 50 + 50;
        this.targetRadius = 1;
        this.dead = false;
        
        // Fix: Initialize mandatory properties to satisfy TypeScript strict mode
        this.velocity = { x: 0, y: 0 };
        this.radius = 2;
      }

      calculateDistance(p1x: number, p1y: number, p2x: number, p2y: number) {
        const powX = Math.pow(p2x - p1x, 2);
        const powY = Math.pow(p2y - p1y, 2);
        return Math.sqrt(powX + powY);
      }

      update(index: number) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        if (this.targetRadius < 8) {
          this.targetRadius += 0.3;
        } else {
          this.targetRadius = 1;
        }

        this.speed *= this.acceleration;
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        
        this.distanceTraveled = this.calculateDistance(this.x + vx, this.y + vy, this.x + vx, this.y + vy); 
        
        const distX = this.targetX - this.x;
        const distY = this.targetY - this.y;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < this.speed * 2 || this.y < this.targetY) { 
             createParticles(this.targetX, this.targetY);
             fireworks.splice(index, 1);
        } else {
          this.x += vx;
          this.y += vy;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsl(45, 100%, ${this.brightness}%)`; // Gold Hue
        ctx.stroke();
      }
    }

    class Particle {
      x: number;
      y: number;
      coordinates: number[][];
      coordinateCount: number;
      angle: number;
      speed: number;
      friction: number;
      gravity: number;
      hue: number;
      brightness: number;
      alpha: number;
      decay: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 5;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 10 + 1;
        this.friction = 0.95;
        this.gravity = 0.5; // Slightly heavier for elegant fall
        this.hue = 45; // Gold
        this.brightness = Math.random() * 50 + 50;
        this.alpha = 1;
        this.decay = Math.random() * 0.01 + 0.005; // Slow decay
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(index: number) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= this.decay) {
          particles.splice(index, 1);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.lineWidth = Math.random() * 2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    function createParticles(x: number, y: number) {
      let particleCount = 50; // Fewer particles for cleaner look
      while (particleCount--) {
        particles.push(new Particle(x, y));
      }
    }

    // Loop
    function loop() {
      if (!ctx || !canvas) return;
      
      // Create trails
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Slow fade for long trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      let i = fireworks.length;
      while (i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
      }

      let j = particles.length;
      while (j--) {
        particles[j].draw();
        particles[j].update(j);
      }

      // Randomly launch fireworks
      if (Math.random() < 0.03) { // 3% chance per frame
        fireworks.push(new Firework(width / 2 + (Math.random() - 0.5) * width * 0.5, height, Math.random() * width, Math.random() * height / 2));
      }

      requestAnimationFrame(loop);
    }

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    loop();

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LuxuryFireworks;