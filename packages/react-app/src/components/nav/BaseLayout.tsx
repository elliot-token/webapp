import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import WalletButton from "components/WalletButton";
import React from "react";

type Props = {
  children: React.ReactNode;
  disableWalletButton?: boolean;
};
const BaseLayout = ({ children, disableWalletButton }: Props) => {
  const theme = useTheme();
  return (
    <>
      <AppBar
        color="primary"
        position="sticky"
        style={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                Elliot
              </Typography>
            </Box>
            {!disableWalletButton && <WalletButton />}
          </Toolbar>
        </Container>
      </AppBar>
      <Container style={{ marginTop: 32 }} maxWidth="xl">
        {children}
      </Container>
      <CssBaseline />
    </>
  );
};

export default BaseLayout;
