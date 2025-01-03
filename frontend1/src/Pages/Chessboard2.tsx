import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { enPassant } from "../Functions/EnPassant.ts";
import { getLoggedUsername } from "../Actions/user.ts";
import { useNavigate } from "react-router-dom";

export default function Chessboard2() {
  const [game, setGame] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();


  const [position, setPosition] = useState<{ [key: string]: string }>({
    a1: "wR",
    a2: "wP",
    a7: "bP",
    a8: "bR",
    b1: "wN",
    b2: "wP",
    b7: "bP",
    b8: "bN",
    c1: "wB",
    c2: "wP",
    c7: "bP",
    c8: "bB",
    d1: "wQ",
    d2: "wP",
    d7: "bP",
    d8: "bQ",
    e1: "wK",
    e2: "wP",
    e7: "bP",
    e8: "bK",
    f1: "wB",
    f2: "wP",
    f7: "bP",
    f8: "bB",
    g1: "wN",
    g2: "wP",
    g7: "bP",
    g8: "bN",
    h1: "wR",
    h2: "wP",
    h7: "bP",
    h8: "bR",
  });

  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  const [isWhiteCastleKing, setIsWhiteCastleKing] = useState(true);
  const [isWhiteCastleQueen, setIsWhiteCastleQueen] = useState(true);
  const [isBlackCastleKing, setIsBlackCastleKing] = useState(true);
  const [isBlackCastleQueen, setIsBlackCastleQueen] = useState(true);

  useEffect(() => {
    setGame(new Chess());
    getLoggedUsername().then((data) => {
      if (data !== false) {
        setUsername(data["res"]);
      } else {
        setUsername(null);
        navigate("/login");
      }
    })
  }, []);

  function promotion(piece: any, sourceSquare: any, targetSquare: any) {
    game?.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase(),
    });
    const newPosition = { ...position };
    delete newPosition[sourceSquare];
    newPosition[targetSquare] = piece;

    setPosition(newPosition);
    setIsWhiteTurn(!isWhiteTurn);

    return true;
  }

  function onPieceDrop(sourceSquare: any, targetSquare: any) {
    if (
      (sourceSquare[1] === "7" && position[sourceSquare] === "wP") ||
      (sourceSquare[1] === "2" && position[sourceSquare] === "bP")
    ) {
      return true;
    }

    const piece = position[sourceSquare];
    if (!piece) {
      return false;
    }

    const isWhitePiece = piece.startsWith("w");
    if (isWhiteTurn && !isWhitePiece) {
      alert("It's white's turn, but the piece is black");
      return false;
    }
    if (!isWhiteTurn && isWhitePiece) {
      alert("It's black turn, but the piece is white");
      return false;
    }

    try {
      game.move({ from: sourceSquare, to: targetSquare });
    } catch {
      alert("illegal move");
      return false;
    }

    if (sourceSquare === "a1" && isWhiteCastleQueen) {
      setIsWhiteCastleQueen(false);
    }

    if (sourceSquare === "h1" && isWhiteCastleKing) {
      setIsWhiteCastleKing(false);
    }

    if (sourceSquare === "e1") {
      setIsWhiteCastleKing(false);
      setIsWhiteCastleQueen(false);
    }

    if (sourceSquare === "a8" && isBlackCastleQueen) {
      setIsBlackCastleQueen(false);
    }

    if (sourceSquare === "h8" && isBlackCastleKing) {
      setIsBlackCastleKing(false);
    }

    if (sourceSquare === "e8") {
      setIsBlackCastleKing(false);
      setIsBlackCastleQueen(false);
    }

    if (sourceSquare === "e1" && targetSquare === "g1") {
      if (!isWhiteCastleKing) {
        alert("Castling on the white king side is no longer allowed");
        return false;
      }

      const newPosition = { ...position };
      delete newPosition["e1"];
      newPosition["g1"] = "wK";
      delete newPosition["h1"];
      newPosition["f1"] = "wR";

      setPosition(newPosition);
      setIsWhiteCastleKing(false);
      setIsWhiteCastleQueen(false);
      setIsWhiteTurn(false);
      return true;
    }

    if (sourceSquare === "e1" && targetSquare === "c1") {
      if (!isWhiteCastleQueen) {
        alert("Castling on the white queen side is no longer allowed");
        return false;
      }

      const newPosition = { ...position };
      delete newPosition["e1"];
      newPosition["c1"] = "wK";
      delete newPosition["a1"];
      newPosition["d1"] = "wR";

      setPosition(newPosition);
      setIsWhiteCastleKing(false);
      setIsWhiteCastleQueen(false);
      setIsWhiteTurn(false);
      return true;
    }

    if (sourceSquare === "e8" && targetSquare === "g8") {
      if (!isBlackCastleKing) {
        alert("Castling on the black king side is no longer allowed");
        return false;
      }

      const newPosition = { ...position };
      delete newPosition["e8"];
      newPosition["g8"] = "bK";
      delete newPosition["h8"];
      newPosition["f8"] = "bR";

      setPosition(newPosition);
      setIsBlackCastleKing(false);
      setIsBlackCastleQueen(false);
      setIsWhiteTurn(true);
      return true;
    }

    if (sourceSquare === "e8" && targetSquare === "c8") {
      if (!isBlackCastleQueen) {
        alert("Castling on the black queen side is no longer allowed");
        return false;
      }

      const newPosition = { ...position };
      delete newPosition["e8"];
      newPosition["c8"] = "bK";
      delete newPosition["a8"];
      newPosition["d8"] = "bR";

      setPosition(newPosition);
      setIsBlackCastleKing(false);
      setIsBlackCastleQueen(false);
      setIsWhiteTurn(true);
      return true;
    }

    const passantSquare = enPassant(sourceSquare, targetSquare);

    if (typeof passantSquare === "string") {
      const newPosition = { ...position };
      delete newPosition[sourceSquare];
      newPosition[targetSquare] = piece;
      delete newPosition[passantSquare];

      setPosition(newPosition);
      setIsWhiteTurn(!isWhiteTurn);

      console.log(
        `Piece ${piece} moved from ${sourceSquare} to ${targetSquare}`
      );
      return true;
    }

    if (game.isCheckmate()) {
      alert(
        !isWhiteTurn ? "Black wins by checkmate!" : "White wins by checkmate!"
      );

      return true;
    }

    if (game.isDraw()) {
      alert("The game is a draw!");
      return true;
    }

    const newPosition = { ...position };
    delete newPosition[sourceSquare];
    newPosition[targetSquare] = piece;
    setPosition(newPosition);
    setIsWhiteTurn(!isWhiteTurn);
    console.log(`Piece ${piece} moved from ${sourceSquare} to ${targetSquare}`);
    return true;
  }

  return (
    <>
    <div className="flex items-center justify-center h-screen" >
      <div className="w-[80vw] max-w-[400px] aspect-square border-2 border-black">
      <Chessboard
        id="Basicboard"
        position={position}
        onPieceDrop={onPieceDrop}
        arePiecesDraggable={true}
        onPromotionPieceSelect={promotion}
      />
      </div>
    </div>
    </>
  );
}
