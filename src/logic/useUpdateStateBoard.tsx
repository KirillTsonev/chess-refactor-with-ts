import {useDispatch} from "react-redux";

import useUtils from "./useUtils";
import {
  setPawnMoved,
  setCastlingPlayerMoved,
  setCastlingOpponentMoved,
  setNewSquare,
  highlightMove,
  setMovePiece,
} from "../redux/slices/boardSlice";
import {setPlayerNewSquareForEngine} from "../redux/slices/squareSlice";

const useUpdateStateBoard = () => {
  const dispatch = useDispatch();

  const {boardEntries, playerSquaresRender, opponentSquaresRender} = useUtils();

  function updateStateBoard(i: number, string: string) {
    if (/^pp/.test(string) || /^op/.test(string)) dispatch(setPawnMoved(string));
    if (/(pr1)|(pr2)/.test(string) || /^pk/.test(string)) dispatch(setCastlingPlayerMoved(string));
    if (/(or1)|(or2)/.test(string) || /^ok/.test(string)) dispatch(setCastlingOpponentMoved(string));

    dispatch(setNewSquare(i));

    dispatch(
      setPlayerNewSquareForEngine(
        boardEntries()
          .filter(([, value]) => value[0] === i)
          .flat()[1][1]
      )
    );

    dispatch(highlightMove(i));

    if (/^o/.test(string)) {
      if (playerSquaresRender().includes(i)) {
        dispatch(setMovePiece(string + "takes"));
      } else {
        dispatch(setMovePiece(string));
      }
    }

    if (/^p/.test(string)) {
      if (opponentSquaresRender().includes(i)) {
        dispatch(setMovePiece(string + "takes"));
      } else {
        dispatch(setMovePiece(string));
      }
    }

    // recordBoard();
  }

  return {updateStateBoard};
};

export default useUpdateStateBoard;
