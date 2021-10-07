import "core-js/features/object/from-entries";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { StoreContext, useStoreReducer } from "../store";
import {
  BiHome as HomeIcon,
  BiBookmarks as BookmarkIcon,
  BiSearch as SearchIcon,
  BiWrench as SettingsIcon,
  BiListUl as ItemsIcon,
} from "react-icons/bi";
import "focus-visible/dist/focus-visible";
import theme from "../theme";

function App({
  Component,
  pageProps,
}: AppProps & {
  Component: AppProps["Component"] & {
    pageTitle?: string;
    hideFooter?: boolean;
  };
}) {
  const value = useStoreReducer();
  const { pageTitle } = Component;
  const title = pageTitle ? `${pageTitle} | Calow` : "Calow";
  const pageUrl = "https://bogas04.github.io/calow/";
  const description = "Intuitive minimalist calorie logging web app";
  const image = pageUrl + "icon-512-512.png";

  useServiceWorker();

  return (
    <ChakraProvider theme={theme}>
      <StoreContext.Provider value={value}>
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
          {!Component.hideFooter && (
            <Box
              as="footer"
              overflow="hidden"
              id="footer"
              p="4"
              bg="rgba(0,0,0,0.1)"
              color="gray.800"
            >
              <Box as="nav">
                <Flex
                  as="ul"
                  listStyleType="none"
                  px="6"
                  justify="space-between"
                >
                  <li>
                    <NavLink href="/" title="Open Home">
                      <HomeIcon size="24" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/bookmarks" title="Bookmarks">
                      <BookmarkIcon size="24" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/search" title="Search">
                      <SearchIcon size="24" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/items" title="Open Item Catalog">
                      <ItemsIcon size="24" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/settings" title="Open Settings">
                      <SettingsIcon size="24" />
                    </NavLink>
                  </li>
                </Flex>
              </Box>
            </Box>
          )}
        </Flex>
      </StoreContext.Provider>
    </ChakraProvider>
  );
}

function useServiceWorker() {
  useEffect(() => {
    navigator?.serviceWorker?.register("sw.js");
  }, []);
}
export default App;

const Indicator = () => {
  return (
    <Box position="absolute" bottom={-5}>
      <Box
        height="10px"
        width="10px"
        rounded="full"
        bg="teal.300"
        boxShadow="0 0 16px 0 white"
      />
    </Box>
  );
};

const NavLink = ({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const footerClickHandler = (pathname: string) => {
    if (router.pathname === pathname) {
      document.querySelector("main")?.scrollTo(0, 0);
    }
  };

  return (
    <Link href={href}>
      <Flex
        as="a"
        onClick={() => footerClickHandler(href)}
        title={title}
        align="center"
        justify="center"
        direction="column"
        pos="relative"
      >
        {children}
        {router.pathname === href && <Indicator />}
      </Flex>
    </Link>
  );
};
