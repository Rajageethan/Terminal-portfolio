import React, { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');

    // Responsive sizing
    const updateSize = () => {
      const containerWidth = container.offsetWidth - 4; // account for border
      canvas.width = Math.min(600, Math.max(200, containerWidth));
      canvas.height = Math.round(canvas.width / 3);
    };
    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    
    // Matrix characters
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const chars = matrixChars.split('');
    
    const fontSize = 10;
    let drops = [];
    
    // Initialize drops
    const initDrops = () => {
      const columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }
    };
    initDrops();
    
    function draw() {
      const columns = Math.floor(canvas.width / fontSize);

      // Reinit drops if column count changed
      if (drops.length !== columns) {
        initDrops();
      }

      // Semi-transparent background for trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    }
    
    const interval = setInterval(draw, 35);
    
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ margin: '10px 0', width: '100%', maxWidth: '600px' }}>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #00ff41',
          backgroundColor: '#000000',
          display: 'block',
          width: '100%',
          height: 'auto'
        }}
      />
      <div style={{ color: '#00ff41', marginTop: '10px', fontSize: '12px', textAlign: 'center' }}>
        Digital rain simulation - Press any key to continue
      </div>
    </div>
  );
}