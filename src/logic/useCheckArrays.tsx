import useUtils from "./useUtils";
import useKingEightStar from "./useKingEightStar";

const useCheckArrays = () => {
  const {pieces, playerSquaresRender, opponentSquaresRender} = useUtils();
  const {kingEightStar} = useKingEightStar();

  function checkArrays({
    arrayChecked,
    i,
    ownArr,
    oppArr,
    exclude1,
    exclude2,
  }: {
    arrayChecked: number[][];
    i: number;
    ownArr: number[];
    oppArr: number[];
    exclude1: number[];
    exclude2: number[];
  }) {
    const playerEightStarXray = kingEightStar({
      index: pieces(/pk/)[0],
      ownSquares: playerSquaresRender(),
      oppSquares: opponentSquaresRender(),
      boolean: false,
    });
    const opponentEightStarXray = kingEightStar({
      index: pieces(/ok/)[0],
      ownSquares: opponentSquaresRender(),
      oppSquares: playerSquaresRender(),
      boolean: false,
    });
    const arr: number[] = [];
    let arr2: number[] = [];

    if (i) {
      if (i !== pieces(/pk/)[0] && i !== pieces(/ok/)[0]) {
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
              opponentEightStarXray[k].filter((a: number) => opponentSquaresRender().includes(a)).length === 1
            ) {
              arr2 = opponentEightStarXray[k];
            }
          }

          for (let k = 4; k < 8; k++) {
            if (
              opponentEightStarXray[k].includes(i) &&
              (pieces(/pb/).some((a) => opponentEightStarXray[k].includes(a)) ||
                pieces(/pq/).some((a) => opponentEightStarXray[k].includes(a))) &&
              opponentEightStarXray[k].filter((a: number) => opponentSquaresRender().includes(a)).length === 1
            ) {
              arr2 = opponentEightStarXray[k];
            }
          }
        }
      }

      for (const subArr of arrayChecked) {
        if (subArr.includes(i)) {
          for (let j = i + 1; j <= Math.max(...subArr); j++) {
            if (subArr.includes(j) && arr2.length === 0) {
              if (ownArr.includes(j) && exclude1) {
                break;
              } else if (oppArr.includes(j) && j !== pieces(/pk/)[0] && j !== pieces(/ok/)[0] && exclude2) {
                arr.push(j);
                break;
              } else {
                arr.push(j);
              }
            } else if (subArr.includes(j) && arr2.includes(j) && !ownArr.includes(j)) {
              arr.push(j);
            }
          }

          for (let j = i - 1; j >= Math.min(...subArr); j--) {
            if (subArr.includes(j) && arr2.length === 0) {
              if (ownArr.includes(j) && exclude1) {
                break;
              } else if (oppArr.includes(j) && j !== pieces(/pk/)[0] && j !== pieces(/ok/)[0] && exclude2) {
                arr.push(j);
                break;
              } else {
                arr.push(j);
              }
            } else if (subArr.includes(j) && arr2.includes(j) && !ownArr.includes(j)) {
              arr.push(j);
            }
          }
        }
      }
    }

    return arr;
  }

  return {checkArrays};
};

export default useCheckArrays;
