import {useDispatch} from "react-redux";

import useAnimatePiece from "./useAnimatePiece";
import useAllSelectors from "../hooks/useAllSelectors";
import useAnimateCastling from "./useAnimateCastling";
import {setNotationArr} from "../redux/slices/progressionSlice";

const useMoveKing = () => {
  const dispatch = useDispatch();

  const {animatePiece} = useAnimatePiece();
  const {pieceSquareForEngine} = useAllSelectors();
  const {animateCastling} = useAnimateCastling();

  function moveKing(i: number, string: string) {
    if (/^pk/.test(string)) {
      switch (pieceSquareForEngine - i) {
        case -2:
          animateCastling(-160, 0, 64, 62, "pr2");
          dispatch(setNotationArr("O-O"));
          break;
        case 2:
          animateCastling(160, 0, 57, 60, "pr1");
          dispatch(setNotationArr("O-O-O"));
          break;
        default:
          break;
      }
    }

    if (/^ok/.test(string)) {
      switch (pieceSquareForEngine - i) {
        case 2:
          animateCastling(160, 0, 1, 4, "or2");
          dispatch(setNotationArr("O-O-O"));
          break;
        case -2:
          animateCastling(-160, 0, 8, 6, "or1");
          dispatch(setNotationArr("O-O"));
          break;
        default:
          break;
      }
    }

    switch (pieceSquareForEngine - i) {
      case 9:
        animatePiece(i, string, 90, 90);
        break;
      case 8:
        animatePiece(i, string, 0, 90);
        break;
      case 7:
        animatePiece(i, string, -90, 90);
        break;
      case 1:
        animatePiece(i, string, 90, 0);
        break;
      case -1:
        animatePiece(i, string, -90, 0);
        break;
      case -7:
        animatePiece(i, string, 90, -90);
        break;
      case -8:
        animatePiece(i, string, 0, -90);
        break;
      case -9:
        animatePiece(i, string, -90, -90);
        break;
      default:
        break;
    }
  }

  return {moveKing};
};

export default useMoveKing;
