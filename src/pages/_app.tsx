import { type AppType } from "next/app";
import { type Session } from "next-auth";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
      <Component {...pageProps} />
  );
};

export default MyApp;
