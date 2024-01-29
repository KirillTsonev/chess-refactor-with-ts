import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ISquare} from "../../interfaces/ISquare";

const initialState: ISquare = {
  checkingPiece: 0,
  pieceSquareForEngine: 0,
  playerPiece: "",
};

const squareSlice = createSlice({
  name: "behavior",
  initialState,
  reducers: {
    setCheckingPiece(state, action: PayloadAction<number>) {
      state.checkingPiece = action.payload;
    },
    setPieceSquareForEngine(state, action: PayloadAction<number>) {
      state.pieceSquareForEngine = action.payload;
    },
    setPlayerPiece(state, action: PayloadAction<string>) {
      state.playerPiece = action.payload;
    },
  },
});

export const {setCheckingPiece, setPieceSquareForEngine, setPlayerPiece} = squareSlice.actions;

export default squareSlice;
