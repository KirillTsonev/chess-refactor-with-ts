import {useAppSelector} from "../redux/hooks";

const useAllSelectors = () => {
  const activePiece = useAppSelector((state) => state.board.activePiece);
  const oldSquare = useAppSelector((state) => state.board.oldSquare);
  const newSquare = useAppSelector((state) => state.board.newSquare);
  const board = useAppSelector((state) => state.board.board);
  const pawnsFirstMove = useAppSelector((state) => state.board.pawnsFirstMove);
  const castlingPlayerMoved = useAppSelector((state) => state.board.castlingPlayerMoved);
  const castlingOpponentMoved = useAppSelector((state) => state.board.castlingOpponentMoved);
  const moveCounter = useAppSelector((state) => state.board.moveCounter);
  const halfMoveCounter = useAppSelector((state) => state.board.halfMoveCounter);
  const opponentKingAttacked = useAppSelector((state) => state.board.opponentKingAttacked);
  const playerKingAttacked = useAppSelector((state) => state.board.playerKingAttacked);
  const highlightMove = useAppSelector((state) => state.board.highlightMove);
  const toMove = useAppSelector((state) => state.board.toMove);
  const gameEnd = useAppSelector((state) => state.board.gameEnd);
  const moveSquares = useAppSelector((state) => state.board.moveSquares);
  const pieceSquare = useAppSelector((state) => state.board.pieceSquare);
  const moveVar = useAppSelector((state) => state.board.moveVar);
  const modalOpen = useAppSelector((state) => state.board.modalOpen);
  const newGame = useAppSelector((state) => state.board.newGame);
  const endMessage = useAppSelector((state) => state.board.endMessage);
  const checkArrPlayer = useAppSelector((state) => state.board.checkArrPlayer);
  const checkArrOpponent = useAppSelector((state) => state.board.checkArrOpponent);
  const pawnPromotes = useAppSelector((state) => state.board.pawnPromotes);

  const darkTheme = useAppSelector((state) => state.behavior.darkTheme);
  const numbers = useAppSelector((state) => state.behavior.numbers);
  const animationSpeed = useAppSelector((state) => state.behavior.animationSpeed);
  const coordinates = useAppSelector((state) => state.behavior.coordinates);
  const sounds = useAppSelector((state) => state.behavior.sounds);
  const milliseconds = useAppSelector((state) => state.behavior.milliseconds);

  const sandbox = useAppSelector((state) => state.options.sandbox);
  const skillLevel = useAppSelector((state) => state.options.skillLevel);
  const depth = useAppSelector((state) => state.options.depth);
  const millisecondsTime = useAppSelector((state) => state.options.millisecondsTime);
  const color = useAppSelector((state) => state.options.color);
  const time = useAppSelector((state) => state.options.time);
  const increment = useAppSelector((state) => state.options.increment);
  const options = useAppSelector((state) => state.options.options);
  const humanOpponent = useAppSelector((state) => state.options.humanOpponent);
  const idToSend = useAppSelector((state) => state.options.idToSend);

  const moveNumbers = useAppSelector((state) => state.progression.moveNumbers);
  const moves = useAppSelector((state) => state.progression.moves);
  const currentMove = useAppSelector((state) => state.progression.currentMove);
  const notationArr = useAppSelector((state) => state.progression.notationArr);
  const pieceGainPlayer = useAppSelector((state) => state.progression.pieceGainPlayer);
  const pieceGainOpponent = useAppSelector((state) => state.progression.pieceGainOpponent);

  const checkingPiece = useAppSelector((state) => state.square.checkingPiece);
  const pieceSquareForEngine = useAppSelector((state) => state.square.pieceSquareForEngine);
  const playerPiece = useAppSelector((state) => state.square.playerPiece);

  return {
    checkingPiece,
    playerPiece,
    pieceSquareForEngine,
    activePiece,
    oldSquare,
    newSquare,
    board,
    pawnsFirstMove,
    castlingPlayerMoved,
    castlingOpponentMoved,
    modalOpen,
    moveCounter,
    moveSquares,
    moveVar,
    halfMoveCounter,
    opponentKingAttacked,
    playerKingAttacked,
    highlightMove,
    toMove,
    gameEnd,
    pieceSquare,
    newGame,
    endMessage,
    checkArrOpponent,
    checkArrPlayer,
    darkTheme,
    numbers,
    animationSpeed,
    coordinates,
    sounds,
    milliseconds,
    sandbox,
    skillLevel,
    depth,
    millisecondsTime,
    color,
    time,
    increment,
    options,
    humanOpponent,
    idToSend,
    moveNumbers,
    moves,
    currentMove,
    notationArr,
    pieceGainPlayer,
    pieceGainOpponent,
    pawnPromotes,
  };
};

export default useAllSelectors;
