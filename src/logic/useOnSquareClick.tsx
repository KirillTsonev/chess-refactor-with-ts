import {useDispatch} from "react-redux";

import useAllSelectors from "../hooks/useAllSelectors";
import {setMoveSquares, setActivePiece, setPieceSquare} from "../redux/slices/boardSlice";

const useOnSquareClick = () => {
  const dispatch = useDispatch();

  const {moveSquares, toMove, color, activePiece, currentMove, gameEnd, humanOpponent, sandbox} = useAllSelectors();

  const onSquareClick = (i: number, piece: string) => {
    if (
      ((!moveSquares.includes(i) && moveSquares.length > 0) || activePiece === piece) &&
      ((((color === "white" && toMove === "b") || (color === "black" && toMove === "w")) &&
        !playerSquaresRender.includes(i)) ||
        (((color === "white" && toMove === "w") || (color === "black" && toMove === "b")) &&
          !enemySquaresRender.includes(i)))
    ) {
      dispatch(setMoveSquares([]));
      dispatch(setActivePiece(""));
      dispatch(setPieceSquare(""));
    }

    if (
      (occupiedSquaresRender.includes(i) && activePiece !== piece && !currentMove && !gameEnd && !humanOpponent) ||
      (humanOpponent &&
        playersArr.current.length === 2 &&
        occupiedSquaresRender.includes(i) &&
        activePiece !== piece &&
        !currentMove &&
        !gameEnd)
    ) {
      if (
        ((color === "white" && toMove === "w") || (color === "black" && toMove === "b")) &&
        playerSquaresRender.includes(i)
      ) {
        store.dispatch({
          type: "moveSquares",
          payload: [],
        });

        if (store.getState().board.oldSquare !== i) {
          store.dispatch({
            type: "oldSquare",
            payload: i,
          });
        }

        store.dispatch({
          type: "activePiece",
          payload: piece,
        });

        pieceSquareForEngine.current = i;
        playerPiece.current = boardEntries
          .filter(([key, value]) => value[0] === pieceSquareForEngine.current)
          .flat()[1][1];

        pvpOldSquare.current = board[piece][1];

        store.dispatch({
          type: "pieceSquare",
          payload: i,
        });

        if (/^ph/.test(piece)) {
          let arr = [];

          recordKnightMoves(i, arr, playerSquaresRender);

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^pp/.test(piece)) {
          let arr = [];

          recordPlayerPawnMoves(i, piece, arr);

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^pr/.test(piece)) {
          let arr = [];

          checkArrays(rookMoves.current, i, arr, playerSquaresRender, enemySquaresRender, true, true);

          if (playerKingAttacked && playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
            let arrTech = playerKing8StarArr.current.filter((a) => a.includes(checkingPiece.current)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (playerKingAttacked && !playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
            arr = arr.filter((a) => a === checkingPiece.current);
          }

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^pb/.test(piece)) {
          let arr = [];

          checkArrays(blackBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true, true);
          checkArrays(whiteBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true, true);

          if (playerKingAttacked && playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
            let arrTech = playerKing8StarArr.current.filter((a) => a.includes(checkingPiece.current)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (playerKingAttacked && !playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
            arr = arr.filter((a) => a === checkingPiece.current);
          }

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^pq/.test(piece)) {
          let arr = [];

          checkArrays(rookMoves.current, i, arr, playerSquaresRender, enemySquaresRender, true, true);
          checkArrays(blackBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true, true);
          checkArrays(whiteBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true, true);

          if (playerKingAttacked && playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
            let arrTech = playerKing8StarArr.current.filter((a) => a.includes(checkingPiece.current)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (playerKingAttacked && !playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
            arr = arr.filter((a) => a === checkingPiece.current);
          }

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^pk/.test(piece)) {
          let arr = [];

          recordPlayerKingMoves(i, arr);

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }
      } else if (
        ((color === "white" && toMove === "b") || (color === "black" && toMove === "w")) &&
        sandbox &&
        enemySquaresRender.includes(i)
      ) {
        store.dispatch({
          type: "moveSquares",
          payload: [],
        });

        if (store.getState().board.oldSquare !== i) {
          store.dispatch({
            type: "oldSquare",
            payload: i,
          });
        }

        store.dispatch({
          type: "activePiece",
          payload: piece,
        });

        store.dispatch({
          type: "pieceSquare",
          payload: i,
        });

        pieceSquareForEngine.current = i;
        playerPiece.current = boardEntries
          .filter(([key, value]) => value[0] === pieceSquareForEngine.current)
          .flat()[1][1];

        if (/^oh/.test(piece)) {
          let arr = [];

          recordKnightMoves(i, arr, enemySquaresRender);

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^op/.test(piece)) {
          let arr = [];

          recordOpponentPawnMoves(i, piece, arr);

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^or/.test(piece)) {
          let arr = [];

          checkArrays(rookMoves.current, i, arr, enemySquaresRender, playerSquaresRender, true, true);

          if (enemyKingAttacked && enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
            let arrTech = enemyKing8StarArr.current.filter((a) => a.includes(checkingPiece.current)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (enemyKingAttacked && !enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
            arr = arr.filter((a) => a === checkingPiece.current);
          }

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^ob/.test(piece)) {
          let arr = [];

          checkArrays(whiteBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true, true);
          checkArrays(blackBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true, true);

          if (enemyKingAttacked && enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
            let arrTech = enemyKing8StarArr.current.filter((a) => a.includes(checkingPiece.current)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (enemyKingAttacked && !enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
            arr = arr.filter((a) => a === checkingPiece.current);
          }

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^oq/.test(piece)) {
          let arr = [];

          checkArrays(rookMoves.current, i, arr, enemySquaresRender, playerSquaresRender, true, true);
          checkArrays(blackBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true, true);
          checkArrays(whiteBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true, true);

          if (enemyKingAttacked && enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
            let arrTech = enemyKing8StarArr.current.filter((a) => a.includes(checkingPiece.current)).flat();

            arr = arr.filter((a) => arrTech.includes(a));
          } else if (enemyKingAttacked && !enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
            arr = arr.filter((a) => a === checkingPiece.current);
          }

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }

        if (/^ok/.test(piece)) {
          let arr = [];

          recordEnemyKingMoves(i, arr);

          store.dispatch({
            type: "moveSquares",
            payload: arr,
          });
        }
      }
    }

    if (/^ph/.test(activePiece) && moveSquares.includes(i)) {
      recordKnightMoves(i, checkedByPlayerArr.current, playerSquaresLive);

      switch (activePiece) {
        case "ph1":
          playerKnight1 = i;
          break;
        case "ph2":
          playerKnight2 = i;
          break;
        case "ph3":
          playerKnight3 = i;
          break;
        case "ph4":
          playerKnight4 = i;
          break;
        case "ph5":
          playerKnight5 = i;
          break;
        case "ph6":
          playerKnight6 = i;
          break;
        case "ph7":
          playerKnight7 = i;
          break;
        case "ph8":
          playerKnight8 = i;
          break;
        case "ph9":
          playerKnight9 = i;
          break;
        case "ph01":
          playerKnight01 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      pvpNewSquare.current = board[piece][1];

      if (humanOpponent) {
        addDoc(movesRef, {
          id: idToSend,
          index: moves.length,
          move: `bestmove ${pvpOldSquare.current}${pvpNewSquare.current}`,
        });
      }

      playerKnights = [
        playerKnight1,
        playerKnight2,
        playerKnight3,
        playerKnight4,
        playerKnight5,
        playerKnight6,
        playerKnight7,
        playerKnight8,
        playerKnight9,
        playerKnight01,
      ];

      moveKnight(i, activePiece);
    }

    if (/^pp/.test(activePiece) && moveSquares.includes(i)) {
      recordPlayerPawnMoves(i, activePiece, checkedByPlayerArr.current);

      switch (activePiece) {
        case "pp1":
          playerPawn1 = i;
          break;
        case "pp2":
          playerPawn2 = i;
          break;
        case "pp3":
          playerPawn3 = i;
          break;
        case "pp4":
          playerPawn4 = i;
          break;
        case "pp5":
          playerPawn5 = i;
          break;
        case "pp6":
          playerPawn6 = i;
          break;
        case "pp7":
          playerPawn7 = i;
          break;
        case "pp8":
          playerPawn8 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      pvpNewSquare.current = board[piece][1];

      if (humanOpponent) {
        addDoc(movesRef, {
          id: idToSend,
          index: moves.length,
          move: `bestmove ${pvpOldSquare.current}${pvpNewSquare.current}`,
        });
      }

      playerPawns = [
        playerPawn1,
        playerPawn2,
        playerPawn3,
        playerPawn4,
        playerPawn5,
        playerPawn6,
        playerPawn7,
        playerPawn8,
      ];

      movePawn(i, activePiece);
    }

    if (/^pb/.test(activePiece) && moveSquares.includes(i)) {
      checkArrays(blackBishopMoves, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);
      checkArrays(whiteBishopMoves, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);

      switch (activePiece) {
        case "pb1":
          playerBishop1 = i;
          break;
        case "pb2":
          playerBishop2 = i;
          break;
        case "pb3":
          playerBishop3 = i;
          break;
        case "pb4":
          playerBishop4 = i;
          break;
        case "pb5":
          playerBishop5 = i;
          break;
        case "pb6":
          playerBishop6 = i;
          break;
        case "pb7":
          playerBishop7 = i;
          break;
        case "pb8":
          playerBishop8 = i;
          break;
        case "pb9":
          playerBishop9 = i;
          break;
        case "pb01":
          playerBishop01 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      pvpNewSquare.current = board[piece][1];

      if (humanOpponent) {
        addDoc(movesRef, {
          id: idToSend,
          index: moves.length,
          move: `bestmove ${pvpOldSquare.current}${pvpNewSquare.current}`,
        });
      }

      playerBishops = [
        playerBishop1,
        playerBishop2,
        playerBishop3,
        playerBishop4,
        playerBishop5,
        playerBishop6,
        playerBishop7,
        playerBishop8,
        playerBishop9,
        playerBishop01,
      ];

      moveBishop(i, activePiece);
    }

    if (/^pr/.test(activePiece) && moveSquares.includes(i)) {
      checkArrays(rookMoves.current, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);

      switch (activePiece) {
        case "pr1":
          playerRook1 = i;
          break;
        case "pr2":
          playerRook2 = i;
          break;
        case "pr3":
          playerRook3 = i;
          break;
        case "pr4":
          playerRook4 = i;
          break;
        case "pr5":
          playerRook5 = i;
          break;
        case "pr6":
          playerRook6 = i;
          break;
        case "pr7":
          playerRook7 = i;
          break;
        case "pr8":
          playerRook8 = i;
          break;
        case "pr9":
          playerRook9 = i;
          break;
        case "pr01":
          playerRook01 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      pvpNewSquare.current = board[piece][1];

      if (humanOpponent) {
        addDoc(movesRef, {
          id: idToSend,
          index: moves.length,
          move: `bestmove ${pvpOldSquare.current}${pvpNewSquare.current}`,
        });
      }

      playerRooks = [
        playerRook1,
        playerRook2,
        playerRook3,
        playerRook4,
        playerRook5,
        playerRook6,
        playerRook7,
        playerRook8,
        playerRook9,
        playerRook01,
      ];

      moveRook(i, activePiece);
    }

    if (/^pq/.test(activePiece) && moveSquares.includes(i)) {
      checkArrays(rookMoves.current, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);
      checkArrays(blackBishopMoves, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);
      checkArrays(whiteBishopMoves, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);

      switch (activePiece) {
        case "pqw1":
        case "pqb1":
          playerQueen1 = i;
          break;
        case "pqw2":
        case "pqb2":
          playerQueen2 = i;
          break;
        case "pqw3":
        case "pqb3":
          playerQueen3 = i;
          break;
        case "pqw4":
        case "pqb4":
          playerQueen4 = i;
          break;
        case "pqw5":
        case "pqb5":
          playerQueen5 = i;
          break;
        case "pqw6":
        case "pqb6":
          playerQueen6 = i;
          break;
        case "pqw7":
        case "pqb7":
          playerQueen7 = i;
          break;
        case "pqw8":
        case "pqb8":
          playerQueen8 = i;
          break;
        case "pqw9":
        case "pqb9":
          playerQueen9 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      pvpNewSquare.current = board[piece][1];

      if (humanOpponent) {
        addDoc(movesRef, {
          id: idToSend,
          index: moves.length,
          move: `bestmove ${pvpOldSquare.current}${pvpNewSquare.current}`,
        });
      }

      playerQueens = [
        playerQueen1,
        playerQueen2,
        playerQueen3,
        playerQueen4,
        playerQueen5,
        playerQueen6,
        playerQueen7,
        playerQueen8,
        playerQueen9,
      ];

      moveQueen(i, activePiece);
    }

    if (/^pk/.test(activePiece) && moveSquares.includes(i)) {
      playerKing = i;

      updateStateBoard(i, activePiece);

      pvpNewSquare.current = board[piece][1];

      if (humanOpponent) {
        addDoc(movesRef, {
          id: idToSend,
          index: moves.length,
          move: `bestmove ${pvpOldSquare.current}${pvpNewSquare.current}`,
        });
      }

      moveKing(i, activePiece);

      kingSpiderSense(playerKing, playerSquaresLive, enemySquaresLive, playerKingSpiderSenseArr);
    }

    if (/^oh/.test(activePiece) && moveSquares.includes(i)) {
      recordKnightMoves(i, checkedByOpponentArr.current, enemySquaresLive);

      switch (activePiece) {
        case "oh1":
          enemyKnight1 = i;
          break;
        case "oh2":
          enemyKnight2 = i;
          break;
        case "oh3":
          enemyKnight3 = i;
          break;
        case "oh4":
          enemyKnight4 = i;
          break;
        case "oh5":
          enemyKnight5 = i;
          break;
        case "oh6":
          enemyKnight6 = i;
          break;
        case "oh7":
          enemyKnight7 = i;
          break;
        case "oh8":
          enemyKnight8 = i;
          break;
        case "oh9":
          enemyKnight9 = i;
          break;
        case "oh01":
          enemyKnight01 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      enemyKnights = [
        enemyKnight1,
        enemyKnight2,
        enemyKnight3,
        enemyKnight4,
        enemyKnight5,
        enemyKnight6,
        enemyKnight7,
        enemyKnight8,
        enemyKnight9,
        enemyKnight01,
      ];

      moveKnight(i, activePiece);
    }

    if (/^op/.test(activePiece) && moveSquares.includes(i)) {
      recordOpponentPawnMoves(i, activePiece, checkedByOpponentArr.current);

      switch (activePiece) {
        case "op1":
          enemyPawn1 = i;
          break;
        case "op2":
          enemyPawn2 = i;
          break;
        case "op3":
          enemyPawn3 = i;
          break;
        case "op4":
          enemyPawn4 = i;
          break;
        case "op5":
          enemyPawn5 = i;
          break;
        case "op6":
          enemyPawn6 = i;
          break;
        case "op7":
          enemyPawn7 = i;
          break;
        case "op8":
          enemyPawn8 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      enemyPawns = [enemyPawn1, enemyPawn2, enemyPawn3, enemyPawn4, enemyPawn5, enemyPawn6, enemyPawn7, enemyPawn8];

      movePawn(i, activePiece);
    }

    if (/^ob/.test(activePiece) && moveSquares.includes(i)) {
      checkArrays(whiteBishopMoves, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true);
      checkArrays(blackBishopMoves, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true);

      switch (activePiece) {
        case "ob1":
          enemyBishop1 = i;
          break;
        case "ob2":
          enemyBishop2 = i;
          break;
        case "ob3":
          enemyBishop3 = i;
          break;
        case "ob4":
          enemyBishop4 = i;
          break;
        case "ob5":
          enemyBishop5 = i;
          break;
        case "ob6":
          enemyBishop6 = i;
          break;
        case "ob7":
          enemyBishop7 = i;
          break;
        case "ob8":
          enemyBishop8 = i;
          break;
        case "ob9":
          enemyBishop9 = i;
          break;
        case "ob01":
          enemyBishop01 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      enemyBishops = [
        enemyBishop1,
        enemyBishop2,
        enemyBishop3,
        enemyBishop4,
        enemyBishop5,
        enemyBishop6,
        enemyBishop7,
        enemyBishop8,
        enemyBishop9,
        enemyBishop01,
      ];

      moveBishop(i, activePiece);
    }

    if (/^or/.test(activePiece) && moveSquares.includes(i)) {
      checkArrays(rookMoves.current, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true);

      switch (activePiece) {
        case "or1":
          enemyRook1 = i;
          break;
        case "or2":
          enemyRook2 = i;
          break;
        case "or3":
          enemyRook3 = i;
          break;
        case "or4":
          enemyRook4 = i;
          break;
        case "or5":
          enemyRook5 = i;
          break;
        case "or6":
          enemyRook6 = i;
          break;
        case "or7":
          enemyRook7 = i;
          break;
        case "or8":
          enemyRook8 = i;
          break;
        case "or9":
          enemyRook9 = i;
          break;
        case "or01":
          enemyRook01 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      enemyRooks = [
        enemyRook1,
        enemyRook2,
        enemyRook3,
        enemyRook4,
        enemyRook5,
        enemyRook6,
        enemyRook7,
        enemyRook8,
        enemyRook9,
        enemyRook01,
      ];

      moveRook(i, activePiece);
    }

    if (/^oq/.test(activePiece) && moveSquares.includes(i)) {
      checkArrays(whiteBishopMoves, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true);
      checkArrays(blackBishopMoves, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true);
      checkArrays(rookMoves.current, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true);

      switch (activePiece) {
        case "oqw1":
        case "oqb1":
          enemyQueen1 = i;
          break;
        case "oqw2":
        case "oqb2":
          enemyQueen2 = i;
          break;
        case "oqw3":
        case "oqb3":
          enemyQueen3 = i;
          break;
        case "oqw4":
        case "oqb4":
          enemyQueen4 = i;
          break;
        case "oqw5":
        case "oqb5":
          enemyQueen5 = i;
          break;
        case "oqw6":
        case "oqb6":
          enemyQueen6 = i;
          break;
        case "oqw7":
        case "oqb7":
          enemyQueen7 = i;
          break;
        case "oqw8":
        case "oqb8":
          enemyQueen8 = i;
          break;
        case "oqw9":
        case "oqb9":
          enemyQueen9 = i;
          break;
        default:
          break;
      }

      updateStateBoard(i, activePiece);

      enemyQueens = [
        enemyQueen1,
        enemyQueen2,
        enemyQueen3,
        enemyQueen4,
        enemyQueen5,
        enemyQueen6,
        enemyQueen7,
        enemyQueen8,
        enemyQueen9,
      ];

      moveQueen(i, activePiece);
    }

    if (/^ok/.test(activePiece) && moveSquares.includes(i)) {
      enemyKing = i;

      updateStateBoard(i, activePiece);

      moveKing(i, activePiece);

      kingSpiderSense(enemyKing, enemySquaresLive, playerSquaresLive, enemyKingSpiderSenseArr);
    }
  };

  return {onSquareClick};
};

export default useOnSquareClick;
