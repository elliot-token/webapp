import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#2ca58d",
      light: "#bdc8f0",
      contrastText: "#bdc8f0",
    },
    secondary: {
      main: "#7c4dff",
    },
    background: {
      default: "#030c1d",
      paper: "#091f3c",
    },
    text: {
      primary: "#bdc8f0",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
};

const theme = createTheme(themeOptions);

export default theme;
