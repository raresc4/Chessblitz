import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess }  from "chess.js";
import { enPassant } from "../Functions/EnPassant.js";
import "../Styles/Chessboard.css";

export default function Chessboard2() {
  const [game, setGame] = useState();
  const [position, setPosition] = useState({
    a1: "wR", a2: "wP", a7: "bP", a8: "bR",
    b1: "wN", b2: "wP", b7: "bP", b8: "bN",
    c1: "wB", c2: "wP", c7: "bP", c8: "bB",
    d1: "wQ", d2: "wP", d7: "bP", d8: "bQ",
    e1: "wK", e2: "wP", e7: "bP", e8: "bK",
    f1: "wB", f2: "wP", f7: "bP", f8: "bB",
    g1: "wN", g2: "wP", g7: "bP", g8: "bN",
    h1: "wR", h2: "wP", h7: "bP", h8: "bR",
  });

  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  const [isWhiteCastleKing, setIsWhiteCastleKing] = useState(true);
  const [isWhiteCastleQueen, setIsWhiteCastleQueen] = useState(true);
  const [isBlackCastleKing, setIsBlackCastleKing] = useState(true);
  const [isBlackCastleQueen, setIsBlackCastleQueen] = useState(true);

  useEffect(()=>{
    setGame(new Chess());
  }, []);

  

  function promotion(piece,sourceSquare,targetSquare) {
    
    game.move({ from : sourceSquare, to : targetSquare, promotion : piece[1].toLowerCase() });

    const newPosition = { ...position };
    delete newPosition[sourceSquare]; // Remove piece from source square
    newPosition[targetSquare] = piece; // Place piece on target square

    setPosition(newPosition); // Update board position
    setIsWhiteTurn(!isWhiteTurn); // Switch turns

    return true;
  }

  function onPieceDrop(sourceSquare, targetSquare) {
    if((sourceSquare[1] === '7' && position[sourceSquare] === 'wP') || (sourceSquare[1] === '2' && position[sourceSquare] === 'bP')) {
      return true;
    }
    
    const piece = position[sourceSquare];
    if (!piece) {
    return false;
    } // No piece to move

    // Check if it's the correct turn for the piece color
    const isWhitePiece = piece.startsWith('w');
    if (isWhiteTurn && !isWhitePiece) { 
    alert("It's white's turn, but the piece is black");
    return false; // It's white's turn, but the piece is black
    }
    if (!isWhiteTurn && isWhitePiece) {
      alert("It's black turn, but the piece is white");
      return false;
    }// It's black's turn, but the piece is white

    try { 
      game.move({ from : sourceSquare, to : targetSquare });
    } catch {
      alert('illegal move');
      return false;
    }
    

    if(sourceSquare === 'a1' && isWhiteCastleQueen)
    {
      setIsWhiteCastleQueen(false);
    }

    if(sourceSquare === 'h1' && isWhiteCastleKing)
    {
      setIsWhiteCastleKing(false);
    }

    if(sourceSquare === 'e1')
    {
      setIsWhiteCastleKing(false);
      setIsWhiteCastleQueen(false);
    }

    if(sourceSquare === 'a8' && isBlackCastleQueen)
    {
      setIsBlackCastleQueen(false);
    }
  
    if(sourceSquare === 'h8' && isBlackCastleKing)
    {
      setIsBlackCastleKing(false);
    }
  
    if(sourceSquare === 'e8')
    {
      setIsBlackCastleKing(false);
      setIsBlackCastleQueen(false);
    }

    if (sourceSquare === 'e1' && targetSquare === 'g1') { // White King-side castling
      if (!isWhiteCastleKing) {
        alert('Castling on the white king side is no longer allowed');
        return false;
      }
    
      // Perform the king-side castling for white
      const newPosition = { ...position };
      delete newPosition['e1']; // Remove the king from e1
      newPosition['g1'] = 'wK'; // Place the king on g1
      delete newPosition['h1']; // Remove the rook from h1
      newPosition['f1'] = 'wR'; // Place the rook on f1
    
      setPosition(newPosition);
      setIsWhiteCastleKing(false);
      setIsWhiteCastleQueen(false);
      setIsWhiteTurn(false); // Change turn to black
      return true;
    }

    if (sourceSquare === 'e1' && targetSquare === 'c1') { // White Queen-side castling
      if (!isWhiteCastleQueen) {
        alert('Castling on the white queen side is no longer allowed');
        return false;
      }

      // Perform the queen-side castling for white
      const newPosition = { ...position };
      delete newPosition['e1']; // Remove the king from e1
      newPosition['c1'] = 'wK'; // Place the king on c1
      delete newPosition['a1']; // Remove the rook from a1
      newPosition['d1'] = 'wR'; // Place the rook on d1

      setPosition(newPosition);
      setIsWhiteCastleKing(false);
      setIsWhiteCastleQueen(false);
      setIsWhiteTurn(false); // Change turn to black
      return true;
    }

    if (sourceSquare === 'e8' && targetSquare === 'g8') { // Black King-side castling
      if (!isBlackCastleKing) {
        alert('Castling on the black king side is no longer allowed');
        return false;
      }

      // Perform the king-side castling for black
      const newPosition = { ...position };
      delete newPosition['e8']; // Remove the king from e8
      newPosition['g8'] = 'bK'; // Place the king on g8
      delete newPosition['h8']; // Remove the rook from h8
      newPosition['f8'] = 'bR'; // Place the rook on f8

      setPosition(newPosition);
      setIsBlackCastleKing(false);
      setIsBlackCastleQueen(false);
      setIsWhiteTurn(true); // Change turn to white
      return true;
    }

    if(sourceSquare === 'e8' && targetSquare === 'c8') { // Black Queen-side castling
      if (!isBlackCastleQueen) {
        alert('Castling on the black queen side is no longer allowed');
        return false;
      }

      // Perform the queen-side castling for black
      const newPosition = { ...position };
      delete newPosition['e8']; // Remove the king from e8
      newPosition['c8'] = 'bK'; // Place the king on c8
      delete newPosition['a8']; // Remove the rook from a8
      newPosition['d8'] = 'bR'; // Place the rook on d8

      setPosition(newPosition);
      setIsBlackCastleKing(false);
      setIsBlackCastleQueen(false);
      setIsWhiteTurn(true); // Change turn to white
      return true;
    }

    const passantSquare = enPassant(sourceSquare, targetSquare);

    if(passantSquare !== false)
    {
        const newPosition = { ...position };
        delete newPosition[sourceSquare]; // Remove piece from source square
        newPosition[targetSquare] = piece; // Place piece on target square
        delete newPosition[passantSquare]; // Remove the captured piece

        setPosition(newPosition); // Update board position
        setIsWhiteTurn(!isWhiteTurn); // Switch turns

        console.log(`Piece ${piece} moved from ${sourceSquare} to ${targetSquare}`);
        return true;
    } 

    

    if (game.isCheckmate()) {
      alert(isWhiteTurn ? "Black wins by checkmate!" : "White wins by checkmate!");
      // You can optionally reset the game or take other actions here
      return true; // End the function since the game is over
    }

    if(game.isDraw()) {
      alert("The game is a draw!");
      // You can optionally reset the game or take other actions here
      return true; // End the function since the
    }

    const newPosition = { ...position };
    delete newPosition[sourceSquare]; // Remove piece from source square
    newPosition[targetSquare] = piece; // Place piece on target square

    setPosition(newPosition); // Update board position
    setIsWhiteTurn(!isWhiteTurn); // Switch turns

    console.log(`Piece ${piece} moved from ${sourceSquare} to ${targetSquare}`);
    return true;
  }

  return (
    <div className="Chessboard">
      <Chessboard
        id="Basicboard"
        position={position} // Pass custom board position
        onPieceDrop={onPieceDrop} // Handle piece drop
        arePiecesDraggable={true} // Make pieces draggable
        onPromotionPieceSelect={promotion} // Handle pawn promotion
      />
    </div>
  );
}
