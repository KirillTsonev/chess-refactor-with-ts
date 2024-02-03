import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";

import useAllSelectors from "./useAllSelectors";
import {setActivePiece, setMoveVar, setOldSquare, setNewSquare} from "../redux/slices/boardSlice";

const useAnimate = () => {
  const notInitialRender = useRef(false);
  const dispatch = useDispatch();

  const {animationSpeed, board} = useAllSelectors();

  useEffect(() => {
    if (notInitialRender.current) {
      const movePiece = setTimeout(
        () => {
          dispatch(setActivePiece(""));
          dispatch(setMoveVar([0, 0]));
        },
        animationSpeed === 0 ? 0 : 50
      );

      const resetPiece = setTimeout(() => {
        dispatch(setActivePiece(""));
        dispatch(setOldSquare(0));
        dispatch(setNewSquare(0));
      }, 150);

      return () => {
        clearTimeout(movePiece);
        clearTimeout(resetPiece);
      };
    } else {
      notInitialRender.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(board)]);

  return {};
};

export default useAnimate;
