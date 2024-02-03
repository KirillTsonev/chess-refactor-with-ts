import useUtils from "./useUtils";
import useConstants from "./useConstants";
import useCheckArrays from "./useCheckArrays";
import useRecordKnightMoves from "./useRecordKnightMoves";
import useRecordPlayerPawnMoves from "./useRecordPlayerPawnMoves";
import useRecordOpponentPawnMoves from "./useRecordOpponentPawnMoves";
import useRecordPawnAttacks from "./useRecordPawnAttacks";

const useAttacked = () => {
  const {opponentSquaresRender, playerSquaresRender, pieces, occupiedSquaresRender} = useUtils();
  const {rookMoves, whiteBishopMoves, blackBishopMoves} = useConstants();
  const {recordKnightMoves} = useRecordKnightMoves();
  const {recordPlayerPawnMoves} = useRecordPlayerPawnMoves();
  const {recordOpponentPawnMoves} = useRecordOpponentPawnMoves();
  const {checkArrays} = useCheckArrays();
  const {recordOpponentPawnAttacks, recordPlayerPawnAttacks} = useRecordPawnAttacks();

  function attacked({who, protect, coverCheck}: {who: string; protect: boolean; coverCheck: boolean}) {
    const rooks = who === "player" ? pieces(/pr/) : pieces(/or/);
    const knights = who === "player" ? pieces(/pk/) : pieces(/ok/);
    const bishops = who === "player" ? pieces(/pb/) : pieces(/ob/);
    const queens = who === "player" ? pieces(/pq/) : pieces(/oq/);
    const pawns = who === "player" ? pieces(/pp/) : pieces(/op/);

    const oppSquares = who === "player" ? opponentSquaresRender() : playerSquaresRender();
    const ownSquares = who === "player" ? playerSquaresRender() : opponentSquaresRender();

    const rooksMoves = rooks.map((a) =>
      checkArrays({arrayChecked: rookMoves(), i: a, ownArr: oppSquares, oppArr: ownSquares, exclude1: true, exclude2: true})
    );
    const knightsMoves = knights.map((a) => recordKnightMoves(a, ownSquares));

    const whiteBishop = bishops.map((a) =>
      checkArrays({arrayChecked: whiteBishopMoves(), i: a, ownArr: oppSquares, oppArr: ownSquares, exclude1: true, exclude2: true})
    );
    const blackBishop = bishops.map((a) =>
      checkArrays({arrayChecked: blackBishopMoves(), i: a, ownArr: oppSquares, oppArr: ownSquares, exclude1: true, exclude2: true})
    );

    const queenWhiteBishop = queens.map((a) =>
      checkArrays({arrayChecked: whiteBishopMoves(), i: a, ownArr: oppSquares, oppArr: ownSquares, exclude1: true, exclude2: true})
    );
    const queenBlackBishop = queens.map((a) =>
      checkArrays({arrayChecked: blackBishopMoves(), i: a, ownArr: oppSquares, oppArr: ownSquares, exclude1: true, exclude2: true})
    );
    const queenRook = queens.map((a) =>
      checkArrays({arrayChecked: rookMoves(), i: a, ownArr: oppSquares, oppArr: ownSquares, exclude1: true, exclude2: true})
    );

    let arr: number[] = rooksMoves
      .concat(knightsMoves)
      .concat(whiteBishop)
      .concat(blackBishop)
      .concat(queenRook)
      .concat(queenBlackBishop)
      .concat(queenWhiteBishop)
      .flat();
    let arrPawn: number[] = [];

    if (coverCheck) {
      if (who === "player") {
        arrPawn = pawns.map((a) => recordPlayerPawnMoves(a, "")).flat();
      } else {
        arrPawn = pawns.map((a) => recordOpponentPawnMoves(a, "")).flat();
      }
    } else {
      if (who === "player") {
        arrPawn = pawns.map((a) => recordPlayerPawnAttacks(a)).flat();
      } else {
        arrPawn = pawns.map((a) => recordOpponentPawnAttacks(a)).flat();
      }
    }

    arr = [...arr, ...arrPawn];

    if (protect) {
      return arr.filter((a) => occupiedSquaresRender().includes(a));
    } else {
      return arr;
    }
  }

  return {attacked};
};

export default useAttacked;
