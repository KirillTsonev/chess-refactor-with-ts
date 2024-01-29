import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IBehavior} from "../../interfaces/IBehavior";

const initialState: IBehavior = {
  darkTheme: false,
  numbers: false,
  animationSpeed: 0.2,
  coordinates: true,
  sounds: true,
  milliseconds: true,
};

const behaviorSlice = createSlice({
  name: "behavior",
  initialState,
  reducers: {
    setDarkTheme(state, action: PayloadAction<boolean>) {
      state.darkTheme = action.payload;
    },
    setNumbers(state, action: PayloadAction<boolean>) {
      state.numbers = action.payload;
    },
    setAnimationSpeed(state, action: PayloadAction<number>) {
      state.animationSpeed = action.payload;
    },
    setCoordinates(state, action: PayloadAction<boolean>) {
      state.coordinates = action.payload;
    },
    setSounds(state, action: PayloadAction<boolean>) {
      state.sounds = action.payload;
    },
    setMilliseconds(state, action: PayloadAction<boolean>) {
      state.milliseconds = action.payload;
    },
  },
});

export const {setDarkTheme, setNumbers, setAnimationSpeed, setCoordinates, setSounds, setMilliseconds} = behaviorSlice.actions;

export default behaviorSlice;
