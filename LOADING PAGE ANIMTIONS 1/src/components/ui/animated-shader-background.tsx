import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        // Hash function for random values
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        // Create a shooting star/meteor
        float meteor(vec2 uv, vec2 pos, float seed) {
          // Meteor direction (diagonal from top-right to bottom-left)
          vec2 dir = normalize(vec2(-1.5, -1.0));
          
          // Calculate distance from point to meteor line
          vec2 toPoint = uv - pos;
          float alongLine = dot(toPoint, dir);
          vec2 closestPoint = alongLine * dir;
          float dist = length(toPoint - closestPoint);
          
          // Meteor tail length and fade
          float tailLength = 0.3 + hash(vec2(seed)) * 0.4;
          float tailFade = smoothstep(tailLength, 0.0, alongLine);
          tailFade *= smoothstep(-0.05, 0.0, alongLine);
          
          // Meteor thickness (thin streaks)
          float thickness = 0.002 + hash(vec2(seed * 2.0)) * 0.003;
          float meteor = smoothstep(thickness, 0.0, dist);
          
          // Apply tail fade
          meteor *= tailFade;
          
          // Brightness variation
          meteor *= 0.7 + hash(vec2(seed * 3.0)) * 0.3;
          
          return meteor;
        }

        void main() {
          // Normalize coordinates
          vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
          
          // Dark background with slight blue tint
          vec3 color = vec3(0.0, 0.0, 0.02);
          
          // Number of meteors
          float numMeteors = 15.0;
          
          for (float i = 0.0; i < numMeteors; i++) {
            float seed = i * 123.456;
            
            // Speed variation for each meteor
            float speed = 0.15 + hash(vec2(seed * 4.0)) * 0.25;
            
            // Stagger the start times
            float timeOffset = hash(vec2(seed * 5.0)) * 10.0;
            float t = iTime * speed + timeOffset;
            
            // Loop the animation
            t = mod(t, 8.0);
            
            // Starting position (top-right area, spread out)
            float startX = 0.8 + hash(vec2(seed * 6.0)) * 1.2;
            float startY = 0.6 + hash(vec2(seed * 7.0)) * 1.0;
            
            // Move diagonally down and left
            vec2 pos = vec2(startX - t * 0.8, startY - t * 0.5);
            
            // Calculate meteor
            float m = meteor(uv, pos, seed);
            
            // Color variation (blue to cyan to purple)
            float colorSeed = hash(vec2(seed * 8.0));
            vec3 meteorColor;
            
            if (colorSeed < 0.4) {
              // Blue meteors
              meteorColor = vec3(0.2, 0.4, 1.0);
            } else if (colorSeed < 0.7) {
              // Cyan meteors
              meteorColor = vec3(0.3, 0.8, 1.0);
            } else {
              // Purple meteors
              meteorColor = vec3(0.6, 0.3, 1.0);
            }
            
            // Add glow
            meteorColor *= (1.0 + m * 2.0);
            
            // Accumulate color
            color += meteorColor * m;
          }
          
          // Add some stars in the background
          for (float i = 0.0; i < 50.0; i++) {
            vec2 starPos = vec2(
              hash(vec2(i * 12.34)) * 3.0 - 1.5,
              hash(vec2(i * 56.78)) * 2.0 - 1.0
            );
            
            float starDist = length(uv - starPos);
            float star = smoothstep(0.002, 0.0, starDist);
            
            // Twinkling effect
            float twinkle = 0.5 + 0.5 * sin(iTime * 3.0 + i);
            star *= twinkle;
            
            color += vec3(0.8, 0.9, 1.0) * star * 0.3;
          }
          
          // Slight vignette
          float vignette = 1.0 - length(uv * 0.5);
          vignette = smoothstep(0.3, 1.0, vignette);
          color *= vignette;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden" />
  );
};

export default AnimatedShaderBackground;
