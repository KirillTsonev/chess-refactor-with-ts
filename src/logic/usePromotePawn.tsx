const usePromotePawn = () => {
  const promotePawn = (pawn, pieceToPromoteTo, i) => {
    if (/^pp/.test(pawn) && /^pq/.test(pieceToPromoteTo) && color === "white") {
      pieceToPromoteTo = pieceToPromoteTo + "w";
    }

    if (/^pp/.test(pawn) && /^pq/.test(pieceToPromoteTo) && color === "black") {
      pieceToPromoteTo = pieceToPromoteTo + "b";
    }

    if (/^op/.test(pawn) && /^oq/.test(pieceToPromoteTo) && color === "white") {
      pieceToPromoteTo = pieceToPromoteTo + "b";
    }

    if (/^op/.test(pawn) && /^oq/.test(pieceToPromoteTo) && color === "black") {
      pieceToPromoteTo = pieceToPromoteTo + "w";
    }

    store.dispatch({
      type: "pawnPromotion",
      payload: {pieceToPromoteTo, i},
    });

    if (/^ph/.test(pieceToPromoteTo)) {
      recordKnightMoves(i + 1, checkedByPlayerArr.current, playerSquaresLive);

      if (checkedByPlayerArr.current.includes(enemyKing)) {
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "enemyKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrOpponent",
          payload: moves.length,
        });
      }
    }

    if (/^oh/.test(pieceToPromoteTo)) {
      recordKnightMoves(i + 1, checkedByPlayerArr.current, enemySquaresRender);

      if (checkedByPlayerArr.current.includes(playerKing)) {
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "playerKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrPlayer",
          payload: moves.length,
        });
      }
    }

    if (/^pr/.test(pieceToPromoteTo)) {
      checkArrays(
        rookMoves.current,
        i + 1,
        checkedByPlayerArr.current,
        playerSquaresLive,
        enemySquaresLive,
        true,
        true
      );

      if (checkedByPlayerArr.current.includes(enemyKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "enemyKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrOpponent",
          payload: moves.length,
        });
      }
    }

    if (/^or/.test(pieceToPromoteTo)) {
      checkArrays(
        rookMoves.current,
        i + 1,
        checkedByPlayerArr.current,
        enemySquaresRender,
        playerSquaresRender,
        true,
        true
      );

      if (checkedByPlayerArr.current.includes(playerKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "playerKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrPlayer",
          payload: moves.length,
        });
      }
    }

    if (/^pb/.test(pieceToPromoteTo)) {
      checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);
      checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);

      if (checkedByPlayerArr.current.includes(enemyKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "enemyKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrOpponent",
          payload: moves.length,
        });
      }
    }

    if (/^ob/.test(pieceToPromoteTo)) {
      checkArrays(
        whiteBishopMoves,
        i + 1,
        checkedByPlayerArr.current,
        enemySquaresRender,
        playerSquaresRender,
        true,
        true
      );
      checkArrays(
        blackBishopMoves,
        i + 1,
        checkedByPlayerArr.current,
        enemySquaresRender,
        playerSquaresRender,
        true,
        true
      );

      if (checkedByPlayerArr.current.includes(playerKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "playerKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrPlayer",
          payload: moves.length,
        });
      }
    }

    if (/^pq/.test(pieceToPromoteTo)) {
      checkArrays(
        rookMoves.current,
        i + 1,
        checkedByPlayerArr.current,
        playerSquaresLive,
        enemySquaresLive,
        true,
        true
      );
      checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);
      checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true);

      if (checkedByPlayerArr.current.includes(enemyKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "enemyKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrOpponent",
          payload: moves.length,
        });
      }
    }

    if (/^oq/.test(pieceToPromoteTo)) {
      checkArrays(
        whiteBishopMoves,
        i + 1,
        checkedByPlayerArr.current,
        enemySquaresRender,
        playerSquaresRender,
        true,
        true
      );
      checkArrays(
        blackBishopMoves,
        i + 1,
        checkedByPlayerArr.current,
        enemySquaresRender,
        playerSquaresRender,
        true,
        true
      );
      checkArrays(
        rookMoves.current,
        i + 1,
        checkedByPlayerArr.current,
        enemySquaresRender,
        playerSquaresRender,
        true,
        true
      );

      if (checkedByPlayerArr.current.includes(playerKing)) {
        checkingPiece.current = i + 1;
        if (sounds) {
          checkSound.play();
        }

        store.dispatch({
          type: "playerKingAttacked",
          payload: true,
        });

        store.dispatch({
          type: "checkArrPlayer",
          payload: moves.length,
        });
      }
    }

    setPawnPromotes("");

    if (!sandbox && /^pp/.test(pawn) && !humanOpponent) {
      engineTurn();
    }
  };

  return {promotePawn};
};

export default usePromotePawn;
