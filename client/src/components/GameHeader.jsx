import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Responsive GameHeader component with improved layout for different screen sizes
 */
const GameHeader = ({ score, highScore, appleImage, level = 1, isPaused = false }) => {
  // Track previous score for animation trigger
  const prevScoreRef = useRef(score);
  const scoreIncreased = score > prevScoreRef.current;
  
  useEffect(() => {
    prevScoreRef.current = score;
  }, [score]);

  return (
    <motion.div
      className="w-full mb-4 px-3 py-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-md border border-gray-700"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Mobile layout (stacked) */}
      <div className="md:hidden w-full">
        <div className="flex justify-between items-center">
          {/* Score */}
          <div className="flex items-center">
            <span className="text-gray-300 text-xs uppercase tracking-wide">Score</span>
            {appleImage && (
              <img src={appleImage} alt="Apple" className="w-4 h-4 ml-1 object-contain" />
            )}
            <motion.span
              className="ml-2 text-xl font-bold text-green-500"
              animate={scoreIncreased ? {
                scale: [1, 1.2, 1],
                transition: { duration: 0.3 }
              } : {}}
            >
              {score}
            </motion.span>
          </div>

          {/* High Score */}
          <div className="flex items-center">
            <span className="text-gray-300 text-xs uppercase tracking-wide">Best</span>
            <motion.span
              className="ml-2 text-xl font-bold text-yellow-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {highScore}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Desktop/tablet layout (horizontal) */}
      <div className="hidden md:flex w-full justify-between items-center">
        {/* Left: Score with apple */}
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-300 uppercase tracking-wide">Score</span>
              {appleImage && (
                <img src={appleImage} alt="Apple" className="w-4 h-4 object-contain" />
              )}
            </div>
            <motion.div
              className="text-2xl font-bold text-green-500"
              animate={scoreIncreased ? {
                scale: [1, 1.2, 1],
                transition: { duration: 0.3 }
              } : {}}
            >
              {score}
            </motion.div>
          </div>

          <div className="h-10 border-l border-gray-600 mx-4"></div>

          {/* Middle: Level */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-300 uppercase tracking-wide">Level</span>
            <span className="text-xl font-bold text-blue-400">{level}</span>
          </div>
        </div>

        {/* Right: High Score */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300 uppercase tracking-wide">High Score</span>
          <motion.div
            className="text-2xl font-bold text-yellow-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {highScore}
          </motion.div>
        </div>
      </div>

      {/* Game paused indicator (both layouts) */}
      {isPaused && (
        <div className="w-full text-center mt-1 pt-1 border-t border-gray-700">
          <span className="text-red-400 text-sm font-medium">Game Paused</span>
        </div>
      )}
    </motion.div>
  );
};

export default GameHeader;