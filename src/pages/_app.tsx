import {
  ThemeProvider,
  CSSReset,
  // ColorModeProvider,
  Box,
} from "@chakra-ui/core";
import { Global } from "@emotion/core";
import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { StoreContext, useStoreReducer } from "../store";

import theme from "../theme";

const globalStyles = {
  body: { height: "100%" },
  html: { height: "100%" },
  "#__next": { height: "100%" },
};

function App({
  Component,
  pageProps,
}: AppProps & { Component: AppProps["Component"] & { pageTitle?: string } }) {
  const value = useStoreReducer();
  const router = useRouter();
  const { pageTitle } = Component;
  const title = pageTitle ? `${pageTitle} | Calow` : "Calow";
  const pageUrl = "https://bogas04.github.io/calow/";
  const description = "Intuitive minimalist calorie logging web app";
  const image = pageUrl + "favicon.ico";

  const footerClickHandler = (pathname: string) => {
    if (router.pathname === pathname) {
      document.querySelector("main")?.scrollTo(0, 0);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StoreContext.Provider value={value}>
        {/* <ColorModeProvider> */}
        <Global styles={globalStyles} />
        <CSSReset />
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <link rel="apple-touch-icon" sizes="180x180" href="favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon.ico" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={pageUrl} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={image} />
        </Head>

        <Box d="flex" flexDirection="column" height="100%">
          <Box as="main" flex="1" overflow="auto">
            <Component {...pageProps} />
          </Box>
          <Box
            as="footer"
            id="footer"
            p="4"
            color="white"
            backgroundColor="gray.600"
          >
            <Box as="nav">
              <Box
                as="ul"
                d="flex"
                listStyleType="none"
                px="6"
                justifyContent="space-between"
              >
                <li>
                  <Link href="/">
                    <a onClick={() => footerClickHandler("/")}>📔 Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/items">
                    <a onClick={() => footerClickHandler("/items")}>🍎 Items</a>
                  </Link>
                </li>
                <li>
                  <Link href="/settings">
                    <a onClick={() => footerClickHandler("/settings")}>
                      ⚙️ Settings
                    </a>
                  </Link>
                </li>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* </ColorModeProvider> */}
      </StoreContext.Provider>
    </ThemeProvider>
  );
}

export default App;
