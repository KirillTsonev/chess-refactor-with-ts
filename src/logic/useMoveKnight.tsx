import useAllSelectors from "../hooks/useAllSelectors";
import useAnimatePiece from "./useAnimatePiece";

const useMoveKnight = () => {
  const {pieceSquareForEngine} = useAllSelectors();
  const {animatePiece} = useAnimatePiece();

  function moveKnight(i: number, string: string) {
    switch (pieceSquareForEngine - i) {
      case -17:
        animatePiece(i, string, -90, -180);
        break;
      case -15:
        animatePiece(i, string, 90, -180);
        break;
      case -10:
        animatePiece(i, string, -180, -90);
        break;
      case -6:
        animatePiece(i, string, 180, -90);
        break;
      case 6:
        animatePiece(i, string, -180, 90);
        break;
      case 10:
        animatePiece(i, string, 180, 90);
        break;
      case 15:
        animatePiece(i, string, -90, 180);
        break;
      case 17:
        animatePiece(i, string, 90, 180);
        break;
      default:
        break;
    }
  }

  return {moveKnight};
};

export default useMoveKnight;
