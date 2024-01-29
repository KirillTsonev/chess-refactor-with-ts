import {Box} from "@mui/material";

import Board from "./components/Board";
import Pieces from "./components/Pieces";
import Movement from "./components/Movement";

function App() {
  return (
    <Box sx={{position: "relative", border: "green solid 10px", width: "740px", margin: "20px auto"}}>
      <Board />
      <Pieces />
      <Movement />
    </Box>
  );
}

export default App;
