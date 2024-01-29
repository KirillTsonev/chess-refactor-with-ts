const useConstants = () => {
  function knightLimits() {
    const knightLimits: number[][] = [[], [], [], []];

    for (let i = 1; i < 64; i += 8) {
      knightLimits[0].push(i);
      knightLimits[1].push(i + 1);
      knightLimits[2].push(i + 6);
      knightLimits[3].push(i + 7);
    }

    return knightLimits;
  }

  function rookMoves() {
    const rookMoves: number[][] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

    for (let i = 1; i < 9; i++) {
      rookMoves[0].push(i);
      rookMoves[1].push(i + 8);
      rookMoves[2].push(i + 16);
      rookMoves[3].push(i + 24);
      rookMoves[4].push(i + 32);
      rookMoves[5].push(i + 40);
      rookMoves[6].push(i + 48);
      rookMoves[7].push(i + 56);
    }

    for (let i = 1; i < 65; i += 8) {
      rookMoves[8].push(i);
      rookMoves[9].push(i + 1);
      rookMoves[10].push(i + 2);
      rookMoves[11].push(i + 3);
      rookMoves[12].push(i + 4);
      rookMoves[13].push(i + 5);
      rookMoves[14].push(i + 6);
      rookMoves[15].push(i + 7);
    }

    return rookMoves;
  }

  function whiteBishopMoves() {
    return [
      [7, 16],
      [5, 14, 23, 32],
      [3, 12, 21, 30, 39, 48],
      [1, 10, 19, 28, 37, 46, 55, 64],
      [17, 26, 35, 44, 53, 62],
      [33, 42, 51, 60],
      [49, 58],
      [3, 10, 17],
      [5, 12, 19, 26, 33],
      [7, 14, 21, 28, 35, 42, 49],
      [16, 23, 30, 37, 44, 51, 58],
      [32, 39, 46, 53, 60],
      [48, 55, 62],
    ];
  }

  function blackBishopMoves() {
    return [
      [2, 9],
      [4, 11, 18, 25],
      [6, 13, 20, 27, 34, 41],
      [8, 15, 22, 29, 36, 43, 50, 57],
      [24, 31, 38, 45, 52, 59],
      [40, 47, 54, 61],
      [56, 63],
      [6, 15, 24],
      [4, 13, 22, 31, 40],
      [2, 11, 20, 29, 38, 47, 56],
      [9, 18, 27, 36, 45, 54, 63],
      [25, 34, 43, 52, 61],
      [41, 50, 59],
    ];
  }

  return {knightLimits, rookMoves, whiteBishopMoves, blackBishopMoves};
};

export default useConstants;
