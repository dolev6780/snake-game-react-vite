import React from "react";
import { motion } from "framer-motion";

const IntroScreen = ({ onStart }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full bg-gray-900 p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300,
          duration: 0.8 
        }}
      >
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-md">
          Snake Game
        </h1>
      </motion.div>

      <motion.div 
        className="mb-10 bg-gray-800 p-6 rounded-lg max-w-md shadow-inner border-l-4 border-green-500"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="mb-3 text-center text-lg text-gray-300">
          Use <span className="font-bold text-green-400">arrow keys</span> or <span className="font-bold text-green-400">WASD</span> to control the snake.
        </p>
        <p className="text-center text-lg text-gray-300">
          Eat the <span className="font-bold text-red-400">food</span> to grow longer, but don't hit the walls or yourself!
        </p>
      </motion.div>

      <motion.div
        className="relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-sm"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.button
          className="relative bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full border border-green-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
        >
          Start Game
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;