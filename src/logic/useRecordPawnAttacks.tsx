import useAllSelectors from "../hooks/useAllSelectors";
import useConstants from "./useConstants";

const useRecordPawnAttacks = () => {
  const {color, sandbox} = useAllSelectors();
  const {knightLimits} = useConstants();

  function recordOpponentPawnAttacks(i: number) {
    const arr = [];

    if (i) {
      if (color === "black" && !sandbox) {
        if (!knightLimits()[0].includes(i)) {
          arr.push(i - 9);
        }

        if (!knightLimits()[3].includes(i)) {
          arr.push(i - 7);
        }
      } else {
        if (!knightLimits()[0].includes(i)) {
          arr.push(i + 7);
        }

        if (!knightLimits()[3].includes(i)) {
          arr.push(i + 9);
        }
      }
    }

    return arr;
  }

  function recordPlayerPawnAttacks(i: number) {
    const arr = [];

    if (i) {
      if (color === "black" && !sandbox) {
        if (!knightLimits()[3].includes(i)) {
          arr.push(i + 9);
        }

        if (!knightLimits()[0].includes(i)) {
          arr.push(i + 7);
        }
      } else {
        if (!knightLimits()[0].includes(i)) {
          arr.push(i - 9);
        }

        if (!knightLimits()[3].includes(i)) {
          arr.push(i - 7);
        }
      }
    }

    return arr;
  }

  return {recordOpponentPawnAttacks, recordPlayerPawnAttacks};
};

export default useRecordPawnAttacks;
