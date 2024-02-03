import {useDispatch} from "react-redux";

import checkSoundFile from "../assets/sounds/check.ogg";
import useAllSelectors from "../hooks/useAllSelectors";
import useUtils from "./useUtils";
import {
  promotePawn,
  setOpponentKingAttacked,
  setCheckArrOpponent,
  setCheckArrPlayer,
  setPlayerKingAttacked,
  setPawnPromotes,
} from "../redux/slices/boardSlice";

const usePromotePawn = () => {
  const dispatch = useDispatch();
  const checkSound = new Audio(checkSoundFile);

  const {color, humanOpponent, sandbox, sounds, moves} = useAllSelectors();
  const {playerSquaresLive, opponentSquaresLive, opponentSquaresRender, playerSquaresRender} = useUtils();

  function promotePawnFn(pawn: string, pieceToPromoteTo: string, i: number) {
    if (/^pp/.test(pawn) && /^pq/.test(pieceToPromoteTo) && color === "white") pieceToPromoteTo = pieceToPromoteTo + "w";
    if (/^pp/.test(pawn) && /^pq/.test(pieceToPromoteTo) && color === "black") pieceToPromoteTo = pieceToPromoteTo + "b";
    if (/^op/.test(pawn) && /^oq/.test(pieceToPromoteTo) && color === "white") pieceToPromoteTo = pieceToPromoteTo + "b";
    if (/^op/.test(pawn) && /^oq/.test(pieceToPromoteTo) && color === "black") pieceToPromoteTo = pieceToPromoteTo + "w";

    dispatch(promotePawn({pieceToPromoteTo, i}));

    if (/^ph/.test(pieceToPromoteTo)) {
      recordKnightMoves(i + 1, checkedByPlayerArr.current, playerSquaresLive());

      if (checkedByPlayerArr.current.includes(enemyKing)) {
        if (sounds) {
          checkSound.play();
        }

        dispatch(setOpponentKingAttacked(true));

        dispatch(checkArrOpponent(moves.length));
      }
    }

    if (/^oh/.test(pieceToPromoteTo)) {
      recordKnightMoves(i + 1, checkedByPlayerArr.current, opponentSquaresRender());

      if (checkedByPlayerArr.current.includes(playerKing)) {
        if (sounds) {
          checkSound.play();
        }

        dispatch(setPlayerKingAttacked(true));

        dispatch(checkArrPlayer(moves.length));
      }
    }

    if (/^pr/.test(pieceToPromoteTo)) {
      checkArrays(rookMoves.current, i + 1, checkedByPlayerArr.current, playerSquaresLive(), opponentSquaresLive(), true, true);

      if (checkedByPlayerArr.current.includes(enemyKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        dispatch(setOpponentKingAttacked(true));

        dispatch(checkArrOpponent(moves.length));
      }
    }

    if (/^or/.test(pieceToPromoteTo)) {
      checkArrays(rookMoves.current, i + 1, checkedByPlayerArr.current, opponentSquaresRender(), playerSquaresRender(), true, true);

      if (checkedByPlayerArr.current.includes(playerKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        dispatch(setPlayerKingAttacked(true));

        dispatch(checkArrPlayer(moves.length));
      }
    }

    if (/^pb/.test(pieceToPromoteTo)) {
      checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive(), opponentSquaresLive(), true, true);
      checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive(), opponentSquaresLive(), true, true);

      if (checkedByPlayerArr.current.includes(enemyKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        dispatch(setOpponentKingAttacked(true));

        dispatch(checkArrOpponent(moves.length));
      }
    }

    if (/^ob/.test(pieceToPromoteTo)) {
      checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, opponentSquaresRender(), playerSquaresRender(), true, true);
      checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, opponentSquaresRender(), playerSquaresRender(), true, true);

      if (checkedByPlayerArr.current.includes(playerKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        dispatch(setPlayerKingAttacked(true));

        dispatch(checkArrPlayer(moves.length));
      }
    }

    if (/^pq/.test(pieceToPromoteTo)) {
      checkArrays(rookMoves.current, i + 1, checkedByPlayerArr.current, playerSquaresLive(), opponentSquaresLive(), true, true);
      checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive(), opponentSquaresLive(), true, true);
      checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive(), opponentSquaresLive(), true, true);

      if (checkedByPlayerArr.current.includes(enemyKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        dispatch(setOpponentKingAttacked(true));

        dispatch(checkArrOpponent(moves.length));
      }
    }

    if (/^oq/.test(pieceToPromoteTo)) {
      checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, opponentSquaresRender(), playerSquaresRender(), true, true);
      checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, opponentSquaresRender(), playerSquaresRender(), true, true);
      checkArrays(rookMoves.current, i + 1, checkedByPlayerArr.current, opponentSquaresRender(), playerSquaresRender(), true, true);

      if (checkedByPlayerArr.current.includes(playerKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        dispatch(setPlayerKingAttacked(true));

        dispatch(checkArrPlayer(moves.length));
      }
    }

    dispatch(setPawnPromotes(""));

    if (!sandbox && /^pp/.test(pawn) && !humanOpponent) {
      engineTurn();
    }
  }

  return {promotePawnFn};
};

export default usePromotePawn;
