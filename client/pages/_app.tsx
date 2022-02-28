import "styles/globals.css";

import type { AppProps } from "next/app";
import Footer from "components/footer";
import Nav from "components/nav";
import { WrapperLayout } from "layouts/wrapper";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Nav
        navItems={[
          {
            name: "home",
            url: "/",
          },
        ]}
      />
      <WrapperLayout>
        <Component {...pageProps} />
      </WrapperLayout>
      <Footer
        footerItems={[
          {
            name: "source code",
            url: "https://github.com/vidhanio/bravelittleabac.us",
          },
          {
            name: "github",
            url: "https://github.com/vidhanio",
          },
          {
            name: "twitter",
            url: "https://twitter.com/vidhanio",
          },
          {
            name: "linkedin",
            url: "https://www.linkedin.com/in/vidhanio/",
          },
        ]}
      />
    </>
  );
}
