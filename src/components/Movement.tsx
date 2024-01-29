import {Box} from "@mui/material";

import useAllSelectors from "../hooks/useAllSelectors";
import useOnSquareClick from "../logic/useOnSquareClick";
import useUtils from "../logic/useUtils";
import {MovementSquare, HighlightSquare} from "../theme/customComponents";

const Movement = () => {
  const {pawnPromotes, numbers, moveSquares} = useAllSelectors();
  const {onSquareClick} = useOnSquareClick();
  const {boardEntries} = useUtils();

  function renderMovement() {
    const arr = [];

    for (let i = 1; i < 65; i++) {
      arr.push(
        <MovementSquare
          key={i}
          onClick={() => onSquareClick(i, boardEntries()[i - 1][0])}
        >
          {numbers && i}
          {moveSquares.includes(i) && (
            <HighlightSquare>
              <div />
            </HighlightSquare>
          )}
        </MovementSquare>
      );
    }

    return arr;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        width: "720px",
        height: "720px",
        left: "calc(50% - 360px)",
        top: 0,
        display: "flex",
        flexWrap: "wrap",

        // color: "orange",
        // fontSize: "30px",
        // userSelect: "none",
        // fontWeight: 700,
      }}
    >
      <Box
        sx={{
          background: "#00000068",
          width: "100%",
          height: "100%",
          position: "absolute",
          display: pawnPromotes ? "block" : "none",
        }}
      />
      {renderMovement()}
    </Box>
  );
};

export default Movement;
