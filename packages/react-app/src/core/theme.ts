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
      default: "#060d12",
      paper: "rgb(14, 27, 35)",
    },
    text: {
      primary: "#bdc8f0",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  shape: {
    borderRadius: 8,
  },
};

const theme = createTheme(themeOptions);
console.log(theme);
export default theme;
