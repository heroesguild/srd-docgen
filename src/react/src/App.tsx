import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { Link, Router } from "@reach/router";
import { hot } from "react-hot-loader";

import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

import FancyDiv from "components/FancyDiv";
import Dynamic from "containers/Dynamic";

import "./app.css";
import logo from "./logo.png";
import { TOCBurgerMenu } from "components/TOCBurgerMenu";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  const theme = extendTheme();

  return (
    <Root>
      <ChakraProvider>
        <nav>
          <TOCBurgerMenu />
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/dynamic">Dynamic</Link>
        </nav>
        <div className="content">
          <img src={logo} className="App-logo" alt="logo" />
          <FancyDiv>
            <React.Suspense fallback={<em>Loading...</em>}>
              <Router>
                <Dynamic path="dynamic" />
                <Routes path="*" />
              </Router>
            </React.Suspense>
          </FancyDiv>
        </div>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </ChakraProvider>
    </Root>
  );
}

export default hot(module)(App);
