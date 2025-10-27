import React, { useEffect, useRef, useState } from 'react';

export default function DinoGame() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Game variables
    const game = {
      dino: {
        x: 50,
        y: 150,
        width: 20,
        height: 20,
        dy: 0,
        jumpPower: 15,
        grounded: true,
        color: '#00ff41'
      },
      obstacles: [],
      ground: 170,
      speed: 2,
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
      ctx.fillRect(game.dino.x + 2, game.dino.y + 2, 3, 3); // eye
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
      ctx.font = '16px monospace';
      ctx.fillText(`Score: ${game.score}`, 10, 30);
      if (highScore > 0) {
        ctx.fillText(`High: ${highScore}`, 10, 50);
      }
    };

    const updateDino = () => {
      if (!game.dino.grounded) {
        game.dino.dy += 0.8; // gravity
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
      if (game.obstacles.length === 0 || game.obstacles[game.obstacles.length - 1].x < canvas.width - 200) {
        if (Math.random() < 0.01) {
          game.obstacles.push({
            x: canvas.width,
            y: game.ground - 20,
            width: 15,
            height: 20
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
        game.speed += 0.1;
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
      game.dino.y = 150;
      game.dino.dy = 0;
      game.dino.grounded = true;
      game.obstacles = [];
      game.speed = 2;
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

    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    canvas.addEventListener('click', handleClick);

    // Start game
    gameLoop();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      canvas.removeEventListener('click', handleClick);
    };
  }, [highScore]);

  return (
    <div style={{ margin: '10px 0' }}>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        style={{
          border: '1px solid #00ff41',
          backgroundColor: '#000000',
          cursor: 'pointer',
          display: 'block'
        }}
      />
      <div style={{ color: '#ffffff', marginTop: '10px', fontSize: '14px' }}>
        {gameOver ? (
          <div>
            <div>🦕 Game Over! Final Score: {score}</div>
            <div>🏆 High Score: {highScore}</div>
            <div>🔄 Press SPACE or click to restart</div>
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