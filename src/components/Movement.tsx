const Movement = () => {
  let arr = [0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="movementGrid">
      <div
        className="pawnPromotionOverlay"
        style={pawnPromotes ? {display: "block"} : {display: "none"}}
      ></div>

      {arr.map((a, i) => (
        <div
          key={i + 1 * 100}
          onClick={() => onSquareClick(i + 1, boardEntries[i][0])}
          className="movementSquare"
        >
          {numbers ? i + 1 : ""}
          {moveSquares.includes(i + 1) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </div>
      ))}

      {arr.map((a, i) => (
        <div
          key={i + 9 * 100}
          onClick={() => onSquareClick(i + 9, boardEntries[i + 8][0])}
          className="movementSquare"
        >
          {numbers ? i + 9 : ""}
          {moveSquares.includes(i + 9) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </div>
      ))}

      {arr.map((a, i) => (
        <div
          key={i + 17 * 100}
          onClick={() => onSquareClick(i + 17, boardEntries[i + 16][0])}
          className="movementSquare"
        >
          {numbers ? i + 17 : ""}
          {moveSquares.includes(i + 17) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </div>
      ))}

      {arr.map((a, i) => (
        <div
          key={i + 25 * 100}
          onClick={() => onSquareClick(i + 25, boardEntries[i + 24][0])}
          className="movementSquare"
        >
          {numbers ? i + 25 : ""}
          {moveSquares.includes(i + 25) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </div>
      ))}

      {arr.map((a, i) => (
        <div
          key={i + 33 * 100}
          onClick={() => onSquareClick(i + 33, boardEntries[i + 32][0])}
          className="movementSquare"
        >
          {numbers ? i + 33 : ""}
          {moveSquares.includes(i + 33) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </div>
      ))}

      {arr.map((a, i) => (
        <div
          key={i + 41 * 100}
          onClick={() => onSquareClick(i + 41, boardEntries[i + 40][0])}
          className="movementSquare"
        >
          {numbers ? i + 41 : ""}
          {moveSquares.includes(i + 41) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </div>
      ))}

      {arr.map((a, i) => (
        <div
          key={i + 49 * 100}
          onClick={() => onSquareClick(i + 49, boardEntries[i + 48][0])}
          className="movementSquare"
        >
          {numbers ? i + 49 : ""}
          {moveSquares.includes(i + 49) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </div>
      ))}

      {arr.map((a, i) => (
        <div
          key={i + 57 * 100}
          onClick={() => onSquareClick(i + 57, boardEntries[i + 56][0])}
          className="movementSquare"
        >
          {numbers ? i + 57 : ""}
          {moveSquares.includes(i + 57) ? (
            <div className="highlightSquare">
              <div></div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Movement;
