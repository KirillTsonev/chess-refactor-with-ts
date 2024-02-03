import {useDispatch} from "react-redux";

import useAllSelectors from "../hooks/useAllSelectors";
import useUtils from "./useUtils";
import useRecordKnightMoves from "./useRecordKnightMoves";
import useCheckArrays from "./useCheckArrays";
import useKingEightStar from "./useKingEightStar";
import useConstants from "./useConstants";
import useRecordPlayerKingMoves from "./useRecordPlayerKingMoves";
import useRecordOpponentKingMoves from "./useRecordOpponentKingMoves";
import useRecordPlayerPawnMoves from "./useRecordPlayerPawnMoves";
import useRecordOpponentPawnMoves from "./useRecordOpponentPawnMoves";
import useHandlePieceSelection from "./useHandlePieceSelection";
import useUpdateStateBoard from "./useUpdateStateBoard";
import useMoveKnight from "./useMoveKnight";
import useMovePawn from "./useMovePawn";
import useMoveBishop from "./useMoveBishop";
import useMoveRook from "./useMoveRook";
import useMoveQueen from "./useMoveQueen";
import useMoveKing from "./useMoveKing";
import {setCheckArrPlayer, setCheckArrOpponent} from "../redux/slices/boardSlice";

const useOnSquareClick = () => {
  const dispatch = useDispatch();

  const {recordKnightMoves} = useRecordKnightMoves();
  const {checkArrays} = useCheckArrays();
  const {moveKnight} = useMoveKnight();
  const {handlePieceSelection} = useHandlePieceSelection();
  const {recordPlayerKingMoves} = useRecordPlayerKingMoves();
  const {kingEightStar} = useKingEightStar();
  const {rookMoves, blackBishopMoves, whiteBishopMoves} = useConstants();
  const {recordOpponentPawnMoves} = useRecordOpponentPawnMoves();
  const {recordPlayerPawnMoves} = useRecordPlayerPawnMoves();
  const {recordEnemyKingMoves} = useRecordOpponentKingMoves();
  const {moveBishop} = useMoveBishop();
  const {updateStateBoard} = useUpdateStateBoard();
  const {movePawn} = useMovePawn();
  const {moveRook} = useMoveRook();
  const {moveQueen} = useMoveQueen();
  const {moveKing} = useMoveKing();
  const {
    moveSquares,
    toMove,
    color,
    activePiece,
    currentMove,
    gameEnd,
    humanOpponent,
    sandbox,
    playerKingAttacked,
    opponentKingAttacked,
    oldSquare,
    checkingPiece,
  } = useAllSelectors();
  const {
    playerSquaresRender,
    opponentSquaresRender,
    opponentSquaresLive,
    playerSquaresLive,
    occupiedSquaresRender,
    boardEntries,
    pieces,
  } = useUtils();

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

  function onSquareClick(i: number, piece: string) {
    handlePieceSelection(i, piece);

    //
    //
    //
    //
    //
    //
    //
    //

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
      recordKnightMoves(i, checkedByOpponentArr.current, opponentSquaresLive());

      updateStateBoard(i, activePiece);

      moveKnight(i, activePiece);
    }

    if (/^op/.test(activePiece) && moveSquares.includes(i)) {
      recordOpponentPawnMoves(i, activePiece, checkedByOpponentArr.current);

      updateStateBoard(i, activePiece);

      movePawn(i, activePiece);
    }

    if (/^ob/.test(activePiece) && moveSquares.includes(i)) {
      checkArrays(whiteBishopMoves, i, checkedByOpponentArr.current, opponentSquaresLive(), playerSquaresLive(), true, true);
      checkArrays(blackBishopMoves, i, checkedByOpponentArr.current, opponentSquaresLive(), playerSquaresLive(), true, true);

      updateStateBoard(i, activePiece);

      moveBishop(i, activePiece);
    }

    if (/^or/.test(activePiece) && moveSquares.includes(i)) {
      checkArrays(rookMoves.current, i, checkedByOpponentArr.current, opponentSquaresLive(), playerSquaresLive(), true, true);

      updateStateBoard(i, activePiece);

      moveRook(i, activePiece);
    }

    if (/^oq/.test(activePiece) && moveSquares.includes(i)) {
      checkArrays(whiteBishopMoves, i, checkedByOpponentArr.current, opponentSquaresLive(), playerSquaresLive(), true, true);
      checkArrays(blackBishopMoves, i, checkedByOpponentArr.current, opponentSquaresLive(), playerSquaresLive(), true, true);
      checkArrays(rookMoves.current, i, checkedByOpponentArr.current, opponentSquaresLive(), playerSquaresLive(), true, true);

      updateStateBoard(i, activePiece);

      moveQueen(i, activePiece);
    }

    if (/^ok/.test(activePiece) && moveSquares.includes(i)) {
      updateStateBoard(i, activePiece);

      moveKing(i, activePiece);

      // kingSpiderSense(enemyKing, opponentSquaresLive(), playerSquaresLive(), enemyKingSpiderSenseArr);
    }
  }

  return {onSquareClick};
};

export default useOnSquareClick;
