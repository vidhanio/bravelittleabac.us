import { Head, Html, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
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
