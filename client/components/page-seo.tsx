import Head from "next/head";

type Props = {
  path?: string;
};

function PageSEO({ path }: Props): JSX.Element {
  const title = path
    ? `🧮 brave little abac.us - ${path}`
    : "🧮 brave little abac.us";
  const url = path
    ? `https://bravelittleabac.us/${path}`
    : "https://bravelittleabac.us";

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <title>{title}</title>
      <meta
        name="description"
        content="fan site for the best emo band of all time."
      />
      {/*<meta name="theme-color" content="#6466e9" />*/}
      <link rel="icon" href="/favicon.ico" />

      <meta name="og:title" content={title} />
      <meta
        name="og:description"
        content="fan site for the best emo band of all time."
      />
      <meta
        name="og:image"
        content="https://bravelittleabac.us/images/og-image.png"
      />
      <meta name="og:url" content={url} />
      <meta name="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vidhanio" />
      <meta name="twitter:creator" content="@vidhanio" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content="fan site for the best emo band of all time."
      />
      <meta
        name="twitter:image"
        content="https://bravelittleabac.us/images/og-image.png"
      />
      <meta name="og:url" content={url} />
    </Head>
  );
}

export default PageSEO;
