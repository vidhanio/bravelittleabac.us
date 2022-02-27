import { Head, Html, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={
          "font-handwritten bg-stone-100 text-stone-900 dark:bg-stone-900 dark:text-stone-100"
        }
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
