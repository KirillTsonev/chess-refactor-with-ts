import {useDispatch} from "react-redux";

import gameEndSoundFile from "../assets/sounds/gameEnd.ogg";
import captureSoundFile from "../assets/sounds/capture.ogg";
import checkSoundFile from "../assets/sounds/check.ogg";
import moveSoundFile from "../assets/sounds/move.ogg";

import useAllSelectors from "../hooks/useAllSelectors";
import useUtils from "./useUtils";
import useConstants from "./useConstants";
import useKingEightStar from "./useKingEightStar";
import useKingSpiderSense from "./useKingSpiderSense";
import {
  setMoveVar,
  resetHalfMoveCounter,
  setPawnPromotes,
  setOpponentKingAttacked,
  setPlayerKingAttacked,
  incrementHalfMoveCounter,
  setToMove,
  incrementMoveCounter,
  setMoveSquares,
  setPieceSquare,
  setCheckArrOpponent,
  setCheckArrPlayer,
} from "../redux/slices/boardSlice";
import {setMoveNumbers, setPieceGainOpponent, setPieceGainPlayer, setNotationArr, setMoves} from "../redux/slices/progressionSlice";
import {setCheckingPiece, setEnPassantSquare} from "../redux/slices/squareSlice";

const useAnimatePiece = () => {
  const dispatch = useDispatch();
  const gameEndSound = new Audio(gameEndSoundFile);
  const captureSound = new Audio(captureSoundFile);
  const checkSound = new Audio(checkSoundFile);
  const moveSound = new Audio(moveSoundFile);

  const {
    moves,
    sounds,
    humanOpponent,
    sandbox,
    color,
    toMove,
    playerNewSquareForEngine,
    board,
    opponentKingAttacked,
    playerKingAttacked,
    checkArrOpponent,
    checkArrPlayer,
    enPassantSquare,
  } = useAllSelectors();
  const {playerSquaresRender, pieces, opponentSquaresLive, occupiedSquaresLive, playerSquaresLive, opponentSquaresRender} = useUtils();
  const {rookMoves} = useConstants();
  const {kingSpiderSense} = useKingSpiderSense();
  const {kingEightStar} = useKingEightStar();

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

  const playerEightStar = kingEightStar({
    index: pieces(/pk/)[0],
    ownSquares: playerSquaresRender(),
    oppSquares: opponentSquaresRender(),
    boolean: true,
  });

  const opponentEightStar = kingEightStar({
    index: pieces(/ok/)[0],
    ownSquares: opponentSquaresRender(),
    oppSquares: playerSquaresRender(),
    boolean: true,
  });

  function animatePiece(i: number, string: string, num1: number, num2: number) {
    if (moves.length === 1 && sounds && !humanOpponent) gameEndSound.play();

    if (color === "black" && !sandbox) {
      dispatch(setMoveVar([num1 * -1, num2 * -1]));
    } else {
      dispatch(setMoveVar([num1, num2]));
    }

    if ((color === "white" && toMove === "w") || (color === "black" && toMove === "w")) {
      dispatch(setMoveNumbers());
    }

    if (/^o/.test(string)) {
      if (playerSquaresRender().includes(i)) {
        if (pieces(/pp/).includes(i)) dispatch(setPieceGainOpponent("♙"));
        if (pieces(/ph/).includes(i)) dispatch(setPieceGainOpponent("♘"));
        if (pieces(/pb/).includes(i)) dispatch(setPieceGainOpponent("♗"));
        if (pieces(/pr/).includes(i)) dispatch(setPieceGainOpponent("♖"));
        if (pieces(/pq/).includes(i)) dispatch(setPieceGainOpponent("♕"));

        dispatch(resetHalfMoveCounter());

        if (/^op/.test(string))
          dispatch(setNotationArr(`${board[string as keyof typeof board][1].slice(0, 1)}x${playerNewSquareForEngine}`));
        if (/^oh/.test(string)) dispatch(setNotationArr(`♘x${playerNewSquareForEngine}`));
        if (/^ob/.test(string)) dispatch(setNotationArr(`♗x${playerNewSquareForEngine}`));
        if (/^or/.test(string)) dispatch(setNotationArr(`♖x${playerNewSquareForEngine}`));
        if (/^oq/.test(string)) dispatch(setNotationArr(`♕x${playerNewSquareForEngine}`));
        if (/^ok/.test(string)) dispatch(setNotationArr(`♔x${playerNewSquareForEngine}`));

        if (/^op/.test(string) && rookMoves()[7].includes(i) && sandbox) dispatch(setPawnPromotes(string));

        if (opponentKingAttacked || (/^ok/.test(string) && opponentKingAttacked)) {
          if (sounds) captureSound.play();

          dispatch(setOpponentKingAttacked(false));
        }

        if (checkArrOpponent.flat().includes(pieces(/pk/)[0])) {
          if (sounds) checkSound.play();

          dispatch(setPlayerKingAttacked(true));

          // store.dispatch({
          //   type: "checkArrPlayer",
          //   payload: moves.length,
          // });

          dispatch(setCheckingPiece(i));
        }

        if (!checkArrOpponent.flat().includes(pieces(/pk/)[0])) {
          if (sounds) captureSound.play();

          dispatch(setPlayerKingAttacked(false));
        }

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

        if (sounds) {
          captureSound.play();
        }
      } else {
        if (/^op/.test(string)) dispatch(setNotationArr(playerNewSquareForEngine));
        if (/^oh/.test(string)) dispatch(setNotationArr(`♘${playerNewSquareForEngine}`));
        if (/^ob/.test(string)) dispatch(setNotationArr(`♗${playerNewSquareForEngine}`));
        if (/^or/.test(string)) dispatch(setNotationArr(`♖${playerNewSquareForEngine}`));
        if (/^oq/.test(string)) dispatch(setNotationArr(`♕${playerNewSquareForEngine}`));
        if (/^ok/.test(string)) dispatch(setNotationArr(`♔${playerNewSquareForEngine}`));

        if (/^ok/.test(string) && opponentKingAttacked) {
          if (sounds) moveSound.play();

          dispatch(setOpponentKingAttacked(false));
        }

        if ((opponentEightStar.flat().includes(i) && opponentKingAttacked) || (checkArrPlayer.includes(i) && opponentKingAttacked)) {
          if (sounds) moveSound.play();

          dispatch(setOpponentKingAttacked(false));
        }

        if (/^op/.test(string) && rookMoves()[7].includes(i) && sandbox) dispatch(setPawnPromotes(string));

        /^op/.test(string) ? dispatch(resetHalfMoveCounter()) : dispatch(incrementHalfMoveCounter());

        if (checkArrOpponent.flat().includes(pieces(/pk/)[0])) {
          if (sounds) checkSound.play();

          dispatch(setPlayerKingAttacked(true));
          dispatch(setCheckingPiece(i));

          // store.dispatch({
          //   type: "checkArrPlayer",
          //   payload: moves.length,
          // });
        }

        if (!checkArrOpponent.flat().includes(pieces(/pk/)[0])) {
          if (sounds) moveSound.play();

          dispatch(setPlayerKingAttacked(false));
        }

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

        if (sounds) moveSound.play();
      }

      color === "white" ? dispatch(setToMove("w")) : dispatch(setToMove("b"));

      if ((color === "black" && toMove === "w") || (color === "white" && toMove === "b")) dispatch(incrementMoveCounter());

      if (/^pp/.test(enPassantSquare[1])) dispatch(setEnPassantSquare([0, ""]));
    }

    if (/^p/.test(string)) {
      if (opponentSquaresRender().includes(i)) {
        dispatch(resetHalfMoveCounter());

        if (checkArrPlayer.flat().includes(pieces(/ok/)[0])) {
          if (sounds) checkSound.play();

          dispatch(setOpponentKingAttacked(true));
          dispatch(setCheckingPiece(i));

          // store.dispatch({
          //   type: "checkArrOpponent",
          //   payload: moves.length,
          // });
        }

        if (pieces(/op/).includes(i)) dispatch(setPieceGainPlayer("♙"));
        if (pieces(/oh/).includes(i)) dispatch(setPieceGainPlayer("♘"));
        if (pieces(/ob/).includes(i)) dispatch(setPieceGainPlayer("♗"));
        if (pieces(/or/).includes(i)) dispatch(setPieceGainPlayer("♖"));
        if (pieces(/oq/).includes(i)) dispatch(setPieceGainPlayer("♕"));

        if (/^pp/.test(string))
          dispatch(setNotationArr(`${board[string as keyof typeof board][1].slice(0, 1)}x${playerNewSquareForEngine}`));
        if (/^ph/.test(string)) dispatch(setNotationArr(`♘x${playerNewSquareForEngine}`));
        if (/^pb/.test(string)) dispatch(setNotationArr(`♗x${playerNewSquareForEngine}`));
        if (/^pr/.test(string)) dispatch(setNotationArr(`♖x${playerNewSquareForEngine}`));
        if (/^pq/.test(string)) dispatch(setNotationArr(`♕x${playerNewSquareForEngine}`));
        if (/^pk/.test(string)) dispatch(setNotationArr(`♔x${playerNewSquareForEngine}`));

        if (playerKingAttacked || (/^pk/.test(string) && playerKingAttacked)) {
          if (sounds) captureSound.play();

          dispatch(setPlayerKingAttacked(false));
        }

        if (/^pp/.test(string) && rookMoves()[0].includes(i)) dispatch(setPawnPromotes(string));

        if (!checkArrPlayer.flat().includes(pieces(/ok/)[0]) && opponentKingAttacked) {
          if (sounds) captureSound.play();

          dispatch(setOpponentKingAttacked(false));
        }

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

        if (sounds) captureSound.play();
      } else {
        if (/^pp/.test(string)) dispatch(setNotationArr(playerNewSquareForEngine));
        if (/^ph/.test(string)) dispatch(setNotationArr(`♘${playerNewSquareForEngine}`));
        if (/^pb/.test(string)) dispatch(setNotationArr(`♗${playerNewSquareForEngine}`));
        if (/^pr/.test(string)) dispatch(setNotationArr(`♖${playerNewSquareForEngine}`));
        if (/^pq/.test(string)) dispatch(setNotationArr(`♕${playerNewSquareForEngine}`));
        if (/^pk/.test(string)) dispatch(setNotationArr(`♔${playerNewSquareForEngine}`));

        if (/^pp/.test(string) && rookMoves()[0].includes(i)) dispatch(setPawnPromotes(string));

        /^pp/.test(string) ? dispatch(resetHalfMoveCounter()) : dispatch(incrementHalfMoveCounter());

        if (checkArrOpponent.includes(i) && playerKingAttacked) {
          if (sounds) moveSound.play();

          dispatch(setPlayerKingAttacked(false));
        }

        if (playerEightStar.flat().includes(i) && playerKingAttacked) {
          if (sounds) moveSound.play();

          dispatch(setPlayerKingAttacked(false));
        }

        if (/^pk/.test(string) && playerKingAttacked) {
          if (sounds) moveSound.play();

          dispatch(setPlayerKingAttacked(false));
        }

        if (checkArrPlayer.flat().includes(pieces(/ok/)[0])) {
          if (sounds) checkSound.play();

          dispatch(setOpponentKingAttacked(true));
          dispatch(setCheckingPiece(i));

          // store.dispatch({
          //   type: "checkArrOpponent",
          //   payload: moves.length,
          // });
        }

        if (!checkArrPlayer.flat().includes(pieces(/ok/)[0]) && opponentKingAttacked) {
          if (sounds) moveSound.play();

          dispatch(setOpponentKingAttacked(false));
        }

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

        if (sounds) moveSound.play();
      }

      color === "white" ? dispatch(setToMove("b")) : dispatch(setToMove("w"));

      if (/^op/.test(enPassantSquare[1])) dispatch(setEnPassantSquare([0, ""]));
    }

    dispatch(setMoveSquares([]));
    dispatch(setPieceSquare(0));
    dispatch(setCheckArrOpponent([]));
    dispatch(setCheckArrPlayer([]));
    dispatch(setMoves(JSON.stringify(board)));
  }

  return {animatePiece};
};

export default useAnimatePiece;
