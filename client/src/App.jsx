import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import DifficultyScreen from './components/DifficultyScreen';
import Playing from './components/Playing';
import GameHeader from './components/GameHeader';
import GameBoard from './components/GameBoard';
import GameOverScreen from './components/GameOverScreen';
import { GRID_WIDTH, GRID_HEIGHT, GAME_SPEED, CELL_SIZE } from './constants';
import apple from './assets/appleLogo.png';

const App = () => {
  // Game state
  const [stage, setStage] = useState("intro");
  const [difficulty, setDifficulty] = useState('medium');
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [foodEaten, setFoodEaten] = useState(false);
  const [cellSize, setCellSize] = useState(CELL_SIZE);
  const [waitingForFirstMove, setWaitingForFirstMove] = useState(true);
  
  const gameLoopRef = useRef(null);
  const containerRef = useRef(null);
  const currentSnakeRef = useRef([]);
  const currentDirectionRef = useRef('RIGHT');
  const currentFoodRef = useRef({ x: 0, y: 0 });

  // Function to generate random food position
  const generateRandomFoodPosition = (snakeArray) => {
    const availablePositions = [];
    
    // Generate all possible positions
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        // Check if position is not occupied by snake
        if (!snakeArray.some(segment => segment.x === x && segment.y === y)) {
          availablePositions.push({ x, y });
        }
      }
    }
    
    // If no positions available (extremely rare), just return a random position
    if (availablePositions.length === 0) {
      return {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      };
    }
    
    // Return a random position from available positions
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[randomIndex];
  };

  // Calculate responsive cell size
  useEffect(() => {
    const updateCellSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        // Increase the padding to ensure more space at the bottom 
        const containerWidth = container.clientWidth - 40; 
        const containerHeight = container.clientHeight - 150; // Increased padding for bottom
        
        const widthBasedSize = Math.floor(containerWidth / GRID_WIDTH);
        const heightBasedSize = Math.floor(containerHeight / GRID_HEIGHT);
        
        const newCellSize = Math.min(widthBasedSize, heightBasedSize);
        
        if (newCellSize !== cellSize && newCellSize > 5) {
          setCellSize(newCellSize);
        }
      }
    };
    
    updateCellSize();
    
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [cellSize]);

  // Initialize the game
  const initGame = () => {
    // Stop any existing game loop
    stopGameLoop();
    
    // Initialize snake in the middle of the grid
    const initialSnake = [
      { x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) },
      { x: Math.floor(GRID_WIDTH / 2) - 1, y: Math.floor(GRID_HEIGHT / 2) },
      { x: Math.floor(GRID_WIDTH / 2) - 2, y: Math.floor(GRID_HEIGHT / 2) }
    ];
    
    // Reset all game state
    setSnake(initialSnake);
    currentSnakeRef.current = initialSnake;
    
    setDirection('RIGHT');
    currentDirectionRef.current = 'RIGHT';
    
    setScore(0);
    setIsPaused(false);
    setFoodEaten(false);
    setWaitingForFirstMove(true);
    
    // Generate initial food position
    const newFood = generateRandomFoodPosition(initialSnake);
    setFood(newFood);
    currentFoodRef.current = newFood;
  };

  // Stop the game loop
  const stopGameLoop = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  };

  // Start the game loop
  const startGameLoop = () => {
    // Clear any existing interval first
    stopGameLoop();
    
    // Set up a new game loop
    gameLoopRef.current = setInterval(updateGame, GAME_SPEED[difficulty]);
  };

  // Game loop function - core game logic
  const updateGame = () => {
    // Don't update if paused
    if (isPaused) return;
    
    // Get current snake state to avoid closure issues
    const currentSnake = [...currentSnakeRef.current];
    const currentDirection = currentDirectionRef.current;
    const currentFood = {...currentFoodRef.current};
    
    // Calculate new head position
    const head = { ...currentSnake[0] };
    
    switch (currentDirection) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }
    
    // Check for collisions
    if (
      // Wall collision
      head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT ||
      // Self collision
      currentSnake.some((segment, index) => {
        // Skip the tail since it will move
        if (index === currentSnake.length - 1) return false;
        return segment.x === head.x && segment.y === head.y;
      })
    ) {
      // Game over
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('snakeHighScore', score.toString());
      }
      
      stopGameLoop();
      setStage("game_over");
      return;
    }
    
    // Create new snake array with new head
    const newSnake = [head, ...currentSnake];
    
    // Check if snake eats food
    if (head.x === currentFood.x && head.y === currentFood.y) {
      // Trigger food eaten animation
      setFoodEaten(true);
      setTimeout(() => setFoodEaten(false), 300);
      
      // Increase score
      setScore(prevScore => prevScore + 1);
      
      // Generate new food
      const newFood = generateRandomFoodPosition(newSnake);
      setFood(newFood);
      currentFoodRef.current = newFood;
    } else {
      // Remove tail if not eating food
      newSnake.pop();
    }
    
    // Update snake state
    setSnake(newSnake);
    currentSnakeRef.current = newSnake;
  };

  // Function to handle direction changes
  const handleDirectionChange = (directionKey) => {
    if (stage !== "playing" || isPaused) return;
    
    let newDirection;
    switch (directionKey) {
      case 'UP':
      case 'ArrowUp':
      case 'w':
      case 'W':
        newDirection = 'UP';
        break;
      case 'DOWN':
      case 'ArrowDown':
      case 's':
      case 'S':
        newDirection = 'DOWN';
        break;
      case 'LEFT':
      case 'ArrowLeft':
      case 'a':
      case 'A':
        newDirection = 'LEFT';
        break;
      case 'RIGHT':
      case 'ArrowRight':
      case 'd':
      case 'D':
        newDirection = 'RIGHT';
        break;
      default:
        return; // Not a direction key
    }
    
    // Check if this direction change is valid (not 180 degrees)
    const invalidCombinations = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };
    
    if (newDirection === invalidCombinations[currentDirectionRef.current]) {
      return;
    }
    
    // Set the direction
    setDirection(newDirection);
    currentDirectionRef.current = newDirection;
    
    // Start the game if this is the first move
    if (waitingForFirstMove) {
      setWaitingForFirstMove(false);
      startGameLoop();
    }
  };

  // Function to toggle pause state
  const handleTogglePause = () => {
    if (waitingForFirstMove) return; // Only toggle pause when game is active
    setIsPaused(prev => !prev);
  };

  // Navigation handlers
  const handleStartGame = () => {
    setStage("difficulty");
  };

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setStage("playing");
    
    // Initialize the game with a small delay to ensure component is mounted
    setTimeout(initGame, 50);
  };

  const handleRestart = () => {
    setStage("difficulty");
  };

  // Sync food state with ref when it changes externally
  useEffect(() => {
    currentFoodRef.current = food;
  }, [food]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default behavior for game control keys
      const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D', ' '];
      if (gameKeys.includes(e.key)) {
        e.preventDefault();
      }
      
      // Handle pause toggle
      if (e.key === ' ' && stage === "playing" && !waitingForFirstMove) {
        handleTogglePause();
        return;
      }
      
      // Quick restart on game over screen
      if (stage === "game_over" && (e.key === 'Enter' || e.key === ' ')) {
        handleRestart();
        return;
      }
      
      // Skip intro screen
      if (stage === "intro" && (e.key === 'Enter' || e.key === ' ')) {
        handleStartGame();
        return;
      }
      
      // Direction changes only when game is in playing state
      if (stage === "playing" && !isPaused) {
        handleDirectionChange(e.key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stage, isPaused, waitingForFirstMove, difficulty]);

  // Handle pause/unpause effect on game loop
  useEffect(() => {
    if (stage === "playing" && !waitingForFirstMove) {
      if (isPaused) {
        stopGameLoop();
      } else {
        startGameLoop();
      }
    }
  }, [isPaused, waitingForFirstMove, stage]);

  // Clean up game loop on unmount
  useEffect(() => {
    return () => {
      stopGameLoop();
    };
  }, []);

  // Load high score from localStorage on initial load
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Animation for eaten food
  const renderFoodEatenAnimation = () => {
    if (!foodEaten) return null;
    
    return (
      <motion.div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full font-bold">
          <img src={apple} alt="Apple" className="w-5 h-5 object-contain" />
          <span>+1 Score!</span>
        </div>
      </motion.div>
    );
  };

  // Render the appropriate screen based on the current stage
  const renderScreen = () => {
    switch (stage) {
      case "intro":
        return <IntroScreen key="intro" onStart={handleStartGame} />;
      
      case "difficulty":
        return <DifficultyScreen key="difficulty" onSelectDifficulty={handleSelectDifficulty} />;
      
      case "playing":
        return (
          <Playing 
            score={score} 
            highScore={highScore} 
            snake={snake} 
            food={food} 
            direction={direction} 
            isPaused={isPaused}
            cellSize={cellSize}
            appleImage={apple}
            onDirectionChange={handleDirectionChange}
            onTogglePause={handleTogglePause}
            waitingForFirstMove={waitingForFirstMove}
          />
        );
      
      case "game_over":
        return (
          <motion.div 
            key="gameover"
            className="relative"
            style={{ 
              width: GRID_WIDTH * cellSize, 
              height: GRID_HEIGHT * cellSize 
            }}
          >
            <GameBoard 
              snakeCells={snake} 
              foodCell={food} 
              direction={direction}
              cellSize={cellSize}
            />
            <GameOverScreen score={score} highScore={highScore} onRestart={handleRestart} appleImage={apple} />
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-950 text-white flex items-center justify-center overflow-hidden">
      <motion.div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderFoodEatenAnimation()}
        
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;