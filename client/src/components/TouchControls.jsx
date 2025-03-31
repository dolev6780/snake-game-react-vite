import React from 'react';
import { motion } from 'framer-motion';

const TouchControls = ({ onDirectionChange, isPaused, onTogglePause }) => {
  // Button variants
  const buttonVariants = {
    rest: { 
      backgroundColor: 'rgba(75, 85, 99, 0.5)',
      scale: 1 
    },
    pressed: { 
      backgroundColor: 'rgba(34, 197, 94, 0.7)',
      scale: 0.95 
    }
  };

  return (
    <div className="absolute bottom-4 w-full flex flex-col items-center justify-center md:hidden">
      {/* Virtual D-Pad */}
      <div className="grid grid-cols-3 gap-1">
        {/* Empty cell (top-left) */}
        <div></div>
        
        {/* Up button */}
        <motion.button
          className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-600 bg-opacity-50 shadow-lg"
          variants={buttonVariants}
          initial="rest"
          whileTap="pressed"
          onTouchStart={() => onDirectionChange('UP')}
          onClick={() => onDirectionChange('UP')}
          aria-label="Move Up"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
        
        {/* Empty cell (top-right) */}
        <div></div>
        
        {/* Left button */}
        <motion.button
          className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-600 bg-opacity-50 shadow-lg"
          variants={buttonVariants}
          initial="rest"
          whileTap="pressed"
          onTouchStart={() => onDirectionChange('LEFT')}
          onClick={() => onDirectionChange('LEFT')}
          aria-label="Move Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        {/* Pause button (center) */}
        <motion.button
          className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-600 bg-opacity-50 shadow-lg"
          variants={buttonVariants}
          initial="rest"
          whileTap="pressed"
          onTouchStart={onTogglePause}
          onClick={onTogglePause}
          aria-label={isPaused ? "Resume Game" : "Pause Game"}
        >
          {isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m-9-6h18" />
            </svg>
          )}
        </motion.button>
        
        {/* Right button */}
        <motion.button
          className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-600 bg-opacity-50 shadow-lg"
          variants={buttonVariants}
          initial="rest"
          whileTap="pressed"
          onTouchStart={() => onDirectionChange('RIGHT')}
          onClick={() => onDirectionChange('RIGHT')}
          aria-label="Move Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
        
        {/* Empty cell (bottom-left) */}
        <div></div>
        
        {/* Down button */}
        <motion.button
          className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-600 bg-opacity-50 shadow-lg"
          variants={buttonVariants}
          initial="rest"
          whileTap="pressed"
          onTouchStart={() => onDirectionChange('DOWN')}
          onClick={() => onDirectionChange('DOWN')}
          aria-label="Move Down"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
        
        {/* Empty cell (bottom-right) */}
        <div></div>
      </div>
    </div>
  );
};

export default TouchControls;