import useAllSelectors from "../hooks/useAllSelectors";
import useConstants from "./useConstants";
import useAttacked from "./useAttacked";
import useUtils from "./useUtils";

const useRecordPlayerKingMoves = () => {
  const {castlingPlayerMoved, color, sandbox, playerKingAttacked} = useAllSelectors();
  const {knightLimits} = useConstants();
  const {attacked} = useAttacked();
  const {playerSquaresRender} = useUtils();

  function recordPlayerKingMoves(i: number) {
    let arr = [];
    let arr2: number[] = [];

    const playerKingArr = attacked({
      who: "player",
      protect: false,
      coverCheck: false,
    });

    const protectedByOpponentArr = attacked({
      who: "opponent",
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

    if (castlingPlayerMoved.pk && castlingPlayerMoved.pr2 && castlingPlayerMoved.pr1) {
      arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2, i - 2];
    } else if (castlingPlayerMoved.pk && castlingPlayerMoved.pr2) {
      arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2];
    } else if (castlingPlayerMoved.pk && castlingPlayerMoved.pr1) {
      arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i - 2];
    } else if (knightLimits()[0].includes(i)) {
      arr = [i - 8, i - 7, i + 1, i + 8, i + 9];
    } else if (knightLimits()[3].includes(i)) {
      arr = [i - 9, i - 8, i - 1, i + 7, i + 8];
    } else {
      arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9];
    }

    for (const number of arr) {
      if (color === "black" && !sandbox) {
        if (playerSquaresRender().includes(number)) {
          arr = arr.filter((x) => x !== number);

          if ((!arr.includes(4) && i === 5) || playerKingAttacked || playerKingArr.includes(3)) {
            arr = arr.filter((x) => x !== 3);
          }

          if ((!arr.includes(6) && i === 5) || playerKingAttacked || playerKingArr.includes(7)) {
            arr = arr.filter((x) => x !== 7);
          }

          arr = arr
            .filter((a) => !playerKingArr.includes(a))
            .filter((a) => !protectedByOpponentArr.includes(a))
            .filter((a) => !arr2.includes(a))
            .filter((a) => a > 0 && a < 65);
        } else {
          arr = arr
            .filter((a) => !playerKingArr.includes(a))
            .filter((a) => !protectedByOpponentArr.includes(a))
            .filter((a) => !arr2.includes(a))
            .filter((a) => a > 0 && a < 65);
        }
      } else {
        if (playerSquaresRender().includes(number)) {
          arr = arr.filter((x) => x !== number);

          if ((!arr.includes(60) && i === 61) || playerKingAttacked || playerKingArr.includes(59)) {
            arr = arr.filter((x) => x !== 59);
          }

          if ((!arr.includes(62) && i === 61) || playerKingAttacked || playerKingArr.includes(63)) {
            arr = arr.filter((x) => x !== 63);
          }

          arr = arr
            .filter((a) => !playerKingArr.includes(a))
            .filter((a) => !protectedByOpponentArr.includes(a))
            .filter((a) => !arr2.includes(a))
            .filter((a) => a > 0 && a < 65);
        } else {
          arr = arr
            .filter((a) => !playerKingArr.includes(a))
            .filter((a) => !protectedByOpponentArr.includes(a))
            .filter((a) => !arr2.includes(a))
            .filter((a) => a > 0 && a < 65);
        }
      }
    }

    return arr;
  }

  return {recordPlayerKingMoves};
};

export default useRecordPlayerKingMoves;
