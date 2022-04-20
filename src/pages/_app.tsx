import "../styles/globals.css";
//  import "@styles/grayscale.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { theme } from "src/themes/theme";
import { ChakraProvider } from "@chakra-ui/react";
// import routes from "./routes/index";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DAppProvider, Mainnet, Config } from "@usedapp/core";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@store/index";
import { AppStateProvider } from "src/hooks/useAppState";
import og_BabyloniaTwitterImage from "@assets/images/twitter/SLIDES_MainBabylonia_280322_960x480.png";

import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

import { useEffect } from "react";

const keywords = ``;
const og_title = " The NFT selector | Babylonia.app ";
const og_description =
  "Babylonia NFT is where you can define your NFT. It is a transparent, fair & rewarding system all based on blockchain BSC Polygon Fantom";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  // readOnlyUrls: {
  //   [Mainnet.chainId]:
  //     "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  // },
};
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      if (typeof window !== "undefined") {
        gtag.pageview(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <AppStateProvider>
      <ChakraProvider theme={theme}>
        <ReduxProvider store={store}>
          <DAppProvider config={config}>
            <Head>
              <>
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <Script
                  id="gtag-js"
                  key="head-script-gtag"
                  strategy="afterInteractive"
                  src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_UA_ID}`}
                />
                <Script
                  id="head-script-gtag-init"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
        `,
                  }}
                />
              </>
              <title> The NFT selector | Babylonia.app </title>
              <link rel="shortcut icon" href="/BABY.png" />
              <meta httpEquiv="content-language" content="en-us" />
              <meta charSet="utf-8" />
              <meta
                name="description"
                content="Babylonia NFT is where you can define your NFT. It is a transparent, fair & rewarding system all based on blockchain BSC Polygon Fantom"
                key="desc"
              />
              <meta name="keywords" content={keywords} key="keywords" />
              {/* <meta name="image" content={`${BabyLogo}`} key="ogtitle" /> */}
              <meta property="og:type" content="website" key="ogtype" />
              <meta property="og:title" content={`${og_title}`} key="ogtitle" />
              <meta
                property="og:description"
                content={`${og_description}`}
                key="ogdesc"
              />
              <meta
                property="twitter:card"
                content="summary_large_image"
                key="twcard"
              />
              <meta
                name="twitter:creator"
                content="AppBabylonia"
                key="twhandle"
              />
              <meta
                name="twitter:title"
                content={`${og_title}`}
                key="twtitle"
              />
              <meta
                name="twitter:description"
                content={`${og_description}`}
                key="twdescription"
              />
              <meta
                name="twitter:image"
                content={`${og_BabyloniaTwitterImage.src}`}
                key="twimage"
              />
              <meta
                property="og:url"
                content="https://twitter.com/AppBabylonia"
                key="ogurl"
              />
              <meta
                property="og:image"
                content={`${og_BabyloniaTwitterImage.src}`}
                key="ogimage"
              />
              <meta
                property="og:site_name"
                content="Babylonia.app"
                key="ogsitename"
              />
            </Head>

            <Component {...pageProps} />
          </DAppProvider>
        </ReduxProvider>
      </ChakraProvider>
    </AppStateProvider>
  );
}

export default MyApp;
