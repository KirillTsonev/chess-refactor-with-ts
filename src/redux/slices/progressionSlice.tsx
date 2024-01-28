import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IProgression} from "../../interfaces/IProgression";

const initialState: IProgression = {
  moveNumbers: [1],
  moves: [],
  currentMove: "",
  notationArr: [],
  pieceGainPlayer: [],
  pieceGainOpponent: [],
};

const progressionSlice = createSlice({
  name: "progression",
  initialState,
  reducers: {
    setMoveNumbers(state) {
      state.moveNumbers = [...state.moveNumbers, state.moveNumbers.length + 1];
    },
    setMoves(state, action: PayloadAction<string>) {
      state.moves = [...state.moves, action.payload];
    },
    setCurrentMove(state, action: PayloadAction<string>) {
      state.currentMove = action.payload;
    },
    setNotationArr(state, action: PayloadAction<string>) {
      state.notationArr = [...state.notationArr, action.payload];
    },
    setPieceGainPlayer(state, action: PayloadAction<string>) {
      state.pieceGainPlayer = [...state.pieceGainPlayer, action.payload];
    },
    setPieceGainOpponent(state, action: PayloadAction<string>) {
      state.pieceGainOpponent = [...state.pieceGainOpponent, action.payload];
    },
  },
});

export const {setMoveNumbers, setCurrentMove, setMoves, setNotationArr, setPieceGainOpponent, setPieceGainPlayer} =
  progressionSlice.actions;

export default progressionSlice;
