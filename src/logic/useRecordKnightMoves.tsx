import useAllSelectors from "../hooks/useAllSelectors";
import useUtils from "./useUtils";
import useConstants from "./useConstants";
import useKingEightStar from "./useKingEightStar";

const useRecordKnightMoves = () => {
  const {playerKingAttacked, opponentKingAttacked, checkingPiece} = useAllSelectors();
  const {playerSquaresRender, opponentSquaresRender, pieces} = useUtils();
  const {knightLimits} = useConstants();
  const {kingEightStar} = useKingEightStar();

  function recordKnightMoves(i: number, excArr: number[]) {
    const playerEightStarXray = kingEightStar({
      index: pieces(/pk/)[0],
      ownSquares: playerSquaresRender(),
      oppSquares: opponentSquaresRender(),
      boolean: false,
    });
    const playerEightStar = kingEightStar({
      index: pieces(/pk/)[0],
      ownSquares: playerSquaresRender(),
      oppSquares: opponentSquaresRender(),
      boolean: true,
    });
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
    let arr: number[] = [];
    let arr2: number[] = [];

    if (playerSquaresRender().includes(i)) {
      for (let k = 0; k < 4; k++) {
        if (
          playerEightStarXray[k].includes(i) &&
          (pieces(/or/).some((a) => playerEightStarXray[k].includes(a)) ||
            pieces(/oq/).some((a) => playerEightStarXray[k].includes(a))) &&
          playerEightStarXray[k].filter((a: number) => playerSquaresRender().includes(a)).length === 1
        ) {
          arr2 = playerEightStarXray[k];
        }
      }

      for (let k = 4; k < 8; k++) {
        if (
          playerEightStarXray[k].includes(i) &&
          (pieces(/ob/).some((a) => playerEightStarXray[k].includes(a)) ||
            pieces(/oq/).some((a) => playerEightStarXray[k].includes(a))) &&
          playerEightStarXray[k].filter((a: number) => playerSquaresRender().includes(a)).length === 1
        ) {
          arr2 = playerEightStarXray[k];
        }
      }
    }

    if (opponentSquaresRender().includes(i)) {
      for (let k = 0; k < 4; k++) {
        if (
          opponentEightStarXray[k].includes(i) &&
          (pieces(/pr/).some((a) => opponentEightStarXray[k].includes(a)) ||
            pieces(/pq/).some((a) => opponentEightStarXray[k].includes(a))) &&
          opponentEightStarXray[k].filter((a) => opponentSquaresRender().includes(a)).length === 1
        ) {
          arr2 = opponentEightStarXray[k];
        }
      }

      for (let k = 4; k < 8; k++) {
        if (
          opponentEightStarXray[k].includes(i) &&
          (pieces(/pb/).some((a) => opponentEightStarXray[k].includes(a)) ||
            pieces(/pq/).some((a) => opponentEightStarXray[k].includes(a))) &&
          opponentEightStarXray[k].filter((a) => opponentSquaresRender().includes(a)).length === 1
        ) {
          arr2 = opponentEightStarXray[k];
        }
      }
    }

    if (i) {
      if (knightLimits()[0].includes(i)) {
        arr = [i - 15, i - 6, i + 10, i + 17];
      } else if (knightLimits()[1].includes(i)) {
        arr = [i - 17, i - 15, i - 6, i + 10, i + 15, i + 17];
      } else if (knightLimits()[2].includes(i)) {
        arr = [i - 17, i - 15, i - 10, i + 6, i + 15, i + 17];
      } else if (knightLimits()[3].includes(i)) {
        arr = [i - 17, i - 10, i + 6, i + 15];
      } else {
        arr = [i - 17, i - 15, i - 10, i - 6, i + 6, i + 10, i + 15, i + 17];
      }

      for (const number of arr) {
        if (excArr.includes(number)) {
          arr = arr.filter((a) => a !== number);
        }

        if (arr2.length > 0) {
          arr = arr.filter((a) => arr2.includes(a));
        }
      }

      if (pieces(/pk/).includes(i)) {
        if (
          playerKingAttacked &&
          playerSquaresRender().includes(i) &&
          i !== pieces(/pk/)[0] &&
          playerEightStar.flat().includes(checkingPiece)
        ) {
          const arrTech = playerEightStar.filter((a) => a.includes(checkingPiece)).flat();

          arr = arr.filter((a) => arrTech.includes(a));
        } else if (playerKingAttacked && !playerEightStar.flat().includes(checkingPiece) && arr.includes(checkingPiece)) {
          arr = [checkingPiece];
        } else if (playerKingAttacked) {
          arr = [];
        }
      }

      if (pieces(/ok/).includes(i)) {
        if (
          opponentKingAttacked &&
          opponentSquaresRender().includes(i) &&
          i !== pieces(/ok/)[0] &&
          opponentEightStar.flat().includes(checkingPiece)
        ) {
          const arrTech = opponentEightStar.filter((a) => a.includes(checkingPiece)).flat();

          arr = arr.filter((a) => arrTech.includes(a));
        } else if (opponentKingAttacked && !opponentEightStar.flat().includes(checkingPiece) && arr.includes(checkingPiece)) {
          arr = [checkingPiece];
        } else if (opponentKingAttacked) {
          arr = [];
        }
      }
    }

    return arr;
  }

  return {recordKnightMoves};
};

export default useRecordKnightMoves;
