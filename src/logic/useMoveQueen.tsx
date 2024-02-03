import useAnimatePiece from "./useAnimatePiece";
import useAllSelectors from "../hooks/useAllSelectors";
import useConstants from "./useConstants";

const useMoveQueen = () => {
  const {animatePiece} = useAnimatePiece();
  const {pieceSquareForEngine, pieceSquare} = useAllSelectors();
  const {knightLimits} = useConstants();

  function moveQueen(i: number, string: string) {
    if (
      (knightLimits()[0].includes(pieceSquare) || knightLimits()[3].includes(pieceSquare)) &&
      (knightLimits()[0].includes(i) || knightLimits()[3].includes(i))
    ) {
      switch (pieceSquareForEngine - i) {
        case -7:
          animatePiece(i, string, -630, 0);
          break;
        case 7:
          animatePiece(i, string, 630, 0);
          break;
        default:
          break;
      }
    } else {
      switch (pieceSquareForEngine - i) {
        case -7:
          animatePiece(i, string, 90, -90);
          break;
        case 7:
          animatePiece(i, string, -90, 90);
          break;
        default:
          break;
      }
    }

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
      default:
        break;
    }
  }

  return {moveQueen};
};

export default useMoveQueen;
