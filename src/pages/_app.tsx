import { type AppType } from "next/app";
import Script from "next/script";
import CookePopup from "../components/CookiePopup";

import "../styles/globals.css";

const MyApp: AppType = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QFXZHNTEM4"
        strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QFXZHNTEM4');`}
      </Script>
      <CookePopup />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
