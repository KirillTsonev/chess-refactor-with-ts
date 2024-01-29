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
