import {Box} from "@mui/material";

import Board from "./components/Board";
import Pieces from "./components/Pieces";

function App() {
  return (
    <Box sx={{position: "relative", border: "green solid 10px"}}>
      <Board />
      <Pieces />
    </Box>
  );
}

export default App;
