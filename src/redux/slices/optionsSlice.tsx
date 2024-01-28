import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IOptions} from "../../interfaces/IOoptions";

const initialState: IOptions = {
  sandbox: "",
  skillLevel: "",
  depth: "",
  millisecondsTime: "",
  color: "white",
  time: 0,
  increment: 0,
  options: true,
  humanOpponent: "",
  idToSend: "",
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setSandbox(state, action: PayloadAction<string>) {
      state.sandbox = action.payload;
    },
    setSkillLevel(state, action: PayloadAction<string>) {
      state.skillLevel = action.payload;
    },
    setDepth(state, action: PayloadAction<string>) {
      state.depth = action.payload;
    },
    setMillisecondsTime(state, action: PayloadAction<string>) {
      state.millisecondsTime = action.payload;
    },
    setColor(state, action: PayloadAction<string>) {
      state.millisecondsTime = action.payload;
    },
    setTime(state, action: PayloadAction<number>) {
      state.time = action.payload;
    },
    setIncrement(state, action: PayloadAction<number>) {
      state.increment = action.payload;
    },
    setOptionsOff(state, action: PayloadAction<boolean>) {
      state.options = action.payload;
    },
    setHumanOpponent(state, action: PayloadAction<string>) {
      state.humanOpponent = action.payload;
    },
    setIdToSend(state, action: PayloadAction<string>) {
      state.idToSend = action.payload;
    },
  },
});

export const {
  setSandbox,
  setIdToSend,
  setSkillLevel,
  setDepth,
  setMillisecondsTime,
  setColor,
  setTime,
  setIncrement,
  setHumanOpponent,
  setOptionsOff,
} = optionsSlice.actions;

export default optionsSlice;
