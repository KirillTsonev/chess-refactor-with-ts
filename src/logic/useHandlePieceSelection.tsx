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
import {setMoveSquares, setActivePiece, setPieceSquare, setOldSquare} from "../redux/slices/boardSlice";
import {setPieceSquareForEngine, setPlayerPiece} from "../redux/slices/squareSlice";

const useHandlePieceSelection = () => {
  const dispatch = useDispatch();

  const {recordKnightMoves} = useRecordKnightMoves();
  const {checkArrays} = useCheckArrays();
  const {recordPlayerKingMoves} = useRecordPlayerKingMoves();
  const {kingEightStar} = useKingEightStar();
  const {rookMoves, blackBishopMoves, whiteBishopMoves} = useConstants();
  const {recordOpponentPawnMoves} = useRecordOpponentPawnMoves();
  const {recordPlayerPawnMoves} = useRecordPlayerPawnMoves();
  const {recordEnemyKingMoves} = useRecordOpponentKingMoves();
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
  const {playerSquaresRender, opponentSquaresRender, occupiedSquaresRender, boardEntries, pieces} = useUtils();

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

  function handlePieceSelection(i: number, piece: string) {
    if (
      ((!moveSquares.includes(i) && moveSquares.length > 0) || activePiece === piece) &&
      ((((color === "white" && toMove === "b") || (color === "black" && toMove === "w")) && !playerSquaresRender().includes(i)) ||
        (((color === "white" && toMove === "w") || (color === "black" && toMove === "b")) && !opponentSquaresRender().includes(i)))
    ) {
      dispatch(setMoveSquares([]));
      dispatch(setActivePiece(""));
      dispatch(setPieceSquare(0));
    }

    if (
      (occupiedSquaresRender().includes(i) && activePiece !== piece && !currentMove && !gameEnd && !humanOpponent) ||
      (humanOpponent && occupiedSquaresRender().includes(i) && activePiece !== piece && !currentMove && !gameEnd)
    ) {
      if (((color === "white" && toMove === "w") || (color === "black" && toMove === "b")) && playerSquaresRender().includes(i)) {
        dispatch(setMoveSquares([]));
        dispatch(setActivePiece(piece));
        dispatch(setPieceSquareForEngine(i));
        // if (store.getState().board.oldSquare !== i) {
        if (oldSquare !== i) {
          dispatch(setOldSquare(i));
        }

        dispatch(
          setPlayerPiece(
            boardEntries()
              .filter(([, value]) => value[0] === i)
              .flat()[1][1]
          )
        );

        dispatch(setPieceSquare(i));

        if (/^ph/.test(piece)) dispatch(setMoveSquares(recordKnightMoves(i, playerSquaresRender())));

        if (/^pp/.test(piece)) dispatch(setMoveSquares(recordPlayerPawnMoves(i, piece)));

        if (/^pr/.test(piece)) {
          let arr: number[] = checkArrays({
            arrayChecked: rookMoves(),
            i,
            ownArr: playerSquaresRender(),
            oppArr: opponentSquaresRender(),
            exclude1: true,
            exclude2: true,
          });

          if (playerKingAttacked && playerEightStar.flat().includes(checkingPiece)) {
            const arrTech = playerEightStar.filter((a) => a.includes(checkingPiece)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (playerKingAttacked && !playerEightStar.flat().includes(checkingPiece)) {
            arr = arr.filter((a) => a === checkingPiece);
          }

          dispatch(setMoveSquares(arr));
        }

        if (/^pb/.test(piece)) {
          const blackBishop: number[] = checkArrays({
            arrayChecked: blackBishopMoves(),
            i,
            ownArr: playerSquaresRender(),
            oppArr: opponentSquaresRender(),
            exclude1: true,
            exclude2: true,
          });
          const whiteBishop: number[] = checkArrays({
            arrayChecked: whiteBishopMoves(),
            i,
            ownArr: playerSquaresRender(),
            oppArr: opponentSquaresRender(),
            exclude1: true,
            exclude2: true,
          });
          let arr: number[] = blackBishop.concat(whiteBishop);

          if (playerKingAttacked && playerEightStar.flat().includes(checkingPiece)) {
            const arrTech = playerEightStar.filter((a) => a.includes(checkingPiece)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (playerKingAttacked && !playerEightStar.flat().includes(checkingPiece)) {
            arr = arr.filter((a) => a === checkingPiece);
          }

          dispatch(setMoveSquares(arr));
        }

        if (/^pq/.test(piece)) {
          const rook = checkArrays({
            arrayChecked: rookMoves(),
            i,
            ownArr: playerSquaresRender(),
            oppArr: opponentSquaresRender(),
            exclude1: true,
            exclude2: true,
          });
          const blackBishop = checkArrays({
            arrayChecked: blackBishopMoves(),
            i,
            ownArr: playerSquaresRender(),
            oppArr: opponentSquaresRender(),
            exclude1: true,
            exclude2: true,
          });
          const whiteBishop = checkArrays({
            arrayChecked: whiteBishopMoves(),
            i,
            ownArr: playerSquaresRender(),
            oppArr: opponentSquaresRender(),
            exclude1: true,
            exclude2: true,
          });

          let arr: number[] = rook.concat(whiteBishop).concat(blackBishop);

          if (playerKingAttacked && playerEightStar.flat().includes(checkingPiece)) {
            const arrTech = playerEightStar.filter((a) => a.includes(checkingPiece)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (playerKingAttacked && !playerEightStar.flat().includes(checkingPiece)) {
            arr = arr.filter((a) => a === checkingPiece);
          }

          dispatch(setMoveSquares(arr));
        }

        if (/^pk/.test(piece)) dispatch(setMoveSquares(recordPlayerKingMoves(i)));
      } else if (
        ((color === "white" && toMove === "b") || (color === "black" && toMove === "w")) &&
        sandbox &&
        opponentSquaresRender().includes(i)
      ) {
        dispatch(setMoveSquares([]));
        dispatch(setActivePiece(piece));
        dispatch(setPieceSquare(i));
        // if (store.getState().board.oldSquare !== i) {
        if (oldSquare !== i) {
          dispatch(setOldSquare(i));
        }

        dispatch(setPieceSquareForEngine(i));

        dispatch(
          setPlayerPiece(
            boardEntries()
              .filter(([, value]) => value[0] === i)
              .flat()[1][1]
          )
        );

        if (/^oh/.test(piece)) dispatch(setMoveSquares(recordKnightMoves(i, opponentSquaresRender())));

        if (/^op/.test(piece)) dispatch(setMoveSquares(recordOpponentPawnMoves(i, piece)));

        if (/^or/.test(piece)) {
          let arr: number[] = checkArrays({
            arrayChecked: rookMoves(),
            i,
            ownArr: opponentSquaresRender(),
            oppArr: playerSquaresRender(),
            exclude1: true,
            exclude2: true,
          });

          if (opponentKingAttacked && opponentEightStar.flat().includes(checkingPiece)) {
            const arrTech = opponentEightStar.filter((a) => a.includes(checkingPiece)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (opponentKingAttacked && !opponentEightStar.flat().includes(checkingPiece)) {
            arr = arr.filter((a) => a === checkingPiece);
          }

          dispatch(setMoveSquares(arr));
        }

        if (/^ob/.test(piece)) {
          const whiteBishop: number[] = checkArrays({
            arrayChecked: whiteBishopMoves(),
            i,
            ownArr: opponentSquaresRender(),
            oppArr: playerSquaresRender(),
            exclude1: true,
            exclude2: true,
          });
          const blackBishop: number[] = checkArrays({
            arrayChecked: blackBishopMoves(),
            i,
            ownArr: opponentSquaresRender(),
            oppArr: playerSquaresRender(),
            exclude1: true,
            exclude2: true,
          });

          let arr: number[] = whiteBishop.concat(blackBishop);

          if (opponentKingAttacked && opponentEightStar.flat().includes(checkingPiece)) {
            const arrTech = opponentEightStar.filter((a) => a.includes(checkingPiece)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (opponentKingAttacked && !opponentEightStar.flat().includes(checkingPiece)) {
            arr = arr.filter((a) => a === checkingPiece);
          }

          dispatch(setMoveSquares(arr));
        }

        if (/^oq/.test(piece)) {
          const rook: number[] = checkArrays({
            arrayChecked: rookMoves(),
            i,
            ownArr: opponentSquaresRender(),
            oppArr: playerSquaresRender(),
            exclude1: true,
            exclude2: true,
          });
          const blackBishop: number[] = checkArrays({
            arrayChecked: blackBishopMoves(),
            i,
            ownArr: opponentSquaresRender(),
            oppArr: playerSquaresRender(),
            exclude1: true,
            exclude2: true,
          });
          const whiteBishop: number[] = checkArrays({
            arrayChecked: whiteBishopMoves(),
            i,
            ownArr: opponentSquaresRender(),
            oppArr: playerSquaresRender(),
            exclude1: true,
            exclude2: true,
          });

          let arr: number[] = rook.concat(whiteBishop).concat(blackBishop);

          if (opponentKingAttacked && opponentEightStar.flat().includes(checkingPiece)) {
            const arrTech = opponentEightStar.filter((a) => a.includes(checkingPiece)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (opponentKingAttacked && !opponentEightStar.flat().includes(checkingPiece)) {
            arr = arr.filter((a) => a === checkingPiece);
          }

          dispatch(setMoveSquares(arr));
        }

        if (/^ok/.test(piece)) dispatch(setMoveSquares(recordEnemyKingMoves(i)));
      }
    }
  }

  return {handlePieceSelection};
};

export default useHandlePieceSelection;
