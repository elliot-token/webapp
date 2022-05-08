import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DAppProvider, Mainnet } from "@usedapp/core";
import React from "react";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

import { ThemeProvider } from "@mui/material";
import theme from "core/theme";
import { Provider } from "react-redux";
import store, { persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./Routes";
import CustomRouter from "./CustomRouter";
import history from "core/history";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1-0ImWUu3ng5GotbnxyMjh09TdRwoPIk",
  authDomain: "elliot-token.firebaseapp.com",
  projectId: "elliot-token",
  storageBucket: "elliot-token.appspot.com",
  messagingSenderId: "747816756387",
  appId: "1:747816756387:web:eee6c58cf16d873b9f8b16",
  measurementId: "G-5Q536EEDZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Change this to your own Infura project id: https://infura.io/register
const INFURA_PROJECT_ID = "eb3884baa7834bf1a1ff5ff3dca9a729";
const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: "https://mainnet.infura.io/v3/" + INFURA_PROJECT_ID,
  },
};

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
});

const App = () => {
  return (
    <CustomRouter history={history}>
      <DAppProvider config={config}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Routes />
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </ApolloProvider>
      </DAppProvider>
    </CustomRouter>
  );
};

export default App;
