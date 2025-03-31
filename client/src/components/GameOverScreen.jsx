import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GameOverScreen = ({ score, highScore, onRestart, appleImage }) => {
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  
  useEffect(() => {
    // Check if this is a new high score
    if (score >= highScore && score > 0) {
      setIsNewHighScore(true);
    }
  }, [score, highScore]);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 rounded-lg backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-gray-800 p-6 rounded-xl shadow-2xl border border-red-500 max-w-sm w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <motion.h2 
          className="text-3xl font-bold text-red-500 mb-6 text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        >
          Game Over!
        </motion.h2>
        
        {isNewHighScore && (
          <motion.div
            className="absolute -top-4 -right-4 bg-purple-600 text-white px-2 py-1 rounded-md transform rotate-12 font-bold text-sm"
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 12 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            NEW HIGH SCORE!
          </motion.div>
        )}
        
        <div className="space-y-4 mb-6">
          <motion.div
            className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Your Score:</span>
              {appleImage && (
                <img src={appleImage} alt="Apple" className="w-5 h-5 object-contain" />
              )}
            </div>
            <span className="font-bold text-xl text-green-500">{score}</span>
          </motion.div>
          
          <motion.div
            className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span className="text-gray-300">High Score:</span>
            <span className="font-bold text-xl text-purple-500">{highScore}</span>
          </motion.div>
        </div>
        
        <motion.button
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.97 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          onClick={onRestart}
        >
          Play Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GameOverScreen;