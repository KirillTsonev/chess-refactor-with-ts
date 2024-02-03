import useAnimatePiece from "./useAnimatePiece";
import useAllSelectors from "../hooks/useAllSelectors";

const useMoveBishop = () => {
  const {animatePiece} = useAnimatePiece();
  const {pieceSquareForEngine} = useAllSelectors();

  function moveBishop(i: number, string: string) {
    switch (pieceSquareForEngine - i) {
      case 9:
        animatePiece(i, string, 90, 90);
        break;
      case 18:
        animatePiece(i, string, 180, 180);
        break;
      case 27:
        animatePiece(i, string, 270, 270);
        break;
      case 36:
        animatePiece(i, string, 360, 360);
        break;
      case 45:
        animatePiece(i, string, 450, 450);
        break;
      case 54:
        animatePiece(i, string, 540, 540);
        break;
      case 63:
        animatePiece(i, string, 630, 630);
        break;
      case -9:
        animatePiece(i, string, -90, -90);
        break;
      case -18:
        animatePiece(i, string, -180, -180);
        break;
      case -27:
        animatePiece(i, string, -270, -270);
        break;
      case -36:
        animatePiece(i, string, -360, -360);
        break;
      case -45:
        animatePiece(i, string, -450, -450);
        break;
      case -54:
        animatePiece(i, string, -540, -540);
        break;
      case -63:
        animatePiece(i, string, -630, -630);
        break;
      case 7:
        animatePiece(i, string, -90, 90);
        break;
      case 14:
        animatePiece(i, string, -180, 180);
        break;
      case 21:
        animatePiece(i, string, -270, 270);
        break;
      case 28:
        animatePiece(i, string, -360, 360);
        break;
      case 35:
        animatePiece(i, string, -450, 450);
        break;
      case 42:
        animatePiece(i, string, -540, 540);
        break;
      case -7:
        animatePiece(i, string, 90, -90);
        break;
      case -14:
        animatePiece(i, string, 180, -180);
        break;
      case -21:
        animatePiece(i, string, 270, -270);
        break;
      case -28:
        animatePiece(i, string, 360, -360);
        break;
      case -35:
        animatePiece(i, string, 450, -450);
        break;
      case -42:
        animatePiece(i, string, 540, -540);
        break;
      default:
        break;
    }
  }

  return {moveBishop};
};

export default useMoveBishop;
