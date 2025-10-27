import React, { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Matrix characters
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const chars = matrixChars.split('');
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    function draw() {
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
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ margin: '10px 0' }}>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        style={{
          border: '1px solid #00ff41',
          backgroundColor: '#000000',
          display: 'block'
        }}
      />
      <div style={{ color: '#00ff41', marginTop: '10px', fontSize: '12px', textAlign: 'center' }}>
        Digital rain simulation - Press any key to continue
      </div>
    </div>
  );
}