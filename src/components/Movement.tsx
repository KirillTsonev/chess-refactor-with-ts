import {Box} from "@mui/material";

import useAllSelectors from "../hooks/useAllSelectors";
import useOnSquareClick from "../logic/useOnSquareClick";
import useUtils from "../logic/useUtils";
import {MovementSquare} from "../theme/customComponents";

const Movement = () => {
  const arr = [0, 0, 0, 0, 0, 0, 0, 0];

  const {pawnPromotes, numbers, moveSquares} = useAllSelectors();
  const {onSquareClick} = useOnSquareClick();
  const {boardEntries} = useUtils();

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

        color: "orange",
        fontSize: "30px",
        userSelect: "none",
        fontWeight: 700,
      }}
    >
      <div
        className="pawnPromotionOverlay"
        style={pawnPromotes ? {display: "block"} : {display: "none"}}
      ></div>

      {arr.map((_, i) => (
        <MovementSquare
          key={i + 1 * 100}
          onClick={() => onSquareClick(i + 1, boardEntries()[i][0])}
        >
          {numbers ? i + 1 : ""}
          {moveSquares.includes(i + 1) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </MovementSquare>
      ))}

      {arr.map((_, i) => (
        <MovementSquare
          key={i + 9 * 100}
          onClick={() => onSquareClick(i + 9, boardEntries()[i + 8][0])}
        >
          {numbers ? i + 9 : ""}
          {moveSquares.includes(i + 9) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </MovementSquare>
      ))}

      {arr.map((_, i) => (
        <MovementSquare
          key={i + 17 * 100}
          onClick={() => onSquareClick(i + 17, boardEntries()[i + 16][0])}
        >
          {numbers ? i + 17 : ""}
          {moveSquares.includes(i + 17) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </MovementSquare>
      ))}

      {arr.map((_, i) => (
        <MovementSquare
          key={i + 25 * 100}
          onClick={() => onSquareClick(i + 25, boardEntries()[i + 24][0])}
        >
          {numbers ? i + 25 : ""}
          {moveSquares.includes(i + 25) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </MovementSquare>
      ))}

      {arr.map((_, i) => (
        <MovementSquare
          key={i + 33 * 100}
          onClick={() => onSquareClick(i + 33, boardEntries()[i + 32][0])}
        >
          {numbers ? i + 33 : ""}
          {moveSquares.includes(i + 33) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </MovementSquare>
      ))}

      {arr.map((_, i) => (
        <MovementSquare
          key={i + 41 * 100}
          onClick={() => onSquareClick(i + 41, boardEntries()[i + 40][0])}
        >
          {numbers ? i + 41 : ""}
          {moveSquares.includes(i + 41) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </MovementSquare>
      ))}

      {arr.map((_, i) => (
        <MovementSquare
          key={i + 49 * 100}
          onClick={() => onSquareClick(i + 49, boardEntries()[i + 48][0])}
        >
          {numbers ? i + 49 : ""}
          {moveSquares.includes(i + 49) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </MovementSquare>
      ))}

      {arr.map((_, i) => (
        <MovementSquare
          key={i + 57 * 100}
          onClick={() => onSquareClick(i + 57, boardEntries()[i + 56][0])}
        >
          {numbers ? i + 57 : ""}
          {moveSquares.includes(i + 57) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </MovementSquare>
      ))}
    </Box>
  );
};

export default Movement;
