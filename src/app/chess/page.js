"use client";
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Chess } from 'chess.js';
import Image from 'next/image';

const chess = new Chess();

const Square = ({ children, black }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: black ? '#769656' : '#eeeed2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);



const Piece = ({ piece, position }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { piece, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

 
  const pieceTypeMap = {
    p: 'pawn',
    r: 'rook',
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king',
  };
  const pieceColor = piece.color === 'w' ? 'white' : 'black';
  const pieceType = pieceTypeMap[piece.type]; 

  return (
    <div
      ref={drag}
      style={{
        width: '100%',
        height: '100%',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Image
        src={`/pieces/${pieceType}-${pieceColor}.png`} 
        alt={`${pieceColor} ${pieceType}`}
        width={80} 
        height={80}
        quality={100}
        style={{ cursor: 'grab' }}
      />
    </div>
  );
};


const BoardSquare = ({ piece, position, black, movePiece }) => {
  const [, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item) => movePiece(item.position, position),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>
        {piece && <Piece piece={piece} position={position} />}
      </Square>
    </div>
  );
};

export default function ChessBoard() {
  const [gameState, setGameState] = useState(chess.board());

  const movePiece = (from, to) => {
    if (chess.move({ from, to, promotion: 'q' })) {
      setGameState(chess.board());
    }
  };

  const renderSquare = (i, j) => {
    const piece = gameState[i][j];
    const position = `${'abcdefgh'[j]}${8 - i}`;
    const black = (i + j) % 2 === 1;
    return (
      <div key={position} style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare
          piece={piece}
          position={position}
          black={black}
          movePiece={movePiece}
        />
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '400px',
          height: '400px',
          border: '2px solid #333',
          margin: '20px auto',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) =>
          Array.from({ length: 8 }).map((_, j) => renderSquare(i, j))
        )}
      </div>
    </DndProvider>
  );
}
