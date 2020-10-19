import {
  ThemeProvider,
  CSSReset,
  // ColorModeProvider,
  Flex,
  Box,
} from "@chakra-ui/core";
import { Global } from "@emotion/core";
import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  const image = pageUrl + "icon-512-512.png";

  useServiceWorker();

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

          <link rel="manifest" href="manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="calow" />
          <meta name="apple-mobile-web-app-title" content="calow" />
          <meta name="theme-color" content="#48bb78" />
          <meta name="msapplication-navbutton-color" content="#48bb78" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={pageUrl + "icon-192-192.png"}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={pageUrl + "icon-48-48.png"}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={pageUrl + "icon-48-48.png"}
          />

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
          <script async src="https://unpkg.com/thesemetrics@latest"></script>
        </Head>

        <Flex direction="column" height="100%">
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
              <Flex as="ul" listStyleType="none" px="6" justify="space-between">
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
              </Flex>
            </Box>
          </Box>
        </Flex>
        {/* </ColorModeProvider> */}
      </StoreContext.Provider>
    </ThemeProvider>
  );
}

function useServiceWorker() {
  useEffect(() => {
    navigator?.serviceWorker?.register("sw.js");
  }, []);
}
export default App;
