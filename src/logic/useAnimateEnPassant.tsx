import {useDispatch} from "react-redux";

import useAllSelectors from "../hooks/useAllSelectors";
import useUtils from "./useUtils";
import useKingSpiderSense from "./useKingSpiderSense";
import checkSoundFile from "../assets/sounds/check.ogg";
import captureSoundFile from "../assets/sounds/capture.ogg";
import {
  setMovePiece,
  setMoveSquares,
  setMoveVar,
  setNewSquare,
  setOldSquare,
  setOpponentKingAttacked,
  setPieceSquare,
  setPlayerKingAttacked,
  setBoard,
  setToMove,
} from "../redux/slices/boardSlice";
import {setMoveNumbers, setNotationArr} from "../redux/slices/progressionSlice";

const useAnimateEnPassant = () => {
  const dispatch = useDispatch();
  const checkSound = new Audio(checkSoundFile);
  const captureSound = new Audio(captureSoundFile);

  const {color, sandbox, toMove, board, sounds, playerNewSquareForEngine} = useAllSelectors();
  const {pieces, playerSquaresLive, opponentSquaresLive, occupiedSquaresLive, liveBoard} = useUtils();
  const {kingSpiderSense} = useKingSpiderSense();

  const playerKingSpiderSenseArr = kingSpiderSense({
    king: pieces(/pk/)[0],
    ownArr: playerSquaresLive(),
    oppArr: opponentSquaresLive(),
  });

  const opponentKingSpiderSenseArr = kingSpiderSense({
    king: pieces(/ok/)[0],
    ownArr: opponentSquaresLive(),
    oppArr: playerSquaresLive(),
  });

  function animateEnPassant({coor1, coor2, string, i}: {coor1: number; coor2: number; string: string; i: number}) {
    color === "black" && !sandbox ? dispatch(setMoveVar([coor1 * -1, coor2 * -1])) : dispatch(setMoveVar([coor1, coor2]));

    let capturedPawn = i;

    /^pp/.test(string) ? (capturedPawn += 8) : (capturedPawn -= 8);

    dispatch(setOldSquare(i));
    dispatch(setNewSquare(capturedPawn));
    dispatch(setMovePiece("takes"));
    dispatch(setOldSquare(capturedPawn));
    dispatch(setNewSquare(i));
    dispatch(setMovePiece(string));

    if ((color === "white" && toMove === "w") || (color === "black" && toMove === "w")) dispatch(setMoveNumbers());

    // recordBoard();

    if (/^pp/.test(string)) {
      dispatch(setNotationArr(`${board[string as keyof typeof board][1].slice(0, 1)}x${playerNewSquareForEngine}`));

      if (
        (pieces(/pq/).some((a) => opponentKingSpiderSenseArr[0].includes(a)) ||
          pieces(/pb/).some((a) => opponentKingSpiderSenseArr[0].includes(a))) &&
        occupiedSquaresLive()
          .filter((a) => !playerSquaresLive().includes(a))
          .every((a) => !opponentKingSpiderSenseArr[0].includes(a))
      ) {
        if (sounds) checkSound.play();

        dispatch(setOpponentKingAttacked(true));

        // store.dispatch({
        //   type: "checkArrOpponent",
        //   payload: moves.length,
        // });
      }

      if (
        (pieces(/pq/).some((a) => opponentKingSpiderSenseArr[1].includes(a)) ||
          pieces(/pr/).some((a) => opponentKingSpiderSenseArr[1].includes(a))) &&
        occupiedSquaresLive()
          .filter((a) => !playerSquaresLive().includes(a))
          .every((a) => !opponentKingSpiderSenseArr[1].includes(a))
      ) {
        if (sounds) checkSound.play();

        dispatch(setOpponentKingAttacked(true));

        // store.dispatch({
        //   type: "checkArrOpponent",
        //   payload: moves.length,
        // });
      }
    } else {
      if (
        (pieces(/oq/).some((a) => playerKingSpiderSenseArr[0].includes(a)) ||
          pieces(/ob/).some((a) => playerKingSpiderSenseArr[0].includes(a))) &&
        occupiedSquaresLive()
          .filter((a) => !opponentSquaresLive().includes(a))
          .every((a) => !playerKingSpiderSenseArr[0].includes(a))
      ) {
        if (sounds) checkSound.play();

        dispatch(setPlayerKingAttacked(true));

        // store.dispatch({
        //   type: "checkArrPlayer",
        //   payload: moves.length,
        // });
      }

      if (
        (pieces(/oq/).some((a) => playerKingSpiderSenseArr[1].includes(a)) ||
          pieces(/or/).some((a) => playerKingSpiderSenseArr[1].includes(a))) &&
        occupiedSquaresLive()
          .filter((a) => !opponentSquaresLive().includes(a))
          .every((a) => !playerKingSpiderSenseArr[1].includes(a))
      ) {
        if (sounds) checkSound.play();

        dispatch(setPlayerKingAttacked(true));

        // store.dispatch({
        //   type: "checkArrPlayer",
        //   payload: moves.length,
        // });
      }
    }

    if (sounds) captureSound.play();

    dispatch(setMoveSquares([]));
    dispatch(setPieceSquare(0));

    if (color === "white") {
      /^pp/.test(string) ? dispatch(setToMove("b")) : dispatch(setToMove("w"));
    } else {
      /^op/.test(string) ? dispatch(setToMove("b")) : dispatch(setToMove("w"));
    }

    dispatch(setBoard(liveBoard()));
  }

  return {animateEnPassant};
};

export default useAnimateEnPassant;
