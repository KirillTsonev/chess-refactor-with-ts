import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IBoard, Pieces} from "../../interfaces/IBoard";

const initialState: IBoard = {
  activePiece: "",
  oldSquare: "",
  newSquare: "",
  board: {
    or1: [1, "a8"],
    oh1: [2, "b8"],
    ob1: [3, "c8"],
    oqb1: [4, "d8"],
    okb: [5, "e8"],
    ob2: [6, "f8"],
    oh2: [7, "g8"],
    or2: [8, "h8"],
    op1: [9, "a7"],
    op2: [10, "b7"],
    op3: [11, "c7"],
    op4: [12, "d7"],
    op5: [13, "e7"],
    op6: [14, "f7"],
    op7: [15, "g7"],
    op8: [16, "h7"],
    empty1: [17, "a6"],
    empty2: [18, "b6"],
    empty3: [19, "c6"],
    empty4: [20, "d6"],
    empty5: [21, "e6"],
    empty6: [22, "f6"],
    empty7: [23, "g6"],
    empty8: [24, "h6"],
    empty9: [25, "a5"],
    empty10: [26, "b5"],
    empty11: [27, "c5"],
    empty12: [28, "d5"],
    empty13: [29, "e5"],
    empty14: [30, "f5"],
    empty15: [31, "g5"],
    empty16: [32, "h5"],
    empty17: [33, "a4"],
    empty18: [34, "b4"],
    empty19: [35, "c4"],
    empty20: [36, "d4"],
    empty21: [37, "e4"],
    empty22: [38, "f4"],
    empty23: [39, "g4"],
    empty24: [40, "h4"],
    empty25: [41, "a3"],
    empty26: [42, "b3"],
    empty27: [43, "c3"],
    empty28: [44, "d3"],
    empty29: [45, "e3"],
    empty30: [46, "f3"],
    empty31: [47, "g3"],
    empty32: [48, "h3"],
    pp1: [49, "a2"],
    pp2: [50, "b2"],
    pp3: [51, "c2"],
    pp4: [52, "d2"],
    pp5: [53, "e2"],
    pp6: [54, "f2"],
    pp7: [55, "g2"],
    pp8: [56, "h2"],
    pr1: [57, "a1"],
    ph1: [58, "b1"],
    pb1: [59, "c1"],
    pqw1: [60, "d1"],
    pkw: [61, "e1"],
    pb2: [62, "f1"],
    ph2: [63, "g1"],
    pr2: [64, "h1"],
  },
  pawnsFirstMove: {
    pp1: true,
    pp2: true,
    pp3: true,
    pp4: true,
    pp5: true,
    pp6: true,
    pp7: true,
    pp8: true,
    op1: true,
    op2: true,
    op3: true,
    op4: true,
    op5: true,
    op6: true,
    op7: true,
    op8: true,
  },
  castlingPlayerMoved: {
    pk: true,
    pr1: true,
    pr2: true,
  },
  castlingOpponentMoved: {
    ok: true,
    or1: true,
    or2: true,
  },
  moveCounter: 1,
  halfMoveCounter: 0,
  opponentKingAttacked: false,
  playerKingAttacked: false,
  highlightMove: [],
  toMove: "w",
  gameEnd: false,
  moveSquares: [],
  pieceSquare: "",
  moveVar: [0, 0],
  modalOpen: false,
  newGame: false,
  endMessage: "",
  checkArrPlayer: [],
  checkArrOpponent: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    checkArrPlayer(state, action: PayloadAction<string>) {
      state.checkArrPlayer = [...state.checkArrPlayer, action.payload];
    },
    checkArrOpponent(state, action: PayloadAction<string>) {
      state.checkArrPlayer = [...state.checkArrOpponent, action.payload];
    },
    resetBoard(state) {
      state.board = initialState.board;
    },
    showEndMessage(state, action: PayloadAction<string>) {
      state.endMessage = action.payload;
    },
    setBoard(state, action: PayloadAction<Pieces>) {
      state.board = action.payload;
    },
    startNewGame(state) {
      state.newGame = true;
    },
    openModal(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
    setMovePiece(state, action: PayloadAction<Pieces>) {
      state.board = action.payload;
    },
    setMoveVar(state, action: PayloadAction<number[]>) {
      state.moveVar = action.payload;
    },
    setPieceSquare(state, action: PayloadAction<string>) {
      state.pieceSquare = action.payload;
    },
    setMoveSquares(state, action: PayloadAction<string[]>) {
      state.moveSquares = action.payload;
    },
    endGame(state) {
      state.gameEnd = true;
      state.moveSquares = [];
      state.pieceSquare = "";
    },
    setToMove(state, action: PayloadAction<string>) {
      state.toMove = action.payload;
    },
    highlightMove(state, action: PayloadAction<string>) {
      state.highlightMove = [...state.highlightMove, action.payload];
    },
    promotePawn(state, action: PayloadAction<Pieces>) {
      state.board = action.payload;
    },
    incrementHalfMoveCounter(state) {
      state.halfMoveCounter = state.halfMoveCounter + 1;
    },
    resetHalfMoveCounter(state) {
      state.halfMoveCounter = 0;
    },
    setOpponentKingAttacked(state, action: PayloadAction<boolean>) {
      state.opponentKingAttacked = action.payload;
    },
    setPlayerKingAttacked(state, action: PayloadAction<boolean>) {
      state.playerKingAttacked = action.payload;
    },
    setActivePiece(state, action: PayloadAction<string>) {
      state.activePiece = action.payload;
    },
    setOldSquare(state, action: PayloadAction<string>) {
      state.oldSquare = action.payload;
    },
    setNewSquare(state, action: PayloadAction<string>) {
      state.newSquare = action.payload;
    },
    setPawnMoved(state, action: PayloadAction<{[key: string]: string}>) {
      state.pawnsFirstMove = {
        ...state.pawnsFirstMove,
        ...action.payload,
      };
    },
    setCastlingPlayerMoved(state, action: PayloadAction<{[key: string]: string}>) {
      state.castlingPlayerMoved = {
        ...state.castlingPlayerMoved,
        ...action.payload,
      };
    },
    setCastlingOpponentMoved(state, action: PayloadAction<{[key: string]: boolean}>) {
      state.castlingOpponentMoved = {
        ...state.castlingOpponentMoved,
        ...action.payload,
      };
    },
    incrementMoveCounter(state) {
      state.moveCounter = state.moveCounter + 1;
    },
  },
});

export const {
  checkArrPlayer,
  checkArrOpponent,
  resetBoard,
  showEndMessage,
  setBoard,
  startNewGame,
  openModal,
  setMovePiece,
  setMoveVar,
  setPieceSquare,
  setMoveSquares,
  endGame,
  setToMove,
  highlightMove,
  promotePawn,
  incrementHalfMoveCounter,
  resetHalfMoveCounter,
  setOpponentKingAttacked,
  setPlayerKingAttacked,
  setActivePiece,
  setOldSquare,
  setNewSquare,
  setPawnMoved,
  setCastlingPlayerMoved,
  setCastlingOpponentMoved,
  incrementMoveCounter,
} = boardSlice.actions;

export default boardSlice;
