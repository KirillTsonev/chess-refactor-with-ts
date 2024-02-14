import useAllSelectors from "../hooks/useAllSelectors";
import {store} from "../redux/store";

const useUtils = () => {
  const {board} = useAllSelectors();

  function liveBoard() {
    return store.getState().board.board;
  }

  function boardEntries() {
    return Object.entries(board);
  }

  function filteredOpponentRender() {
    return boardEntries().filter(([key]) => /^o/.test(key));
  }
  function filteredOpponentLive() {
    return Object.entries(store.getState().board.board).filter(([key]) => /^o/.test(key));
  }
  function justOpponentRender() {
    return Object.fromEntries(filteredOpponentRender());
  }
  function justOpponentLive() {
    return Object.fromEntries(filteredOpponentLive());
  }

  function filteredPlayerRender() {
    return boardEntries().filter(([key]) => /^p/.test(key));
  }
  function filteredPlayerLive() {
    return Object.entries(store.getState().board.board).filter(([key]) => /^p/.test(key));
  }
  function justPlayerRender() {
    return Object.fromEntries(filteredPlayerRender());
  }
  function justPlayerLive() {
    return Object.fromEntries(filteredPlayerLive());
  }

  function filteredOccupiedRender() {
    return boardEntries().filter(([key]) => !/empty/.test(key));
  }
  function filteredOccupiedLive() {
    return Object.entries(store.getState().board.board).filter(([key]) => !/empty/.test(key));
  }
  function justOccupiedRender() {
    return Object.fromEntries(filteredOccupiedRender());
  }
  function justOccupiedLive() {
    return Object.fromEntries(filteredOccupiedLive());
  }

  function opponentSquaresRender() {
    return Object.values(justOpponentRender()).map((a) => a[0]);
  }
  function playerSquaresRender() {
    return Object.values(justPlayerRender()).map((a) => a[0]);
  }
  function occupiedSquaresRender() {
    return Object.values(justOccupiedRender()).map((a) => a[0]);
  }

  function opponentSquaresLive() {
    return Object.values(justOpponentLive()).map((a) => a[0]);
  }
  function playerSquaresLive() {
    return Object.values(justPlayerLive()).map((a) => a[0]);
  }
  function occupiedSquaresLive() {
    return Object.values(justOccupiedLive()).map((a) => a[0]);
  }

  function pieces(regex: RegExp) {
    return boardEntries()
      .filter((a) => regex.test(a[0]))
      .map((a) => a[1][0]);
  }

  return {
    liveBoard,
    opponentSquaresLive,
    opponentSquaresRender,
    playerSquaresLive,
    playerSquaresRender,
    occupiedSquaresLive,
    occupiedSquaresRender,
    boardEntries,
    pieces,
  };
};

export default useUtils;
