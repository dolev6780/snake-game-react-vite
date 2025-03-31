import React from "react";
import { GRID_HEIGHT, GRID_WIDTH } from '../constants';
import apple from '../assets/appleLogo.png';
import snakeHead from '../assets/snakeHead.png';
import grass from '../assets/grass.png';
import alternateGrass from '../assets/alternateGrass.png';

const GameBoard = ({ snakeCells, foodCell, direction, cellSize = 20 }) => {
  // Function to get head rotation based on direction
  const getHeadRotation = () => {
    switch(direction) {
      case 'UP': return -90;
      case 'DOWN': return 90;
      case 'LEFT': return 180;
      case 'RIGHT': return 0;
      default: return 0;
    }
  };

  // Function to determine segment direction
  const getSegmentDirection = (index, cells) => {
    if (index === cells.length - 1) {
      // Last segment
      const current = cells[index];
      const prev = cells[index - 1];
      
      if (current.x < prev.x) return 'LEFT';
      if (current.x > prev.x) return 'RIGHT';
      if (current.y < prev.y) return 'UP';
      if (current.y > prev.y) return 'DOWN';
      return direction;
    } else {
      // Middle segments
      const current = cells[index];
      const next = cells[index + 1];
      
      // Determine if horizontal or vertical
      if (current.x === next.x) {
        return current.y > next.y ? 'UP' : 'DOWN';
      } else {
        return current.x > next.x ? 'LEFT' : 'RIGHT';
      }
    }
  };

  // Create the background grid cells with alternating grass patterns
  const gridCells = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      // Use alternating grass patterns based on even/odd positions
      const isEven = (x + y) % 2 === 0;
      gridCells.push(
        <div
          key={`grid-${x}-${y}`}
          className="absolute"
          style={{
            width: cellSize,
            height: cellSize,
            left: x * cellSize,
            top: y * cellSize,
            backgroundImage: `url(${isEven ? grass : alternateGrass})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      );
    }
  }

  // Create game elements (snake and food)
  const gameElements = [];
  
  // Add snake cells
  snakeCells.forEach((cell, index) => {
    const { x, y } = cell;
    const isHead = index === 0;
    
    if (isHead) {
      // Snake head
      gameElements.push(
        <div
          key={`head-${x}-${y}`}
          className="absolute z-20"
          style={{
            width: cellSize * 1.2,
            height: cellSize * 1.2,
            left: x * cellSize - cellSize * 0.1,
            top: y * cellSize - cellSize * 0.1,
            transform: `rotate(${getHeadRotation()}deg)`
          }}
        >
          <img 
            src={snakeHead} 
            alt="Snake Head" 
            className="w-full h-full object-contain"
          />
        </div>
      );
    } else {
      // Custom snake body that fits better with the head
      const segmentDirection = getSegmentDirection(index, snakeCells);
      const isVertical = segmentDirection === 'UP' || segmentDirection === 'DOWN';
      
      gameElements.push(
        <div
          key={`body-${x}-${y}-${index}`}
          className="absolute z-10"
          style={{
            width: isVertical ? cellSize * 0.8 : cellSize * 0.9,
            height: isVertical ? cellSize * 0.9 : cellSize * 0.8,
            left: x * cellSize + (cellSize - (isVertical ? cellSize * 0.8 : cellSize * 0.9)) / 2,
            top: y * cellSize + (cellSize - (isVertical ? cellSize * 0.9 : cellSize * 0.8)) / 2,
            backgroundColor: index === 1 ? '#669323' : '#679423', // Darker green for segment after head
            borderRadius: 50,
            boxSizing: 'border-box'
          }}
        />
      );
    }
  });
  
  // Add food
  if (foodCell && foodCell.x >= 0 && foodCell.x < GRID_WIDTH && foodCell.y >= 0 && foodCell.y < GRID_HEIGHT) {
    gameElements.push(
      <div
        key={`food-${foodCell.x}-${foodCell.y}`}
        className="absolute z-10"
        style={{
          width: cellSize - 4,
          height: cellSize - 4,
          left: foodCell.x * cellSize + 2,
          top: foodCell.y * cellSize + 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img 
          src={apple} 
          alt="Apple" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div 
      className="relative border-2 border-green-800 rounded-lg overflow-hidden shadow-lg"
      style={{ 
        width: `${GRID_WIDTH * cellSize}px`, 
        height: `${GRID_HEIGHT * cellSize}px`,
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: 'calc(80vh - 32px)',
        minHeight: `${GRID_HEIGHT * cellSize}px`
      }}
    >
      {/* Background grid */}
      {gridCells}
      
      {/* Game elements */}
      {gameElements}
    </div>
  );
};

export default GameBoard;