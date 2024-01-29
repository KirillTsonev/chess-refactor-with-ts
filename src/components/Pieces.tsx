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
  const {promotePawnFn} = usePromotePawn();

  const renderEachPiece = (piece: string, src1: string, src2: string) => {
    return color === "white" ? (
      <Piece
        component={"img"}
        src={src1}
        key={piece}
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
          style={
            activePiece === `${piece}`
              ? {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`}
              : {transform: `translate(0px, 0px)`, transition: `all ${animationSpeed}s`}
          }
        />
      </div>
    );
  };

  const renderRoyals = (piece: string, src: string) => {
    return (
      <div
        className={`${color === "black" && !sandbox ? "reverse" : null}`}
        style={{height: "80px"}}
        key={piece}
      >
        <Piece
          src={src}
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
          <Piece
            src={color === "white" ? whiteQueen : blackQueen}
            onClick={() => promotePawnFn(pawn, "pq", i)}
          />
        </div>
        <div className="promotionPiece">
          <Piece
            src={color === "white" ? whiteRook : blackRook}
            onClick={() => promotePawnFn(pawn, "pr", i)}
          />
        </div>
        <div className="promotionPiece">
          <Piece
            src={color === "white" ? whiteBishop : blackBishop}
            onClick={() => promotePawnFn(pawn, "pb", i)}
          />
        </div>
        <div className="promotionPiece">
          <Piece
            src={color === "white" ? whiteKnight : blackKnight}
            onClick={() => promotePawnFn(pawn, "ph", i)}
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
          <Piece
            src={color === "white" ? blackKnight : whiteKnight}
            onClick={() => promotePawnFn(pawn, "oh", i)}
          />
        </div>
        <div className="promotionPiece">
          <Piece
            src={color === "white" ? blackBishop : whiteBishop}
            onClick={() => promotePawnFn(pawn, "ob", i)}
          />
        </div>
        <div className="promotionPiece">
          <Piece
            src={color === "white" ? blackRook : whiteRook}
            onClick={() => promotePawnFn(pawn, "or", i)}
          />
        </div>
        <div className="promotionPiece">
          <Piece
            src={color === "white" ? blackQueen : whiteQueen}
            onClick={() => promotePawnFn(pawn, "oq", i)}
          />
        </div>
      </div>
    );
  };

  const renderEntries = (piece: string, i: number) => {
    if (/or/.test(piece)) return renderEachPiece(piece, blackRook, whiteRook);

    if (/pr/.test(piece)) return renderEachPiece(piece, whiteRook, blackRook);

    if (/oh/.test(piece)) return renderEachPiece(piece, blackKnight, whiteKnight);

    if (/ph/.test(piece)) return renderEachPiece(piece, whiteKnight, blackKnight);

    if (/ob/.test(piece)) return renderEachPiece(piece, blackBishop, whiteBishop);

    if (/pb/.test(piece)) return renderEachPiece(piece, whiteBishop, blackBishop);

    if (/owq/.test(piece) || /pqw/.test(piece)) return renderRoyals(piece, whiteQueen);

    if (/oqb/.test(piece) || /pqb/.test(piece)) return renderRoyals(piece, blackQueen);

    if (piece === "okw" || piece === "pkw") return renderRoyals(piece, whiteKing);

    if (piece === "okb" || piece === "pkb") return renderRoyals(piece, blackKing);

    if (/op/.test(piece)) {
      return (
        <PawnContainer key={piece + i}>
          {renderEachPiece(piece, blackPawn, whitePawn)}
          {renderOpponentPromotion(piece, i)}
        </PawnContainer>
      );
    }

    if (/pp/.test(piece)) {
      return (
        <PawnContainer key={piece + i}>
          {renderEachPiece(piece, whitePawn, blackPawn)}
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
