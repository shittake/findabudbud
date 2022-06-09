import { createTheme } from "@mui/material";
import { colors } from "@mui/material";

const theme = createTheme({
  palette: {
    blue: {
      main: colors.blue[400],
      contrastText: "#fff",
    },
    red: {
      main: colors.red[400],
      contrastText: "#fff",
    },
    green: {
      main: colors.green[400],
      contrastText: "#fff",
    },
  },
});

export default theme;
