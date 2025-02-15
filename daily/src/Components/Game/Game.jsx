import React, { useState, useEffect, useRef } from 'react';
import fishImage from '../../assets/fishref.png';
import crocodileImage from '../../assets/crocodileref.png';

const Game = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fishY, setFishY] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(5);
  const [crocodileX, setCrocodileX] = useState(800);
  const [crocodileHeight, setCrocodileHeight] = useState(60);
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const fishRef = useRef(new Image());
  const crocodileRef = useRef(new Image());
  const [isJumping, setIsJumping] = useState(false);
  const jumpHeight = 350;
  const jumpSpeed = 15;
  const fallSpeed = 8;
  const groundLevel = 0;

  // Sound references
  const jumpSoundRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'));
  const gameOverSoundRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2658/2658-preview.mp3'));
  const startGameSoundRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'));
  const collisionSoundRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2656/2656-preview.mp3'));

  // Initialize sound settings
  useEffect(() => {
    const sounds = [
      jumpSoundRef.current,
      gameOverSoundRef.current,
      startGameSoundRef.current,
      collisionSoundRef.current
    ];
    
    sounds.forEach(sound => {
      sound.volume = 0.3; // Set volume to 30%
      // Preload sounds
      sound.load();
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fish = fishRef.current;
    const crocodile = crocodileRef.current;

    fish.onload = () => {
      if (crocodile.complete) setImagesLoaded(true);
    };
    crocodile.onload = () => {
      if (fish.complete) setImagesLoaded(true);
    };

    fish.src = fishImage;
    crocodile.src = crocodileImage;

    if (fish.complete && crocodile.complete) {
      setImagesLoaded(true);
    }
  }, []);

  useEffect(() => {
    let animationId;
    const canvas = canvasRef.current;

    if (canvas && isPlaying && imagesLoaded) {
      const ctx = canvas.getContext('2d');

      const gameLoop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isJumping) {
          setFishY(prev => {
            if (prev >= jumpHeight) {
              setIsJumping(false);
              return prev;
            }
            return prev + jumpSpeed;
          });
        } else if (fishY > groundLevel) {
          setFishY(prev => Math.max(groundLevel, prev - fallSpeed));
        }

        setCrocodileX(prev => {
          if (prev < -100) {
            setCrocodileHeight(Math.floor(Math.random() * 80) + 50);
            setGameSpeed(prevSpeed => prevSpeed + 0.3);
            setScore(prevScore => prevScore + 1);
            return canvas.width + 100;
          }
          return prev - gameSpeed;
        });

        const fishX = 50;
        const fishPosY = canvas.height - 50 - fishY;
        ctx.drawImage(fishRef.current, fishX, fishPosY, 50, 40);

        ctx.drawImage(
          crocodileRef.current,
          crocodileX,
          canvas.height - crocodileHeight,
          80,
          crocodileHeight
        );

        if (
          fishX < crocodileX + 80 &&
          fishX + 50 > crocodileX &&
          fishPosY < canvas.height - crocodileHeight + crocodileHeight &&
          fishPosY + 40 > canvas.height - crocodileHeight
        ) {
          endGame();
        }

        animationId = requestAnimationFrame(gameLoop);
      };

      animationId = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying, fishY, crocodileX, gameSpeed, imagesLoaded, isJumping]);

  const startGame = () => {
    startGameSoundRef.current.currentTime = 0;
    startGameSoundRef.current.play();
    setScore(0);
    setGameSpeed(5);
    setCrocodileX(800);
    setFishY(groundLevel);
    setIsJumping(false);
    setIsPlaying(true);
  };

  const endGame = () => {
    collisionSoundRef.current.currentTime = 0;
    collisionSoundRef.current.play();
    setTimeout(() => {
      gameOverSoundRef.current.currentTime = 0;
      gameOverSoundRef.current.play();
    }, 500);
    
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score);
    }
    setFishY(groundLevel);
    setIsJumping(false);
  };

  const handleJump = () => {
    if (isPlaying && fishY === groundLevel) {
      jumpSoundRef.current.currentTime = 0;
      jumpSoundRef.current.play();
      setIsJumping(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas
        ref={canvasRef}
        width={windowWidth * 0.8}
        height={windowHeight * 0.7}
        style={{ border: '1px solid black', backgroundColor: 'lightblue', cursor: 'pointer' }}
        onClick={handleJump}
      />
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
        {!isPlaying ? (
          <button
            onClick={startGame}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: 'green', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Start Game
          </button>
        ) : (
          <>
            <button
              onClick={endGame}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: 'red', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              End Game
            </button>
            <button
              onClick={handleJump}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: 'blue', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '4px'
              }}
            >
              JUMP!
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;