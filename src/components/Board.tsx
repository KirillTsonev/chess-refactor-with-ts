import {BoardContainer, Square, OpponentSquare, LastMadeMove, Typography, ActiveSquare} from "../theme/customComponents";
import useUtils from "../logic/useUtils";
import useAllSelectors from "../hooks/useAllSelectors";

const Board = (): JSX.Element => {
  const {pieceSquare, moveSquares, coordinates, currentMove, color, sandbox, highlightMove} = useAllSelectors();
  const {occupiedSquaresRender} = useUtils();

  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

  function renderBoard() {
    const arr = [];

    for (let i = 0; i < 64; i++) {
      const isEven = (n: number) => n % 2 === 0;
      const rank = isEven(Math.floor(i / 8));
      const file = isEven(i % 8);
      const condition = (rank && !file) || (!rank && file);

      arr.push(
        <Square
          key={i}
          background={i + 1 === pieceSquare ? "#17ce2980" : condition ? "#7c5409" : "#ecebe1"}
          color={condition ? "" : "white"}
        >
          {moveSquares.includes(i + 1) && !occupiedSquaresRender().includes(i + 1) && <ActiveSquare />}
          {moveSquares.includes(i + 1) && occupiedSquaresRender().includes(i + 1) && (
            <OpponentSquare>
              <div />
            </OpponentSquare>
          )}
          {(highlightMove.slice(-1)[0] === i + 1 && !currentMove) || (currentMove && highlightMove[currentMove - 1] === i + 1) ? (
            <LastMadeMove />
          ) : null}
          {coordinates && color === "black" && !sandbox && (
            <Typography
              rotate="rotate(180deg)"
              bottom="1px"
              left="5px"
            >
              {letters[i]}
            </Typography>
          )}
          {coordinates && color === "white" && i > 55 && (
            <Typography
              bottom="1px"
              left="5px"
            >
              {letters[i - 56]}
            </Typography>
          )}
          {coordinates && color === "black" && sandbox && <Typography>{letters[7 - i]}</Typography>}
          {coordinates && (i + 1) % 8 === 0 && color === "white" && (
            <Typography
              top="1px"
              right="5px"
            >
              {(i + 1) / 8}
            </Typography>
          )}
          {coordinates && i + 57 === 64 && color === "white" && (
            <Typography
              top="1px"
              right="5px"
            >
              1
            </Typography>
          )}
          {coordinates && i + 57 === 64 && color === "black" && sandbox && (
            <Typography
              top="1px"
              right="5px"
            >
              8
            </Typography>
          )}
          {coordinates && i === 0 && color === "black" && !sandbox && (
            <Typography
              bottom="1px"
              left="5px"
              rotate="rotate(180deg)"
            >
              1
            </Typography>
          )}
          {coordinates && i + 1 === 8 && color === "black" && sandbox && (
            <Typography
              top="1px"
              right="5px"
            >
              1
            </Typography>
          )}
          {coordinates && i % 8 === 0 && color === "black" && !sandbox && (
            <Typography
              bottom="1px"
              left="5px"
              rotate="rotate(180deg)"
            >
              {i % 8}
            </Typography>
          )}
        </Square>
      );
    }

    return arr;
  }

  return <BoardContainer>{renderBoard()}</BoardContainer>;
};

export default Board;
