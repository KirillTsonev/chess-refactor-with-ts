import useKingEightStar from "./useKingEightStar";
import useUtils from "./useUtils";
import useAllSelectors from "../hooks/useAllSelectors";
import useConstants from "./useConstants";
import {PawnsFirstMove} from "../interfaces/IBoard";

const useRecordPlayerPawnMoves = () => {
  const {kingEightStar} = useKingEightStar();
  const {pieces, playerSquaresRender, opponentSquaresRender, occupiedSquaresRender} = useUtils();
  const {color, sandbox, pawnsFirstMove, checkingPiece, playerKingAttacked, enPassantSquare} = useAllSelectors();
  const {rookMoves, knightLimits} = useConstants();

  const playerEightStarXray = kingEightStar({
    index: pieces(/pk/)[0],
    ownSquares: playerSquaresRender(),
    oppSquares: opponentSquaresRender(),
    boolean: false,
  });

  const playerEightStar = kingEightStar({
    index: pieces(/pk/)[0],
    ownSquares: playerSquaresRender(),
    oppSquares: opponentSquaresRender(),
    boolean: true,
  });

  function recordPlayerPawnMoves(i: number, piece: string) {
    let arr: number[] = [];
    let arr2: number[] = [];

    for (let k = 0; k < 4; k++) {
      if (
        playerEightStarXray[k].includes(i) &&
        (pieces(/or/).some((a) => playerEightStarXray[k].includes(a)) || pieces(/oq/).some((a) => playerEightStarXray[k].includes(a)))
      ) {
        arr2 = playerEightStarXray[k];
      }
    }

    for (let k = 4; k < 8; k++) {
      if (
        playerEightStarXray[k].includes(i) &&
        (pieces(/ob/).some((a) => playerEightStarXray[k].includes(a)) || pieces(/oq/).some((a) => playerEightStarXray[k].includes(a)))
      ) {
        arr2 = playerEightStarXray[k];
      }
    }

    if (color === "black" && !sandbox) {
      if (pawnsFirstMove[piece as keyof PawnsFirstMove]) {
        arr = [i + 8, i + 16];
      } else {
        arr = [i + 8];
      }

      if (occupiedSquaresRender().includes(i + 8)) {
        arr = [];
      } else if (occupiedSquaresRender().includes(i + 16)) {
        arr = [i + 8];
      }

      if (
        (opponentSquaresRender().includes(i + 9) || (rookMoves()[4].includes(i) && i + 9 === enPassantSquare[0])) &&
        !knightLimits()[3].includes(i)
      ) {
        arr.push(i + 9);
      }

      if (
        (opponentSquaresRender().includes(i + 7) || (rookMoves()[4].includes(i) && i + 7 === enPassantSquare[0])) &&
        !knightLimits()[0].includes(i)
      ) {
        arr.push(i + 7);
      }
    } else {
      if (pawnsFirstMove[piece as keyof PawnsFirstMove]) {
        arr = [i - 8, i - 16];
      } else {
        arr = [i - 8];
      }

      if (occupiedSquaresRender().includes(i - 8)) {
        arr = [];
      } else if (occupiedSquaresRender().includes(i - 16)) {
        arr = [i - 8];
      }

      if (
        (opponentSquaresRender().includes(i - 9) || (rookMoves()[3].includes(i) && i - 9 === enPassantSquare[0])) &&
        !knightLimits()[0].includes(i)
      ) {
        arr.push(i - 9);
      }

      if (
        (opponentSquaresRender().includes(i - 7) || (rookMoves()[3].includes(i) && i - 7 === enPassantSquare[0])) &&
        !knightLimits()[3].includes(i)
      ) {
        arr.push(i - 7);
      }
    }

    if (arr2.filter((a) => playerSquaresRender().includes(a)).length === 1) {
      arr = arr.filter((a) => arr2.includes(a));
    }

    // if (store.getState().board.playerKingAttacked && playerEightStar.flat().includes(checkingPiece)) {
    if (playerKingAttacked && playerEightStar.flat().includes(checkingPiece)) {
      const arrTech = playerEightStar.filter((a) => a.includes(checkingPiece)).flat();

      arr = arr.filter((a) => arrTech.includes(a));
    } else if (
      // store.getState().board.playerKingAttacked &&
      playerKingAttacked &&
      !playerEightStar.flat().includes(checkingPiece) &&
      arr.includes(checkingPiece)
    ) {
      arr = [checkingPiece];
      // } else if (store.getState().board.playerKingAttacked) {
    } else if (playerKingAttacked) {
      arr = [];
    }

    return arr;
  }

  return {recordPlayerPawnMoves};
};

export default useRecordPlayerPawnMoves;
