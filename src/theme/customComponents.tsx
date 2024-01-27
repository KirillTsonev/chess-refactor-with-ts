import {Box} from "@mui/material";
import {styled} from "@mui/system";

export const BoardContainer = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  width: "640px",
  height: "640px",
  margin: "0 auto",
}));

export const Square = styled(Box)(({background, color}: {background: string; color: string}) => ({
  width: "80px",
  height: "80px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  background,
  color,
}));
