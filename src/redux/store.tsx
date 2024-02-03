import {configureStore, combineReducers} from "@reduxjs/toolkit";

import boardSlice from "./slices/boardSlice";
import behaviorSlice from "./slices/behaviorSlice";
import optionsSlice from "./slices/optionsSlice";
import progressionSlice from "./slices/progressionSlice";
import squareSlice from "./slices/squareSlice";
import {swapAndEditBoard, checkPieceMoved, checkCastlingMoved, pawnPromotion} from "./middleware";

const rootReducer = combineReducers({
  board: boardSlice.reducer,
  behavior: behaviorSlice.reducer,
  options: optionsSlice.reducer,
  progression: progressionSlice.reducer,
  square: squareSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapAndEditBoard).concat(checkPieceMoved).concat(checkCastlingMoved).concat(pawnPromotion),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
