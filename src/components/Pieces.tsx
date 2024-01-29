import {Box} from "@mui/material";

import whiteKing from "../assets/images/whiteKing.png";
import blackKing from "../assets/images/blackKing.png";
import whiteQueen from "../assets/images/whiteQueen.png";
import blackQueen from "../assets/images/blackQueen.png";
import whiteRook from "../assets/images/whiteRook.png";
import blackRook from "../assets/images/blackRook.png";
import whiteKnight from "../assets/images/whiteKnight.png";
import blackKnight from "../assets/images/blackKnight.png";
import whiteBishop from "../assets/images/whiteBishop.png";
import blackBishop from "../assets/images/blackBishop.png";
import whitePawn from "../assets/images/whitePawn.png";
import blackPawn from "../assets/images/blackPawn.png";

import useAllSelectors from "../hooks/useAllSelectors";
import usePromotePawn from "../logic/usePromotePawn";
import {PawnContainer, Piece} from "../theme/customComponents";

const Pieces = () => {
  const {
    board,
    color,
    moveVar,
    activePiece,
    sandbox,
    animationSpeed,
    currentMove,
    opponentKingAttacked,
    checkArrOpponent,
    checkArrPlayer,
    playerKingAttacked,
    moves,
    pawnPromotes,
  } = useAllSelectors();
  const {promotePawn} = usePromotePawn();

  const renderEachPiece = (piece: string, src1: string, src2: string, alt1: string, alt2: string) => {
    return color === "white" ? (
      <Piece
        component={"img"}
        src={src1}
        key={piece}
        alt={alt1}
        style={
          activePiece === `${piece}`
            ? {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`}
            : {transform: `translate(0px, 0px)`, transition: `all ${animationSpeed}s`}
        }
      />
    ) : (
      <div
        className={`${color === "black" && !sandbox ? "reverse" : null}`}
        style={{height: "80px"}}
        key={piece}
      >
        <Piece
          src={src2}
          alt={alt2}
          style={
            activePiece === `${piece}`
              ? {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`}
              : {transform: `translate(0px, 0px)`, transition: `all ${animationSpeed}s`}
          }
        />
      </div>
    );
  };

  const renderRoyals = (piece: string, src: string, alt: string) => {
    return (
      <div
        className={`${color === "black" && !sandbox ? "reverse" : null}`}
        style={{height: "80px"}}
        key={piece}
      >
        <Piece
          src={src}
          alt={alt}
          className={`${
            (/^ok/.test(piece) && opponentKingAttacked && !currentMove) ||
            (/^ok/.test(piece) && checkArrOpponent.some((a) => a === currentMove)) ||
            (/^pk/.test(piece) && playerKingAttacked && !currentMove) ||
            (/^pk/.test(piece) && checkArrPlayer.some((a) => a === currentMove))
              ? "kingInCheck"
              : null
          }`}
          style={
            activePiece === `${piece}`
              ? {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`}
              : {transform: `translate(0px, 0px)`, transition: `all ${animationSpeed}s`}
          }
        />
      </div>
    );
  };

  const renderPlayerPromotion = (pawn: string, i: number) => {
    return (
      <div
        className={`pawnPromotionPlayer ${color === "black" && !sandbox ? "reversePromotion" : null}`}
        style={pawnPromotes === pawn ? {display: "block"} : {display: "none"}}
      >
        <div className="promotionPiece">
          <img
            src={color === "white" ? whiteQueen : blackQueen}
            alt="Player Queen"
            className="piece"
            onClick={() => promotePawn(pawn, "pq", i)}
          />
        </div>
        <div className="promotionPiece">
          <img
            src={color === "white" ? whiteRook : blackRook}
            alt="Player Rook"
            className="piece"
            onClick={() => promotePawn(pawn, "pr", i)}
          />
        </div>
        <div className="promotionPiece">
          <img
            src={color === "white" ? whiteBishop : blackBishop}
            alt="Player Bishop"
            className="piece"
            onClick={() => promotePawn(pawn, "pb", i)}
          />
        </div>
        <div className="promotionPiece">
          <img
            src={color === "white" ? whiteKnight : blackKnight}
            alt="Player Knight"
            className="piece"
            onClick={() => promotePawn(pawn, "ph", i)}
          />
        </div>
      </div>
    );
  };

  const renderOpponentPromotion = (pawn: string, i: number) => {
    return (
      <div
        className="pawnPromotionOpponent"
        style={pawnPromotes === pawn ? {display: "block"} : {display: "none"}}
      >
        <div className="promotionPiece">
          <img
            src={color === "white" ? blackKnight : whiteKnight}
            alt="Opponent Knight"
            className="piece"
            onClick={() => promotePawn(pawn, "oh", i)}
          />
        </div>
        <div className="promotionPiece">
          <img
            src={color === "white" ? blackBishop : whiteBishop}
            alt="Opponent Bishop"
            className="piece"
            onClick={() => promotePawn(pawn, "ob", i)}
          />
        </div>
        <div className="promotionPiece">
          <img
            src={color === "white" ? blackRook : whiteRook}
            alt="Opponent Rook"
            className="piece"
            onClick={() => promotePawn(pawn, "or", i)}
          />
        </div>
        <div className="promotionPiece">
          <img
            src={color === "white" ? blackQueen : whiteQueen}
            alt="Opponent Queen"
            className="piece"
            onClick={() => promotePawn(pawn, "oq", i)}
          />
        </div>
      </div>
    );
  };

  const renderEntries = (piece: string, i: number) => {
    if (/or/.test(piece)) {
      return renderEachPiece(piece, blackRook, whiteRook, "Black Rook", "White Rook");
    }

    if (/pr/.test(piece)) {
      return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
    }

    if (/oh/.test(piece)) {
      return renderEachPiece(piece, blackKnight, whiteKnight, "Black Knight", "White Knight");
    }

    if (/ph/.test(piece)) {
      return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
    }

    if (/ob/.test(piece)) {
      return renderEachPiece(piece, blackBishop, whiteBishop, "Black Bishop", "White Bishop");
    }

    if (/pb/.test(piece)) {
      return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
    }

    if (/owq/.test(piece) || /pqw/.test(piece)) {
      return renderRoyals(piece, whiteQueen, "White Queen");
    }

    if (/oqb/.test(piece) || /pqb/.test(piece)) {
      return renderRoyals(piece, blackQueen, "Black Queen");
    }

    if (piece === "okw" || piece === "pkw") {
      return renderRoyals(piece, whiteKing, "White King");
    }

    if (piece === "okb" || piece === "pkb") {
      return renderRoyals(piece, blackKing, "Black King");
    }

    if (/op/.test(piece)) {
      return (
        <PawnContainer key={piece + i}>
          {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
          {renderOpponentPromotion(piece, i)}
        </PawnContainer>
      );
    }

    if (/pp/.test(piece)) {
      return (
        <PawnContainer key={piece + i}>
          {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
          {renderPlayerPromotion(piece, i)}
        </PawnContainer>
      );
    }

    return (
      <Box
        sx={{
          width: "90px",
          height: "90px",
        }}
        key={i + "empty"}
      />
    );
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: "720px",
        height: "720px",
        left: "calc(50% - 360px)",
        top: "0",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {!currentMove
        ? Object.entries(board).map((a, i) => renderEntries(a[0], i))
        : Object.entries(JSON.parse(moves[currentMove])).map((a, i) => renderEntries(a[0], i))}
    </Box>
  );
};

export default Pieces;
