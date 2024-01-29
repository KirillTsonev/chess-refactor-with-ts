export type Pieces = {
  or1: [number, string];
  oh1: [number, string];
  ob1: [number, string];
  oqb1: [number, string];
  okb: [number, string];
  ob2: [number, string];
  oh2: [number, string];
  or2: [number, string];
  op1: [number, string];
  op2: [number, string];
  op3: [number, string];
  op4: [number, string];
  op5: [number, string];
  op6: [number, string];
  op7: [number, string];
  op8: [number, string];
  empty1: [number, string];
  empty2: [number, string];
  empty3: [number, string];
  empty4: [number, string];
  empty5: [number, string];
  empty6: [number, string];
  empty7: [number, string];
  empty8: [number, string];
  empty9: [number, string];
  empty10: [number, string];
  empty11: [number, string];
  empty12: [number, string];
  empty13: [number, string];
  empty14: [number, string];
  empty15: [number, string];
  empty16: [number, string];
  empty17: [number, string];
  empty18: [number, string];
  empty19: [number, string];
  empty20: [number, string];
  empty21: [number, string];
  empty22: [number, string];
  empty23: [number, string];
  empty24: [number, string];
  empty25: [number, string];
  empty26: [number, string];
  empty27: [number, string];
  empty28: [number, string];
  empty29: [number, string];
  empty30: [number, string];
  empty31: [number, string];
  empty32: [number, string];
  pp1: [number, string];
  pp2: [number, string];
  pp3: [number, string];
  pp4: [number, string];
  pp5: [number, string];
  pp6: [number, string];
  pp7: [number, string];
  pp8: [number, string];
  pr1: [number, string];
  ph1: [number, string];
  pb1: [number, string];
  pqw1: [number, string];
  pkw: [number, string];
  pb2: [number, string];
  ph2: [number, string];
  pr2: [number, string];
};

export interface IBoard {
  activePiece: string;
  oldSquare: string;
  newSquare: string;
  board: Pieces;
  pawnsFirstMove: {
    pp1: boolean | string;
    pp2: boolean | string;
    pp3: boolean | string;
    pp4: boolean | string;
    pp5: boolean | string;
    pp6: boolean | string;
    pp7: boolean | string;
    pp8: boolean | string;
    op1: boolean | string;
    op2: boolean | string;
    op3: boolean | string;
    op4: boolean | string;
    op5: boolean | string;
    op6: boolean | string;
    op7: boolean | string;
    op8: boolean | string;
  };
  castlingPlayerMoved: {
    pk: boolean;
    pr1: boolean;
    pr2: boolean;
  };
  castlingOpponentMoved: {
    ok: boolean;
    or1: boolean;
    or2: boolean;
  };
  moveCounter: number;
  halfMoveCounter: number;
  opponentKingAttacked: boolean;
  playerKingAttacked: boolean;
  highlightMove: string[];
  toMove: string;
  gameEnd: boolean;
  moveSquares: number[];
  pieceSquare: string;
  moveVar: number[];
  modalOpen: boolean;
  newGame: boolean;
  endMessage: string;
  checkArrPlayer: number[];
  checkArrOpponent: number[];
  pawnPromotes: string;
}
