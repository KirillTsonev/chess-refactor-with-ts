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

  const renderEachPiece = (a, src1, src2, alt1, alt2) => {
    return color === "white" ? (
      <img
        src={src1}
        key={a}
        alt={alt1}
        className="piece"
        style={
          activePiece === `${a}`
            ? {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`}
            : {transform: `translate(0px, 0px)`, transition: `all ${animationSpeed}s`}
        }
      ></img>
    ) : (
      <div
        className={`${color === "black" && !sandbox ? "reverse" : null}`}
        style={{height: "80px"}}
        key={a}
      >
        <img
          src={src2}
          alt={alt2}
          className="piece"
          style={
            activePiece === `${a}`
              ? {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`}
              : {transform: `translate(0px, 0px)`, transition: `all ${animationSpeed}s`}
          }
        ></img>
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
        <img
          src={src}
          alt={alt}
          className={`piece ${
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
        ></img>
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
    switch (piece) {
      case "or1":
      case "or2":
      case "or3":
      case "or4":
      case "or5":
      case "or6":
      case "or7":
      case "or8":
      case "or9":
      case "or01":
        return renderEachPiece(piece, blackRook, whiteRook, "Black Rook", "White Rook");
      case "oh1":
      case "oh2":
      case "oh3":
      case "oh4":
      case "oh5":
      case "oh6":
      case "oh7":
      case "oh8":
      case "oh9":
      case "oh01":
        return renderEachPiece(piece, blackKnight, whiteKnight, "Black Knight", "White Knight");
      case "ob1":
      case "ob2":
      case "ob3":
      case "ob4":
      case "ob5":
      case "ob6":
      case "ob7":
      case "ob8":
      case "ob9":
      case "ob01":
        return renderEachPiece(piece, blackBishop, whiteBishop, "Black Bishop", "White Bishop");
      case "okw":
        return renderRoyals(piece, whiteKing, "White King");
      case "okb":
        return renderRoyals(piece, blackKing, "Black King");
      case "oqw1":
      case "oqw2":
      case "oqw3":
      case "oqw4":
      case "oqw5":
      case "oqw6":
      case "oqw7":
      case "oqw8":
      case "oqw9":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "oqb1":
      case "oqb2":
      case "oqb3":
      case "oqb4":
      case "oqb5":
      case "oqb6":
      case "oqb7":
      case "oqb8":
      case "oqb9":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "op1":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op1", i)} */}
          </div>
        );
      case "op2":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op2", i)} */}
          </div>
        );
      case "op3":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op3", i)} */}
          </div>
        );
      case "op4":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op4", i)} */}
          </div>
        );
      case "op5":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op5", i)} */}
          </div>
        );
      case "op6":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op6", i)} */}
          </div>
        );
      case "op7":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op7", i)} */}
          </div>
        );
      case "op8":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
            {/* {renderOpponentPromotion("op8", i)} */}
          </div>
        );
      case "pr1":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "pr2":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "pr3":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "pr4":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "pr5":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "pr6":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "pr7":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "pr8":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "pr9":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "pr01":
        return renderEachPiece(piece, whiteRook, blackRook, "White Rook", "Black Rook");
      case "ph1":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "ph2":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "ph3":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "ph4":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "ph5":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "ph6":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "ph7":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "ph8":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "ph9":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "ph01":
        return renderEachPiece(piece, whiteKnight, blackKnight, "White Knight", "Black Knight");
      case "pb1":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pb2":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pb3":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pb4":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pb5":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pb6":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pb7":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pb8":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pb9":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pb01":
        return renderEachPiece(piece, whiteBishop, blackBishop, "White Bishop", "Black Bishop");
      case "pkw":
        return renderRoyals(piece, whiteKing, "White King");
      case "pkb":
        return renderRoyals(piece, blackKing, "Black King");
      case "pqw1":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqw2":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqw3":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqw4":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqw5":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqw6":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqw7":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqw8":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqw9":
        return renderRoyals(piece, whiteQueen, "White Queen");
      case "pqb1":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pqb2":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pqb3":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pqb4":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pqb5":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pqb6":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pqb7":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pqb8":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pqb9":
        return renderRoyals(piece, blackQueen, "Black Queen");
      case "pp1":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp1", i)} */}
          </div>
        );
      case "pp2":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp2", i)} */}
          </div>
        );
      case "pp3":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp3", i)} */}
          </div>
        );
      case "pp4":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp4", i)} */}
          </div>
        );
      case "pp5":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp5", i)} */}
          </div>
        );
      case "pp6":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp6", i)} */}
          </div>
        );
      case "pp7":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp7", i)} */}
          </div>
        );
      case "pp8":
        return (
          <div
            className="pawnContainer"
            key={i * 100 + "a"}
          >
            {renderEachPiece(piece, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
            {/* {renderPlayerPromotion("pp8", i)} */}
          </div>
        );
      default:
        return (
          <div
            className="piece"
            key={i * 100 + "b"}
          ></div>
        );
    }
  };

  return (
    <div className="piecesGrid">
      {/* {currentMove === null
        ? boardEntries.map((a, i) => renderEntries(a[0], i))
        : Object.entries(JSON.parse(moves[currentMove])).map((a, i) => renderEntries(a[0], i))} */}
      {Object.entries(board).map((a, i) => renderEntries(a[0], i))}
    </div>
  );
};

export default Pieces;
