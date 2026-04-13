import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function DinoGame() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 200 });

  // Resize handler
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const width = Math.min(600, containerWidth - 4); // -4 for border
        const height = Math.round(width / 3); // maintain 3:1 aspect ratio
        setCanvasSize({ width: Math.max(200, width), height: Math.max(80, height) });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const groundY = canvasSize.height - 30;
    const scale = canvasSize.width / 600;

    // Game variables
    const game = {
      dino: {
        x: 50 * scale,
        y: groundY - 20,
        width: 20 * scale,
        height: 20 * scale,
        dy: 0,
        jumpPower: 15 * scale,
        grounded: true,
        color: '#00ff41'
      },
      obstacles: [],
      ground: groundY,
      speed: 2 * scale,
      score: 0,
      gameOver: false
    };

    gameRef.current = game;

    // Game functions
    const drawDino = () => {
      ctx.fillStyle = game.dino.color;
      ctx.fillRect(game.dino.x, game.dino.y, game.dino.width, game.dino.height);
      
      // Simple dino shape
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(game.dino.x + 2 * scale, game.dino.y + 2 * scale, 3 * scale, 3 * scale); // eye
    };

    const drawObstacle = (obs) => {
      ctx.fillStyle = '#00ff41';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    };

    const drawGround = () => {
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, game.ground);
      ctx.lineTo(canvas.width, game.ground);
      ctx.stroke();
    };

    const drawScore = () => {
      ctx.fillStyle = '#ffffff';
      const fontSize = Math.max(10, 16 * scale);
      ctx.font = `${fontSize}px monospace`;
      ctx.fillText(`Score: ${game.score}`, 10, 20 * scale + 10);
      if (highScore > 0) {
        ctx.fillText(`High: ${highScore}`, 10, 38 * scale + 10);
      }
    };

    const updateDino = () => {
      if (!game.dino.grounded) {
        game.dino.dy += 0.8 * scale; // gravity
        game.dino.y += game.dino.dy;
      }

      if (game.dino.y >= game.ground - game.dino.height) {
        game.dino.y = game.ground - game.dino.height;
        game.dino.grounded = true;
        game.dino.dy = 0;
      }
    };

    const updateObstacles = () => {
      // Move obstacles
      game.obstacles.forEach(obs => {
        obs.x -= game.speed;
      });

      // Remove off-screen obstacles
      game.obstacles = game.obstacles.filter(obs => obs.x > -obs.width);

      // Add new obstacles
      const minGap = 200 * scale;
      if (game.obstacles.length === 0 || game.obstacles[game.obstacles.length - 1].x < canvas.width - minGap) {
        if (Math.random() < 0.01) {
          game.obstacles.push({
            x: canvas.width,
            y: game.ground - 20 * scale,
            width: 15 * scale,
            height: 20 * scale
          });
        }
      }

      // Check collisions
      game.obstacles.forEach(obs => {
        if (
          game.dino.x < obs.x + obs.width &&
          game.dino.x + game.dino.width > obs.x &&
          game.dino.y < obs.y + obs.height &&
          game.dino.y + game.dino.height > obs.y
        ) {
          game.gameOver = true;
          setGameOver(true);
          if (game.score > highScore) {
            setHighScore(game.score);
          }
        }
      });
    };

    const gameLoop = () => {
      if (game.gameOver) return;

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update game
      updateDino();
      updateObstacles();
      
      // Increase score and speed
      game.score++;
      if (game.score % 100 === 0) {
        game.speed += 0.1 * scale;
      }
      setScore(game.score);

      // Draw everything
      drawGround();
      drawDino();
      game.obstacles.forEach(drawObstacle);
      drawScore();

      requestAnimationFrame(gameLoop);
    };

    const jump = () => {
      if (game.dino.grounded && !game.gameOver) {
        game.dino.grounded = false;
        game.dino.dy = -game.dino.jumpPower;
      }
    };

    const restartGame = () => {
      game.dino.y = game.ground - game.dino.height;
      game.dino.dy = 0;
      game.dino.grounded = true;
      game.obstacles = [];
      game.speed = 2 * scale;
      game.score = 0;
      game.gameOver = false;
      setGameOver(false);
      setScore(0);
      gameLoop();
    };

    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (game.gameOver) {
          restartGame();
        } else {
          jump();
        }
      }
    };

    const handleClick = () => {
      if (game.gameOver) {
        restartGame();
      } else {
        jump();
      }
    };

    // Touch support for mobile
    const handleTouch = (e) => {
      e.preventDefault();
      if (game.gameOver) {
        restartGame();
      } else {
        jump();
      }
    };

    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });

    // Start game
    gameLoop();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouch);
    };
  }, [highScore, canvasSize]);

  return (
    <div ref={containerRef} style={{ margin: '10px 0', width: '100%', maxWidth: '600px' }}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          border: '1px solid #00ff41',
          backgroundColor: '#000000',
          cursor: 'pointer',
          display: 'block',
          width: '100%',
          height: 'auto',
          touchAction: 'none'
        }}
      />
      <div style={{ color: '#ffffff', marginTop: '10px', fontSize: '13px' }}>
        {gameOver ? (
          <div>
            <div>🦕 Game Over! Final Score: {score}</div>
            <div>🏆 High Score: {highScore}</div>
            <div>🔄 Press SPACE / click / tap to restart</div>
          </div>
        ) : (
          <div>
            <div>🏃 Running... Score: {score}</div>
            <div>⚡ Speed increases every 100 points!</div>
          </div>
        )}
      </div>
    </div>
  );
}