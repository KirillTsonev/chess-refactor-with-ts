import {useDispatch} from "react-redux";

import useAllSelectors from "../hooks/useAllSelectors";
import useUtils from "./useUtils";
import useRecordKnightMoves from "./useRecordKnightMoves";
import useCheckArrays from "./useCheckArrays";
import useConstants from "./useConstants";
import useRecordPlayerPawnMoves from "./useRecordPlayerPawnMoves";
import useRecordOpponentPawnMoves from "./useRecordOpponentPawnMoves";
import useUpdateStateBoard from "./useUpdateStateBoard";
import useMoveKnight from "./useMoveKnight";
import useMovePawn from "./useMovePawn";
import useMoveBishop from "./useMoveBishop";
import useMoveRook from "./useMoveRook";
import useMoveQueen from "./useMoveQueen";
import useMoveKing from "./useMoveKing";
import {setCheckArrPlayer, setCheckArrOpponent} from "../redux/slices/boardSlice";

const useHandlePieceMovement = () => {
  const dispatch = useDispatch();

  const {recordKnightMoves} = useRecordKnightMoves();
  const {checkArrays} = useCheckArrays();
  const {moveKnight} = useMoveKnight();
  const {rookMoves, blackBishopMoves, whiteBishopMoves} = useConstants();
  const {recordOpponentPawnMoves} = useRecordOpponentPawnMoves();
  const {recordPlayerPawnMoves} = useRecordPlayerPawnMoves();
  const {moveBishop} = useMoveBishop();
  const {updateStateBoard} = useUpdateStateBoard();
  const {movePawn} = useMovePawn();
  const {moveRook} = useMoveRook();
  const {moveQueen} = useMoveQueen();
  const {moveKing} = useMoveKing();
  const {moveSquares, activePiece} = useAllSelectors();
  const {opponentSquaresLive, playerSquaresLive} = useUtils();

  function handlePieceMovement(i: number) {
    if (/^ph/.test(activePiece) && moveSquares.includes(i)) {
      dispatch(setCheckArrPlayer(recordKnightMoves(i, playerSquaresLive())));
      updateStateBoard(i, activePiece);
      moveKnight(i, activePiece);
    }

    if (/^pp/.test(activePiece) && moveSquares.includes(i)) {
      dispatch(setCheckArrPlayer(recordPlayerPawnMoves(i, activePiece)));
      updateStateBoard(i, activePiece);
      movePawn(i, activePiece);
    }

    if (/^pb/.test(activePiece) && moveSquares.includes(i)) {
      const blackBishop = checkArrays({
        arrayChecked: blackBishopMoves(),
        i,
        ownArr: playerSquaresLive(),
        oppArr: opponentSquaresLive(),
        exclude1: true,
        exclude2: true,
      });
      const whiteBishop = checkArrays({
        arrayChecked: whiteBishopMoves(),
        i,
        ownArr: playerSquaresLive(),
        oppArr: opponentSquaresLive(),
        exclude1: true,
        exclude2: true,
      });

      dispatch(setCheckArrPlayer(whiteBishop.concat(blackBishop)));
      updateStateBoard(i, activePiece);
      moveBishop(i, activePiece);
    }

    if (/^pr/.test(activePiece) && moveSquares.includes(i)) {
      const rook = checkArrays({
        arrayChecked: rookMoves(),
        i,
        ownArr: playerSquaresLive(),
        oppArr: opponentSquaresLive(),
        exclude1: true,
        exclude2: true,
      });

      dispatch(setCheckArrPlayer(rook));
      updateStateBoard(i, activePiece);
      moveRook(i, activePiece);
    }

    if (/^pq/.test(activePiece) && moveSquares.includes(i)) {
      const rook = checkArrays({
        arrayChecked: rookMoves(),
        i,
        ownArr: playerSquaresLive(),
        oppArr: opponentSquaresLive(),
        exclude1: true,
        exclude2: true,
      });
      const blackBishop = checkArrays({
        arrayChecked: blackBishopMoves(),
        i,
        ownArr: playerSquaresLive(),
        oppArr: opponentSquaresLive(),
        exclude1: true,
        exclude2: true,
      });
      const whiteBishop = checkArrays({
        arrayChecked: whiteBishopMoves(),
        i,
        ownArr: playerSquaresLive(),
        oppArr: opponentSquaresLive(),
        exclude1: true,
        exclude2: true,
      });

      dispatch(setCheckArrPlayer(whiteBishop.concat(blackBishop).concat(rook)));
      updateStateBoard(i, activePiece);
      moveQueen(i, activePiece);
    }

    if (/^pk/.test(activePiece) && moveSquares.includes(i)) {
      updateStateBoard(i, activePiece);
      moveKing(i, activePiece);
      // kingSpiderSense(playerKing, playerSquaresLive(), opponentSquaresLive(), playerKingSpiderSenseArr);
    }

    if (/^oh/.test(activePiece) && moveSquares.includes(i)) {
      dispatch(setCheckArrOpponent(recordKnightMoves(i, opponentSquaresLive())));
      updateStateBoard(i, activePiece);
      moveKnight(i, activePiece);
    }

    if (/^op/.test(activePiece) && moveSquares.includes(i)) {
      dispatch(setCheckArrOpponent(recordOpponentPawnMoves(i, activePiece)));
      updateStateBoard(i, activePiece);
      movePawn(i, activePiece);
    }

    if (/^ob/.test(activePiece) && moveSquares.includes(i)) {
      const blackBishop = checkArrays({
        arrayChecked: blackBishopMoves(),
        i,
        ownArr: opponentSquaresLive(),
        oppArr: playerSquaresLive(),
        exclude1: true,
        exclude2: true,
      });
      const whiteBishop = checkArrays({
        arrayChecked: whiteBishopMoves(),
        i,
        ownArr: opponentSquaresLive(),
        oppArr: playerSquaresLive(),
        exclude1: true,
        exclude2: true,
      });

      dispatch(setCheckArrOpponent(whiteBishop.concat(blackBishop)));
      updateStateBoard(i, activePiece);
      moveBishop(i, activePiece);
    }

    if (/^or/.test(activePiece) && moveSquares.includes(i)) {
      const rook = checkArrays({
        arrayChecked: rookMoves(),
        i,
        ownArr: opponentSquaresLive(),
        oppArr: playerSquaresLive(),
        exclude1: true,
        exclude2: true,
      });

      dispatch(setCheckArrOpponent(rook));
      updateStateBoard(i, activePiece);
      moveRook(i, activePiece);
    }

    if (/^oq/.test(activePiece) && moveSquares.includes(i)) {
      const rook = checkArrays({
        arrayChecked: rookMoves(),
        i,
        ownArr: opponentSquaresLive(),
        oppArr: playerSquaresLive(),
        exclude1: true,
        exclude2: true,
      });
      const blackBishop = checkArrays({
        arrayChecked: blackBishopMoves(),
        i,
        ownArr: opponentSquaresLive(),
        oppArr: playerSquaresLive(),
        exclude1: true,
        exclude2: true,
      });
      const whiteBishop = checkArrays({
        arrayChecked: whiteBishopMoves(),
        i,
        ownArr: opponentSquaresLive(),
        oppArr: playerSquaresLive(),
        exclude1: true,
        exclude2: true,
      });

      dispatch(setCheckArrOpponent(whiteBishop.concat(blackBishop).concat(rook)));
      updateStateBoard(i, activePiece);
      moveQueen(i, activePiece);
    }

    if (/^ok/.test(activePiece) && moveSquares.includes(i)) {
      updateStateBoard(i, activePiece);
      moveKing(i, activePiece);
      // kingSpiderSense(enemyKing, opponentSquaresLive(), playerSquaresLive(), enemyKingSpiderSenseArr);
    }
  }

  return {handlePieceMovement};
};

export default useHandlePieceMovement;
