import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ISquare} from "../../interfaces/ISquare";

const initialState: ISquare = {
  checkingPiece: 0,
};

const squareSlice = createSlice({
  name: "behavior",
  initialState,
  reducers: {
    setCheckingPiece(state, action: PayloadAction<number>) {
      state.checkingPiece = action.payload;
    },
  },
});

export const {setCheckingPiece} = squareSlice.actions;

export default squareSlice;
