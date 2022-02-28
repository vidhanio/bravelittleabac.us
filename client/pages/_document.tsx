import { Head, Html, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700"
          rel="stylesheet"
        />
      </Head>
      <body
        className={
          "flex flex-col items-center bg-stone-100 font-handwritten text-stone-900 dark:bg-stone-900 dark:text-stone-100"
        }
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
