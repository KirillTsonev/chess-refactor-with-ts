import useKingEightStar from "./useKingEightStar";
import useUtils from "./useUtils";
import useAllSelectors from "../hooks/useAllSelectors";
import useConstants from "./useConstants";
import {PawnsFirstMove} from "../interfaces/IBoard";

const useRecordOpponentPawnMoves = () => {
  const {kingEightStar} = useKingEightStar();
  const {pieces, opponentSquaresRender, playerSquaresRender, occupiedSquaresRender} = useUtils();
  const {opponentKingAttacked, checkingPiece, pawnsFirstMove, enPassantSquare} = useAllSelectors();
  const {knightLimits, rookMoves} = useConstants();

  const opponentEightStarXray = kingEightStar({
    index: pieces(/ok/)[0],
    ownSquares: opponentSquaresRender(),
    oppSquares: playerSquaresRender(),
    boolean: false,
  });

  const opponentEightStar = kingEightStar({
    index: pieces(/ok/)[0],
    ownSquares: opponentSquaresRender(),
    oppSquares: playerSquaresRender(),
    boolean: true,
  });

  const recordOpponentPawnMoves = (i: number, piece: string) => {
    let arr: number[] = [];
    let arr2: number[] = [];

    for (let k = 0; k < 4; k++) {
      if (
        opponentEightStarXray[k].includes(i) &&
        (pieces(/pr/).some((a) => opponentEightStarXray[k].includes(a)) ||
          pieces(/pq/).some((a) => opponentEightStarXray[k].includes(a)))
      ) {
        arr2 = opponentEightStarXray[k];
      }
    }
    for (let k = 4; k < 8; k++) {
      if (
        opponentEightStarXray[k].includes(i) &&
        (pieces(/pb/).some((a) => opponentEightStarXray[k].includes(a)) ||
          pieces(/pq/).some((a) => opponentEightStarXray[k].includes(a)))
      ) {
        arr2 = opponentEightStarXray[k];
      }
    }

    if (pawnsFirstMove[piece as keyof PawnsFirstMove]) {
      arr = [i + 8, i + 16];
    } else {
      arr = [i + 8];
    }

    if (occupiedSquaresRender().includes(i + 8)) {
      arr = [];
    } else if (occupiedSquaresRender().includes(i + 16)) {
      arr = [i + 8];
    }

    if (
      (playerSquaresRender().includes(i + 7) || (rookMoves()[4].includes(i) && i + 7 === enPassantSquare[0])) &&
      !knightLimits()[0].includes(i)
    ) {
      arr.push(i + 7);
    }

    if (
      (playerSquaresRender().includes(i + 9) || (rookMoves()[4].includes(i) && i + 9 === enPassantSquare[0])) &&
      !knightLimits()[3].includes(i)
    ) {
      arr.push(i + 9);
    }

    if (arr2.filter((a) => opponentSquaresRender().includes(a)).length === 1) {
      arr = arr.filter((a) => arr2.includes(a));
    }

    if (opponentKingAttacked && opponentEightStar.flat().includes(checkingPiece)) {
      const arrTech = opponentEightStar.filter((a) => a.includes(checkingPiece)).flat();

      arr = arr.filter((a) => arrTech.includes(a));
    } else if (opponentKingAttacked && !opponentEightStar.flat().includes(checkingPiece) && arr.includes(checkingPiece)) {
      arr = [checkingPiece];
    } else if (opponentKingAttacked) {
      arr = [];
    }

    return arr;
  };

  return {recordOpponentPawnMoves};
};

export default useRecordOpponentPawnMoves;
