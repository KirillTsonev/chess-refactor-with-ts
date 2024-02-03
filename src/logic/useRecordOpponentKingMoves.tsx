import useConstants from "./useConstants";
import useAttacked from "./useAttacked";
import useAllSelectors from "../hooks/useAllSelectors";
import useUtils from "./useUtils";

const useRecordOpponentKingMoves = () => {
  const {knightLimits} = useConstants();
  const {attacked} = useAttacked();
  const {castlingOpponentMoved, opponentKingAttacked} = useAllSelectors();
  const {occupiedSquaresRender} = useUtils();

  function recordEnemyKingMoves(i: number) {
    let arr = [];
    let arr2: number[] = [];

    const opponentKingArr = attacked({
      who: "opponent",
      protect: false,
      coverCheck: false,
    });

    const protectedByPlayerArr = attacked({
      who: "player",
      protect: true,
      coverCheck: false,
    });

    if (knightLimits()[0].includes(i)) {
      arr2 = [i - 8, i - 7, i + 1, i + 8, i + 9];
    } else if (knightLimits()[3].includes(i)) {
      arr2 = [i - 9, i - 8, i - 1, i + 7, i + 8];
    } else {
      arr2 = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9];
    }

    if (castlingOpponentMoved.ok && castlingOpponentMoved.or2 && castlingOpponentMoved.or1) {
      arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2, i - 2];
    } else if (castlingOpponentMoved.ok && castlingOpponentMoved.or2) {
      arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2];
    } else if (castlingOpponentMoved.ok && castlingOpponentMoved.or1) {
      arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i - 2];
    } else if (knightLimits()[0].includes(i)) {
      arr = [i - 8, i - 7, i + 1, i + 8, i + 9];
    } else if (knightLimits()[3].includes(i)) {
      arr = [i - 9, i - 8, i - 1, i + 7, i + 8];
    } else {
      arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9];
    }

    for (const number of arr) {
      if (occupiedSquaresRender().includes(number)) {
        arr = arr.filter((x) => x !== number);

        if ((!arr.includes(4) && i === 5) || (opponentKingAttacked && opponentKingArr.includes(3))) {
          arr = arr.filter((x) => x !== 3);
        }

        if ((!arr.includes(6) && i === 5) || (opponentKingAttacked && opponentKingArr.includes(7))) {
          arr = arr.filter((x) => x !== 7);
        }

        arr = arr
          .filter((a) => !opponentKingArr.includes(a))
          .filter((a) => !protectedByPlayerArr.includes(a))
          .filter((a) => !arr2.includes(a))
          .filter((a) => a > 0 && a < 65);
      } else {
        arr = arr
          .filter((a) => !opponentKingArr.includes(a))
          .filter((a) => !protectedByPlayerArr.includes(a))
          .filter((a) => !arr2.includes(a))
          .filter((a) => a > 0 && a < 65);
      }
    }

    return arr;
  }

  return {recordEnemyKingMoves};
};

export default useRecordOpponentKingMoves;
