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
  } = useAllSelectors();

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

  const renderRoyals = (a, src, alt) => {
    return (
      <div
        className={`${color === "black" && !sandbox ? "reverse" : null}`}
        style={{height: "80px"}}
        key={a}
      >
        <Piece
          src={src}
          alt={alt}
          className={`${
            (/^ok/.test(a) && opponentKingAttacked && !currentMove) ||
            (/^ok/.test(a) && checkArrOpponent.some((a) => a === currentMove)) ||
            (/^pk/.test(a) && playerKingAttacked && !currentMove) ||
            (/^pk/.test(a) && checkArrPlayer.some((a) => a === currentMove))
              ? "kingInCheck"
              : null
          }`}
          style={
            activePiece === `${a}`
              ? {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`}
              : {transform: `translate(0px, 0px)`, transition: `all ${animationSpeed}s`}
          }
        />
      </div>
    );
  };

  const renderPlayerPromotion = (pawn, i) => {
    // return (
    //   <div
    //     className={`pawnPromotionPlayer ${color === "black" && !sandbox ? "reversePromotion" : null}`}
    //     style={pawnPromotes === pawn ? {display: "block"} : {display: "none"}}
    //   >
    //     <div className="promotionPiece">
    //       <img
    //         src={color === "white" ? whiteQueen : blackQueen}
    //         alt="Player Queen"
    //         className="piece"
    //         onClick={() => promotePawn(pawn, "pq", i)}
    //       />
    //     </div>
    //     <div className="promotionPiece">
    //       <img
    //         src={color === "white" ? whiteRook : blackRook}
    //         alt="Player Rook"
    //         className="piece"
    //         onClick={() => promotePawn(pawn, "pr", i)}
    //       />
    //     </div>
    //     <div className="promotionPiece">
    //       <img
    //         src={color === "white" ? whiteBishop : blackBishop}
    //         alt="Player Bishop"
    //         className="piece"
    //         onClick={() => promotePawn(pawn, "pb", i)}
    //       />
    //     </div>
    //     <div className="promotionPiece">
    //       <img
    //         src={color === "white" ? whiteKnight : blackKnight}
    //         alt="Player Knight"
    //         className="piece"
    //         onClick={() => promotePawn(pawn, "ph", i)}
    //       />
    //     </div>
    //   </div>
    // );
  };

  const renderOpponentPromotion = (pawn, i) => {
    // return (
    //   <div
    //     className="pawnPromotionOpponent"
    //     style={pawnPromotes === pawn ? {display: "block"} : {display: "none"}}
    //   >
    //     <div className="promotionPiece">
    //       <img
    //         src={color === "white" ? blackKnight : whiteKnight}
    //         alt="Opponent Knight"
    //         className="piece"
    //         onClick={() => promotePawn(pawn, "oh", i)}
    //       />
    //     </div>
    //     <div className="promotionPiece">
    //       <img
    //         src={color === "white" ? blackBishop : whiteBishop}
    //         alt="Opponent Bishop"
    //         className="piece"
    //         onClick={() => promotePawn(pawn, "ob", i)}
    //       />
    //     </div>
    //     <div className="promotionPiece">
    //       <img
    //         src={color === "white" ? blackRook : whiteRook}
    //         alt="Opponent Rook"
    //         className="piece"
    //         onClick={() => promotePawn(pawn, "or", i)}
    //       />
    //     </div>
    //     <div className="promotionPiece">
    //       <img
    //         src={color === "white" ? blackQueen : whiteQueen}
    //         alt="Opponent Queen"
    //         className="piece"
    //         onClick={() => promotePawn(pawn, "oq", i)}
    //       />
    //     </div>
    //   </div>
    // );
  };

  const renderEntries = (piece: string, i: number) => {
    if (/or/.test(piece)) {
      return renderEachPiece(piece, blackRook, whiteRook, "Black Rook", "White Rook");
    }

    if (/oh/.test(piece)) {
      return renderEachPiece(piece, blackKnight, whiteKnight, "Black Knight", "White Knight");
    }

    if (/ob/.test(piece)) {
      return renderEachPiece(piece, blackBishop, whiteBishop, "Black Bishop", "White Bishop");
    }

    if (/owq/.test(piece)) {
      return renderRoyals(piece, whiteQueen, "White Queen");
    }

    if (/oqb/.test(piece)) {
      return renderRoyals(piece, blackQueen, "Black Queen");
    }

    switch (piece) {
      case "okw":
        return renderRoyals(piece, whiteKing, "White King");
      case "okb":
        return renderRoyals(piece, blackKing, "Black King");
      case "op1":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op1", i)} */}
          </PawnContainer>
        );
      case "op2":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op2", i)} */}
          </PawnContainer>
        );
      case "op3":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op3", i)} */}
          </PawnContainer>
        );
      case "op4":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op4", i)} */}
          </PawnContainer>
        );
      case "op5":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op5", i)} */}
          </PawnContainer>
        );
      case "op6":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op6", i)} */}
          </PawnContainer>
        );
      case "op7":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op7", i)} */}
          </PawnContainer>
        );
      case "op8":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op8", i)} */}
          </PawnContainer>
        );
      case "pr1":
      case "pr2":
      case "pr3":
      case "pr4":
      case "pr5":
      case "pr6":
      case "pr7":
      case "pr8":
      case "pr9":
      case "pr01":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "ph1":
      case "ph2":
      case "ph3":
      case "ph4":
      case "ph5":
      case "ph6":
      case "ph7":
      case "ph8":
      case "ph9":
      case "ph01":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "pb1":
      case "pb2":
      case "pb3":
      case "pb4":
      case "pb5":
      case "pb6":
      case "pb7":
      case "pb8":
      case "pb9":
      case "pb01":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pkw":
        return renderRoyals(piece, whiteKing, "White King");
      case "pkb":
        return renderRoyals(piece, blackKing, "Black King");
      case "pqw1":
      case "pqw2":
      case "pqw3":
      case "pqw4":
      case "pqw5":
      case "pqw6":
      case "pqw7":
      case "pqw8":
      case "pqw9":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqb1":
      case "pqb2":
      case "pqb3":
      case "pqb4":
      case "pqb5":
      case "pqb6":
      case "pqb7":
      case "pqb8":
      case "pqb9":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pp1":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp1", i)} */}
          </PawnContainer>
        );
      case "pp2":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp2", i)} */}
          </PawnContainer>
        );
      case "pp3":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp3", i)} */}
          </PawnContainer>
        );
      case "pp4":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp4", i)} */}
          </PawnContainer>
        );
      case "pp5":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp5", i)} */}
          </PawnContainer>
        );
      case "pp6":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp6", i)} */}
          </PawnContainer>
        );
      case "pp7":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp7", i)} */}
          </PawnContainer>
        );
      case "pp8":
        return (
          <PawnContainer key={i * 100 + "a"}>
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp8", i)} */}
          </PawnContainer>
        );
      default:
        return (
          <Box
            sx={{
              width: "90px",
              height: "90px",
            }}
            key={i * 100 + "b"}
          ></Box>
        );
    }
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
      {/* {currentMove === null
        ? boardEntries.map((a, i) => renderEntries(a[0], i))
        : Object.entries(JSON.parse(moves[currentMove])).map((a, i) => renderEntries(a[0], i))} */}
      {Object.entries(board).map((a, i) => renderEntries(a[0], i))}
    </Box>
  );
};

export default Pieces;
