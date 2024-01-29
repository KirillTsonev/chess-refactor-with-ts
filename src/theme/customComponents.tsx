import {Box, BoxProps} from "@mui/material";
import {styled} from "@mui/system";

type ImgProps = {
  alt?: string;
  src?: string;
};

export const BoardContainer = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  width: "720px",
  height: "720px",
  margin: "0 auto",
}));

export const Square = styled(Box)(({background, color}: {background: string; color: string}) => ({
  width: "90px",
  height: "90px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  background,
  color,
}));

export const PawnContainer = styled(Box)(() => ({
  position: "relative",
  height: "90px",
}));

export const Piece = (props: BoxProps & ImgProps) => (
  <Box
    component="img"
    sx={{padding: "2px 5px 8px 5px", width: "90px", height: "90px"}}
    {...props}
  />
);

export const MovementSquare = styled(Box)(() => ({
  width: "90px",
  height: "90px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export const HighlightSquare = styled(Box)(() => ({
  width: "90px",
  height: "90px",
  position: "relative",
  "&:hover": {
    "&::before": {
      content: '""',
      border: "20px solid transparent",
      borderBottom: "none",
      borderTopColor: "#1cce31",
      position: "absolute",
      transform: "rotate(-45deg)",
      bottom: "-3px",
      right: "-13px",
    },
    "&::after": {
      content: '""',
      border: "20px solid transparent",
      borderBottom: "none",
      borderTopColor: "#1cce31",
      position: "absolute",
      transform: "rotate(45deg)",
      bottom: "-3px",
      left: "-13px",
    },
    div: {
      position: "relative",
      "&::before": {
        content: '""',
        border: "20px solid transparent",
        borderBottom: "none",
        borderTopColor: "#1cce31",
        position: "absolute",
        transform: "rotate(-135deg)",
        top: "-3px",
        right: "-13px",
      },
      "&::after": {
        content: '""',
        border: "20px solid transparent",
        borderBottom: "none",
        borderTopColor: "#1cce31",
        position: "absolute",
        transform: "rotate(135deg)",
        top: "-3px",
        left: "-13px",
      },
    },
  },
}));

export const OpponentSquare = styled(Box)(() => ({
  height: "80px",
  width: "80px",
  position: "absolute",
  "&::before": {
    content: '""',
    border: "19px solid transparent",
    borderBottom: "none",
    borderTopColor: "#ce1717ae",
    position: "absolute",
    transform: "rotate(-45deg)",
    bottom: "-3px",
    right: "-12px",
  },
  "&::after": {
    content: '""',
    border: "19px solid transparent",
    borderBottom: "none",
    borderTopColor: "#ce1717ae",
    position: "absolute",
    transform: "rotate(45deg)",
    bottom: "-3px",
    left: "-12px",
  },
  div: {
    position: "relative",
    "&::before": {
      content: '""',
      border: "19px solid transparent",
      borderBottom: "none",
      borderTopColor: "#ce1717ae",
      position: "absolute",
      transform: "rotate(-135deg)",
      top: "-3px",
      right: "-12px",
    },
    "&::after": {
      content: '""',
      border: "19px solid transparent",
      borderBottom: "none",
      borderTopColor: "#ce1717ae",
      position: "absolute",
      transform: "rotate(135deg)",
      top: "-3px",
      left: "-12px",
    },
  },
}));

export const LastMadeMove = styled(Box)(() => ({
  background: "#cece1780",
  height: "90px",
  width: "90px",
}));

export const Typography = styled(Box)(
  ({rotate, bottom, top, left, right}: {rotate?: string; bottom?: string; top?: string; left?: string; right?: string}) => ({
    position: "absolute",
    color: "black",
    fontWeight: 700,
    zIndex: 10,
    rotate,
    bottom,
    top,
    left,
    right,
    pointerEvents: "none",
  })
);

export const ActiveSquare = styled(Box)(() => ({
  height: "30px",
  width: "30px",
  borderRadius: "100%",
  background: "#17ce2980",
}));
