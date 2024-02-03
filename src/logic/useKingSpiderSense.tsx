import useCheckArrays from "./useCheckArrays";
import useConstants from "./useConstants";

const useKingSpiderSense = () => {
  const {checkArrays} = useCheckArrays();
  const {whiteBishopMoves, blackBishopMoves, rookMoves} = useConstants();

  function kingSpiderSense({king, ownArr, oppArr}: {king: number; ownArr: number[]; oppArr: number[]}) {
    const whiteBishop = checkArrays({arrayChecked: whiteBishopMoves(), i: king, ownArr, oppArr, exclude1: true, exclude2: true});
    const blackBishop = checkArrays({arrayChecked: blackBishopMoves(), i: king, ownArr, oppArr, exclude1: true, exclude2: true});
    const rook = checkArrays({arrayChecked: rookMoves(), i: king, ownArr, oppArr, exclude1: true, exclude2: true});

    return [whiteBishop.concat(blackBishop), rook];
  }

  return {kingSpiderSense};
};

export default useKingSpiderSense;
