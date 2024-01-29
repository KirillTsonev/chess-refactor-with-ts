import useConstants from "./useConstants";

const useKingEightStar = () => {
  const {rookMoves, blackBishopMoves, whiteBishopMoves} = useConstants();

  function combThroughSubArrayPlus({
    index,
    subArr,
    arrResult,
    ownArr,
    oppArr,
    exclude,
  }: {
    index: number;
    subArr: number[];
    arrResult: number[];
    ownArr: number[];
    oppArr: number[];
    exclude: boolean;
  }) {
    if (subArr.includes(index)) {
      for (let j = index + 1; j <= Math.max(...subArr); j++) {
        if (subArr.includes(j)) {
          if (ownArr.includes(j) && exclude) {
            break;
          } else if (oppArr.includes(j)) {
            arrResult.push(j);
            break;
          } else {
            arrResult.push(j);
          }
        }
      }
    }
  }

  function combThroughSubArrayMinus({
    index,
    subArr,
    arrResult,
    ownArr,
    oppArr,
    exclude,
  }: {
    index: number;
    subArr: number[];
    arrResult: number[];
    ownArr: number[];
    oppArr: number[];
    exclude: boolean;
  }) {
    if (subArr.includes(index)) {
      for (let j = index - 1; j >= Math.min(...subArr); j--) {
        if (subArr.includes(j)) {
          if (ownArr.includes(j) && exclude) {
            break;
          } else if (oppArr.includes(j)) {
            arrResult.push(j);
            break;
          } else {
            arrResult.push(j);
          }
        }
      }
    }
  }

  function kingEightStar({
    index,
    ownSquares,
    oppSquares,
    boolean,
  }: {
    index: number;
    ownSquares: number[];
    oppSquares: number[];
    boolean: boolean;
  }) {
    const arr: number[][] = [[], [], [], [], [], [], [], []];

    for (let i = 0; i < 8; i++) {
      combThroughSubArrayPlus({
        index,
        subArr: rookMoves()[i],
        arrResult: arr[0],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
      combThroughSubArrayMinus({
        index,
        subArr: rookMoves()[i],
        arrResult: arr[1],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
    }

    for (let i = 8; i < 16; i++) {
      combThroughSubArrayPlus({
        index,
        subArr: rookMoves()[i],
        arrResult: arr[2],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
      combThroughSubArrayMinus({
        index,
        subArr: rookMoves()[i],
        arrResult: arr[3],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
    }

    for (let i = 0; i < 7; i++) {
      combThroughSubArrayPlus({
        index,
        subArr: blackBishopMoves()[i],
        arrResult: arr[4],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
      combThroughSubArrayMinus({
        index,
        subArr: blackBishopMoves()[i],
        arrResult: arr[5],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });

      combThroughSubArrayPlus({
        index,
        subArr: whiteBishopMoves()[i],
        arrResult: arr[4],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
      combThroughSubArrayMinus({
        index,
        subArr: whiteBishopMoves()[i],
        arrResult: arr[5],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
    }

    for (let i = 7; i < 13; i++) {
      combThroughSubArrayPlus({
        index,
        subArr: blackBishopMoves()[i],
        arrResult: arr[6],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
      combThroughSubArrayMinus({
        index,
        subArr: blackBishopMoves()[i],
        arrResult: arr[7],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });

      combThroughSubArrayPlus({
        index,
        subArr: whiteBishopMoves()[i],
        arrResult: arr[6],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
      combThroughSubArrayMinus({
        index,
        subArr: whiteBishopMoves()[i],
        arrResult: arr[7],
        ownArr: ownSquares,
        oppArr: oppSquares,
        exclude: boolean,
      });
    }

    return arr;
  }

  return {kingEightStar};
};

export default useKingEightStar;
