import useHandlePieceSelection from "./useHandlePieceSelection";
import useHandlePieceMovement from "./useHandlePieceMovement";

const useOnSquareClick = () => {
  const {handlePieceSelection} = useHandlePieceSelection();
  const {handlePieceMovement} = useHandlePieceMovement();

  function onSquareClick(i: number, piece: string) {
    handlePieceSelection(i, piece);
    handlePieceMovement(i);
  }

  return {onSquareClick};
};

export default useOnSquareClick;
