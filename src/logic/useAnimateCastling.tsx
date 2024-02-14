import {useDispatch} from "react-redux";

import checkSoundFile from "../assets/sounds/check.ogg";
import castlingSoundFile from "../assets/sounds/castling.ogg";
import useAllSelectors from "../hooks/useAllSelectors";
import useUtils from "./useUtils";
import useKingSpiderSense from "./useKingSpiderSense";
import {
  setOldSquare,
  setNewSquare,
  setMoveVar,
  setToMove,
  setOpponentKingAttacked,
  setPlayerKingAttacked,
  setMovePiece,
  setMoveSquares,
  setPieceSquare,
  setBoard,
} from "../redux/slices/boardSlice";
import {setMoveNumbers} from "../redux/slices/progressionSlice";

const useAnimateCastling = () => {
  const dispatch = useDispatch();
  const castlingSound = new Audio(castlingSoundFile);
  const checkSound = new Audio(checkSoundFile);

  const {sounds, color, sandbox, toMove} = useAllSelectors();
  const {pieces, playerSquaresLive, occupiedSquaresLive, opponentSquaresLive, liveBoard} = useUtils();
  const {kingSpiderSense} = useKingSpiderSense();

  function animateCastling({
    coor1,
    coor2,
    rookOldSq,
    newSqRook,
    rookToMove,
  }: {
    coor1: number;
    coor2: number;
    rookOldSq: number;
    newSqRook: number;
    rookToMove: string;
  }) {
    if (sounds) castlingSound.play();

    if (color === "black" && !sandbox) {
      dispatch(setMoveVar([coor1 * -1, coor2 * -1]));

      if (/or/.test(rookToMove)) {
        dispatch(setOldSquare(rookOldSq + 56));
        dispatch(setNewSquare(newSqRook + 56));
      } else {
        dispatch(setOldSquare(rookOldSq - 56));
        dispatch(setNewSquare(newSqRook - 56));
      }
    } else {
      dispatch(setMoveVar([coor1, coor2]));
      dispatch(setOldSquare(rookOldSq));
      dispatch(setNewSquare(newSqRook - 1));
    }

    dispatch(setMovePiece(rookToMove));

    if ((color === "white" && toMove === "w") || (color === "black" && toMove === "w")) dispatch(setMoveNumbers());

    // recordBoard();

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

    if (/^pr/.test(rookToMove)) {
      if (
        pieces(/pr/).some((a) => opponentKingSpiderSenseArr[1].includes(a)) &&
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
        pieces(/or/).some((a) => playerKingSpiderSenseArr[1].includes(a)) &&
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

    dispatch(setMoveSquares([]));
    dispatch(setPieceSquare(0));

    if (color === "white") {
      /^pr/.test(rookToMove) ? dispatch(setToMove("b")) : dispatch(setToMove("w"));
    } else {
      /^or/.test(rookToMove) ? dispatch(setToMove("b")) : dispatch(setToMove("w"));
    }

    dispatch(setBoard(liveBoard()));
  }

  return {animateCastling};
};

export default useAnimateCastling;
