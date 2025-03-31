import React from 'react';
import { motion } from "framer-motion";
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import TouchControls from './TouchControls';

export default function Playing({
  score, 
  highScore, 
  snake, 
  food, 
  direction, 
  isPaused, 
  cellSize = 20, 
  appleImage,
  onDirectionChange,
  onTogglePause,
  waitingForFirstMove = false
}) {
    const handleTogglePause = () => {
      if (typeof onTogglePause === 'function') {
        onTogglePause();
      }
    };

    return (
        <motion.div
          key="game"
          className="flex flex-col items-center justify-center h-full w-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-full max-w-full">
            <GameHeader score={score} highScore={highScore} appleImage={appleImage} />
          </div>
          
          <div className="relative flex-grow flex items-center justify-center my-2">
            <GameBoard 
              snakeCells={snake} 
              foodCell={food} 
              direction={direction} 
              cellSize={cellSize}
            />
            
            {isPaused && !waitingForFirstMove && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="text-2xl font-bold text-white px-6 py-3 bg-gray-800 rounded-lg shadow-lg"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  PAUSED
                </motion.div>
              </motion.div>
            )}
            
            {waitingForFirstMove && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="text-xl font-bold text-white px-6 py-4 bg-gray-800 rounded-lg shadow-lg text-center"
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: [0.95, 1.05, 0.95],
                    transition: {
                      repeat: Infinity,
                      duration: 2
                    }
                  }}
                >
                  <p>Press Arrow Keys or WASD</p>
                  <p>to Start Moving</p>
                  {appleImage && (
                    <img 
                      src={appleImage} 
                      alt="Apple" 
                      className="w-6 h-6 mx-auto mt-2 animate-pulse" 
                    />
                  )}
                </motion.div>
              </motion.div>
            )}
          </div>
          
          {/* Desktop Controls Info */}
          <div className="w-full flex justify-center mb-4 md:block hidden">
            <div className="mt-2 text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-lg shadow-inner">
              <div className="flex items-center justify-center mb-1">
                <span className="text-green-500 font-bold mr-2">Controls:</span> Arrow keys or WASD to move
              </div>
              <div className="flex items-center justify-center">
                <span className="text-purple-500 font-bold mr-2">Space</span> to pause/resume
              </div>
            </div>
          </div>
          
          {/* Touch Controls for Mobile */}
          {typeof TouchControls !== 'undefined' && (
            <TouchControls 
              onDirectionChange={onDirectionChange} 
              isPaused={isPaused} 
              onTogglePause={handleTogglePause} 
            />
          )}
        </motion.div>
      );
}