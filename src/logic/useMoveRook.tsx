import useAnimatePiece from "./useAnimatePiece";
import useAllSelectors from "../hooks/useAllSelectors";

const useMoveRook = () => {
  const {animatePiece} = useAnimatePiece();
  const {pieceSquareForEngine} = useAllSelectors();

  function moveRook(i: number, string: string) {
    switch (pieceSquareForEngine - i) {
      case 8:
        animatePiece(i, string, 0, 90);
        break;
      case 16:
        animatePiece(i, string, 0, 180);
        break;
      case 24:
        animatePiece(i, string, 0, 270);
        break;
      case 32:
        animatePiece(i, string, 0, 360);
        break;
      case 40:
        animatePiece(i, string, 0, 450);
        break;
      case 48:
        animatePiece(i, string, 0, 540);
        break;
      case 56:
        animatePiece(i, string, 0, 630);
        break;
      case -8:
        animatePiece(i, string, 0, -90);
        break;
      case -16:
        animatePiece(i, string, 0, -180);
        break;
      case -24:
        animatePiece(i, string, 0, -270);
        break;
      case -32:
        animatePiece(i, string, 0, -360);
        break;
      case -40:
        animatePiece(i, string, 0, -450);
        break;
      case -48:
        animatePiece(i, string, 0, -540);
        break;
      case -56:
        animatePiece(i, string, 0, -630);
        break;
      case 1:
        animatePiece(i, string, 90, 0);
        break;
      case 2:
        animatePiece(i, string, 180, 0);
        break;
      case 3:
        animatePiece(i, string, 270, 0);
        break;
      case 4:
        animatePiece(i, string, 360, 0);
        break;
      case 5:
        animatePiece(i, string, 450, 0);
        break;
      case 6:
        animatePiece(i, string, 540, 0);
        break;
      case 7:
        animatePiece(i, string, 630, 0);
        break;
      case -1:
        animatePiece(i, string, -90, 0);
        break;
      case -2:
        animatePiece(i, string, -180, 0);
        break;
      case -3:
        animatePiece(i, string, -270, 0);
        break;
      case -4:
        animatePiece(i, string, -360, 0);
        break;
      case -5:
        animatePiece(i, string, -450, 0);
        break;
      case -6:
        animatePiece(i, string, -540, 0);
        break;
      case -7:
        animatePiece(i, string, -630, 0);
        break;
      default:
        break;
    }
  }

  return {moveRook};
};

export default useMoveRook;
