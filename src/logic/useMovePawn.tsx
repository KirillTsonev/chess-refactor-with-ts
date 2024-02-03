import {useDispatch} from "react-redux";

import useAnimatePiece from "./useAnimatePiece";
import useAllSelectors from "../hooks/useAllSelectors";
import {setEnPassantSquare} from "../redux/slices/squareSlice";

const useMovePawn = () => {
  const dispatch = useDispatch();

  const {animatePiece} = useAnimatePiece();
  const {enPassantSquare, pieceSquareForEngine} = useAllSelectors();

  const movePawn = (i: number, string: string) => {
    if (i === enPassantSquare[0]) {
      switch (pieceSquareForEngine - i) {
        case -9:
          animateEnPassant(-90, -90, string, i);
          break;
        case -7:
          animateEnPassant(90, -90, string, i);
          break;
        case 7:
          animateEnPassant(-90, 90, string, i);
          break;
        case 9:
          animateEnPassant(90, 90, string, i);
          break;
        default:
          break;
      }
    } else {
      switch (pieceSquareForEngine - i) {
        case 7:
          animatePiece(i, string, -90, 90);
          break;
        case 8:
          animatePiece(i, string, 0, 90);
          break;
        case 9:
          animatePiece(i, string, 90, 90);
          break;
        case 16:
          dispatch(setEnPassantSquare([i + 8, string]));
          animatePiece(i, string, 0, 180);
          break;
        case -16:
          dispatch(setEnPassantSquare([i - 8, string]));
          animatePiece(i, string, 0, -180);
          break;
        case -8:
          animatePiece(i, string, 0, -90);
          break;
        case -7:
          animatePiece(i, string, 90, -90);
          break;
        case -9:
          animatePiece(i, string, -90, -90);
          break;
        default:
          break;
      }
    }
  };

  return {movePawn};
};

export default useMovePawn;
