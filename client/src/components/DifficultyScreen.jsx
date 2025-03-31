import React from "react";
import { motion } from "framer-motion";

const DifficultyScreen = ({ onSelectDifficulty }) => {
    const difficulties = [
      { level: 'easy', label: 'Easy', color: 'bg-green-500 hover:bg-green-600' },
      { level: 'medium', label: 'Medium', color: 'bg-yellow-500 hover:bg-yellow-600' },
      { level: 'hard', label: 'Hard', color: 'bg-red-500 hover:bg-red-600' }
    ];
  
    return (
      <motion.div 
        className="flex flex-col items-center justify-center h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6">Select Difficulty</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {difficulties.map((diff, index) => (
            <motion.button
              key={diff.level}
              className={`${diff.color} text-white font-bold py-2 px-6 rounded-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.2 }
              }}
              onClick={() => onSelectDifficulty(diff.level)}
            >
              {diff.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  export default DifficultyScreen;
  