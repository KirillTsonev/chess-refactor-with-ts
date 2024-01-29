import {Middleware} from "@reduxjs/toolkit";

import {setMovePiece, setPawnMoved} from "./slices/boardSlice";

let playerQueenCounter = 2;
let playerKnightCounter = 2;
let playerBishopCounter = 2;
let playerRookCounter = 2;

let opponentQueenCounter = 2;
let opponentKnightCounter = 2;
let opponentBishopCounter = 2;
let opponentRookCounter = 2;

export const swapAndEditBoard: Middleware = (store) => (next) => (action) => {
  const func = (action: {
    type: string;
    payload: unknown;
  }): {type: string; payload: {[k: string]: [number, string]}} | undefined => {
    const board = store.getState().board.board;
    const oldSquare = store.getState().board.oldSquare;
    const newSquare = store.getState().board.newSquare;
    const asArray: [string, [number, string]][] = Object.entries(board);

    const swapElements = (array: [string, [number, string]][], index1: number, index2: number) => {
      [array[index1 - 1][0], array[index2 - 1][0]] = [array[index2 - 1][0], array[index1 - 1][0]];
    };

    try {
      swapElements(asArray, oldSquare, newSquare);
      asArray[oldSquare - 1][1] = oldSquare;
      asArray[newSquare - 1][1] = newSquare;

      if (action.payload === "takes") {
        asArray[oldSquare - 1][0] = `empty${Object.keys(board).filter((a) => /empty/.test(a)).length + 1}`;
      }

      const swapped = Object.fromEntries(asArray);

      return {
        ...action,
        payload: swapped,
      };
    } catch (error) {
      console.error(error);
    }
  };

  if (setMovePiece.match(action)) {
    return next(func(action));
  } else {
    return next(action);
  }
};

export const checkPieceMoved: Middleware = (store) => (next) => (action) => {
  const func = (action: {type: string; payload: unknown}) => {
    const pawnsFirstMove = store.getState().board.pawnsFirstMove;
    const string = typeof action.payload === "string" ? action.payload : null;
    const reg = string ? new RegExp(string) : null;
    const asArray = Object.entries(pawnsFirstMove);
    const filteredPawn = asArray.filter(([key, value]) => reg?.test(key));
    const restArr = asArray.filter(([key, value]) => !reg?.test(key));

    filteredPawn[0][1] = false;

    const changedObject = Object.fromEntries(restArr.concat(filteredPawn));

    return {
      ...action,
      payload: changedObject,
    };
  };

  if (setPawnMoved.match(action)) {
    return next(func(action));
  } else {
    return next(action);
  }
};

export const checkCastlingMoved: Middleware = (store) => (next) => (action) => {
  const func = (action) => {
    let castlingMoved;

    if (action.type === "castlingPlayerMoved") {
      castlingMoved = store.getState().board.castlingPlayerMoved;
    } else if (action.type === "castlingEnemyMoved") {
      castlingMoved = store.getState().board.castlingEnemyMoved;
    }

    const string = action.payload;
    let reg: RegExp;

    if (/(pk)|(ok)/.test(action.payload)) {
      reg = new RegExp(string.slice(0, 2));
    } else {
      reg = new RegExp(string);
    }

    const asArray = Object.entries(castlingMoved);
    const filteredCastling = asArray.filter(([key, value]) => reg.test(key));
    const restArr = asArray.filter(([key, value]) => !reg.test(key));

    filteredCastling[0][1] = false;

    const changedObject = Object.fromEntries(restArr.concat(filteredCastling));

    return {
      ...action,
      payload: changedObject,
    };
  };

  if (action.type === "castlingPlayerMoved" || action.type === "castlingEnemyMoved") {
    return next(func(action));
  } else {
    return next(action);
  }
};

export const pawnPromotion: Middleware = (store) => (next) => (action) => {
  const func = (action) => {
    const asArray = Object.entries(store.getState().board.board);
    let piece = action.payload.pieceToPromoteTo;

    switch (piece.slice(0, 2)) {
      case "pq":
        playerQueenCounter++;
        piece += playerQueenCounter;
        break;
      case "pr":
        playerRookCounter++;
        piece += playerRookCounter;
        break;
      case "pb":
        playerBishopCounter++;
        piece += playerBishopCounter;
        break;
      case "ph":
        playerKnightCounter++;
        piece += playerKnightCounter;
        break;
      case "oq":
        opponentQueenCounter++;
        piece += opponentQueenCounter;
        break;
      case "or":
        opponentRookCounter++;
        piece += opponentRookCounter;
        break;
      case "ob":
        opponentBishopCounter++;
        piece += opponentBishopCounter;
        break;
      case "oh":
        opponentKnightCounter++;
        piece += opponentKnightCounter;
        break;
      default:
        break;
    }

    asArray[action.payload.i][0] = piece;

    return {
      ...action,
      payload: Object.fromEntries(asArray),
    };
  };

  if (action.type === "pawnPromotion") {
    return next(func(action));
  } else {
    return next(action);
  }
};
