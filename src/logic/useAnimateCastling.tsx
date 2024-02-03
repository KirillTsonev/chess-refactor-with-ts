import {useDispatch} from "react-redux";

import castlingSoundFile from "../assets/sounds/castling.ogg";
import useAllSelectors from "../hooks/useAllSelectors";
import {
  setOldSquare,
  setNewSquare,
  setMoveVar,
  moveNumbers,
  setToMove,
  setOpponentKingAttacked,
  setPlayerKingAttacked,
} from "../redux/slices/boardSlice";

const useAnimateCastling = () => {
  const dispatch = useDispatch();
  const castlingSound = new Audio(castlingSoundFile);

  const {sounds, color, sandbox} = useAllSelectors();

  function animateCastling({
    coor1,
    coor2,
    rookOldSq,
    newSqRook,
    rookToMove,
  }: {
    coor1: number;
    coor2: number;
    rookOldSq: number;
    newSqRook: number;
    rookToMove: string;
  }) {
    if (sounds) castlingSound.play();

    if (color === "black" && sandbox) {
      dispatch(setMoveVar([coor1, coor2]));

      if (/or/.test(rookToMove)) {
        dispatch(setOldSquare(rookOldSq));

        store.dispatch({
          type: "newSquare",
          payload: newSqRook - 1,
        });
      } else {
        store.dispatch({
          type: "oldSquare",
          payload: rookOldSq,
        });
        store.dispatch({
          type: "newSquare",
          payload: newSqRook - 1,
        });
      }
    } else if (color === "black" && !sandbox) {
      store.dispatch({
        type: "setMoveVar",
        payload: [coor1 * -1, coor2 * -1],
      });

      if (/or/.test(rookToMove)) {
        store.dispatch({
          type: "oldSquare",
          payload: rookOldSq + 56,
        });
        store.dispatch({
          type: "newSquare",
          payload: newSqRook + 56,
        });
      } else {
        store.dispatch({
          type: "oldSquare",
          payload: rookOldSq - 56,
        });
        store.dispatch({
          type: "newSquare",
          payload: newSqRook - 56,
        });
      }
    } else {
      store.dispatch({
        type: "setMoveVar",
        payload: [coor1, coor2],
      });

      store.dispatch({
        type: "oldSquare",
        payload: rookOldSq,
      });

      store.dispatch({
        type: "newSquare",
        payload: newSqRook,
      });
    }

    store.dispatch({
      type: rookToMove,
    });

    if ((color === "white" && toMove === "w") || (color === "black" && toMove === "w")) {
      store.dispatch({
        type: "moveNumbers",
      });
    }

    // recordBoard();

    if (/^pr/.test(rookToMove)) {
      if (
        playerRooks.some((a) => enemyKingSpiderSenseArr.current[1].includes(a)) &&
        occupiedSquaresLive.filter((a) => !playerSquaresLive.includes(a)).every((a) => !enemyKingSpiderSenseArr.current[1].includes(a))
      ) {
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "enemyKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrOpponent",
          payload: moves.length,
        });
      }
    } else {
      if (
        enemyRooks.some((a) => playerKingSpiderSenseArr.current[1].includes(a)) &&
        occupiedSquaresLive.filter((a) => !enemySquaresLive.includes(a)).every((a) => !playerKingSpiderSenseArr.current[1].includes(a))
      ) {
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "playerKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrPlayer",
          payload: moves.length,
        });
      }
    }

    store.dispatch({
      type: "moveSquares",
      payload: [],
    });

    store.dispatch({
      type: "pieceSquare",
      payload: null,
    });

    if (color === "white") {
      if (/^pr/.test(rookToMove)) {
        store.dispatch({
          type: "toMove",
          payload: "b",
        });
      } else {
        store.dispatch({
          type: "toMove",
          payload: "w",
        });
      }
    } else {
      if (/^or/.test(rookToMove)) {
        store.dispatch({
          type: "toMove",
          payload: "b",
        });
      } else {
        store.dispatch({
          type: "toMove",
          payload: "w",
        });
      }
    }

    store.dispatch({
      type: "recordMoves",
      payload: JSON.stringify(store.getState().board.board),
    });
  }

  return {animateCastling};
};

export default useAnimateCastling;
