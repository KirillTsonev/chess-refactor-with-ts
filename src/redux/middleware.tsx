import {Middleware} from "@reduxjs/toolkit";

import {Pieces, PromotionPayload} from "../interfaces/IBoard";
import {setMovePiece, setPawnMoved, promotePawn, setCastlingOpponentMoved, setCastlingPlayerMoved} from "./slices/boardSlice";

let playerQueenCounter = 2;
let playerKnightCounter = 2;
let playerBishopCounter = 2;
let playerRookCounter = 2;

let opponentQueenCounter = 2;
let opponentKnightCounter = 2;
let opponentBishopCounter = 2;
let opponentRookCounter = 2;

export const swapAndEditBoard: Middleware = (store) => (next) => (action) => {
  const func = (action: {type: string; payload: string}): {type: string; payload: {[k: string]: [number, string]}} | undefined => {
    const board: Pieces = store.getState().board.board;
    const oldSquare: number = store.getState().board.oldSquare;
    const newSquare: number = store.getState().board.newSquare;
    const newObjEntries: [string, [number, string]][] = Object.entries({...board});

    type KeyOfBoard = keyof typeof board;

    for (const value in board) {
      if (board[value as KeyOfBoard][0] === newSquare) {
        const futureSquare = Object.keys(board).find(
          (key) => JSON.stringify(board[key as KeyOfBoard]) === JSON.stringify(board[value as KeyOfBoard])
        ) as string;

        newObjEntries[oldSquare - 1][0] = futureSquare;
        newObjEntries[newSquare - 1][0] = action.payload.replace("takes", "");
      }
    }

    if (action.payload.includes("takes"))
      newObjEntries[oldSquare - 1][0] = `empty${Object.keys(board).filter((a) => /empty/.test(a)).length + 1}`;

    return {
      ...action,
      payload: Object.fromEntries(newObjEntries),
    };
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
    const filteredPawn = asArray.filter(([key]) => reg?.test(key));
    const restArr = asArray.filter(([key]) => !reg?.test(key));

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
  const func = (action: {type: string; payload: string} | {type: string; payload: {[key: string]: string | boolean}}) => {
    let castlingMoved;

    if (action.type === "castlingPlayerMoved") {
      castlingMoved = store.getState().board.castlingPlayerMoved;
    } else if (action.type === "castlingEnemyMoved") {
      castlingMoved = store.getState().board.castlingEnemyMoved;
    }

    const string = (action as {type: string; payload: string}).payload;
    let reg: RegExp;

    if (/(pk)|(ok)/.test((action as {type: string; payload: string}).payload)) {
      reg = new RegExp(string.slice(0, 2));
    } else {
      reg = new RegExp(string);
    }

    const asArray = Object.entries(castlingMoved);
    const filteredCastling = asArray.filter(([key]) => reg.test(key));
    const restArr = asArray.filter(([key]) => !reg.test(key));

    filteredCastling[0][1] = false;

    const changedObject = Object.fromEntries(restArr.concat(filteredCastling));

    return {
      ...action,
      payload: changedObject,
    };
  };

  if (setCastlingOpponentMoved.match(action) || setCastlingPlayerMoved.match(action)) {
    return next(func(action));
  } else {
    return next(action);
  }
};

export const pawnPromotion: Middleware = (store) => (next) => (action) => {
  const func = (action: PromotionPayload | {type: string; payload: Pieces}) => {
    const asArray: [string, [number, string]][] = Object.entries(store.getState().board.board);
    let piece: string = (action as PromotionPayload).payload.pieceToPromoteTo;

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

    asArray[(action as PromotionPayload).payload.i][0] = piece;

    return {
      ...action,
      payload: Object.fromEntries(asArray),
    };
  };

  if (promotePawn.match(action)) {
    return next(func(action));
  } else {
    return next(action);
  }
};
