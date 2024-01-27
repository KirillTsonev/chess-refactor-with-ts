import {useMemo} from "react";

import {BoardContainer, Square} from "../theme/customComponents";

const Board = (): JSX.Element => {
  const squares: string[][] = useMemo(() => {
    const arr: string[][] = [];

    for (let i = 0; i < 8; i++) {
      arr.push([]);

      for (let j = 0; j < 8; j++) {
        if ((j + i) % 2 == 0) {
          arr[i].push("w");
        } else {
          arr[i].push("b");
        }
      }
    }

    return arr;
  }, []);

  return (
    <BoardContainer>
      {squares.map((array: string[]) =>
        array.map(
          (a: string, i: number): JSX.Element => (
            <Square
              key={a + i}
              background={a === "w" ? "#ecebe1" : "#7c5409"}
              color={a === "w" ? "" : "white"}
            ></Square>
          )
        )
      )}
    </BoardContainer>
  );
};

export default Board;
