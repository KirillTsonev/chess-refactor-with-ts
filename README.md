# Chess with Stockfish

A complete game of chess made from scratch using React, Material UI for styling, Redux for state management, and a version of the Stockfish chess engine compiled to JavaScript and WebAssembly using Emscripten (https://github.com/lichess-org/stockfish.js) along with a custom-written FEN encoder to interact with it through UCI.

Includes piece movement animations with adjustable speed, sounds, square highlights, separate timers for each player, the ability to go through played moves, difficulty options when playing against Stockfish, and all game logic:

- Castling
- Pawn promotion
- En passant
- Discovered checks, castling checks, en passant checks
- Threefold repetition
- Fifty-move rule
- Stalemate
- Checkmate
