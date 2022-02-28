import { Album } from "types";
import Head from "next/head";

type Props = {
  album: Album;
};

function AlbumSEO({ album }: Props): JSX.Element {
  const title = `🧮 brave little abac.us - ${album.title}`;
  const url = `https://bravelittleabac.us/albums/${album.path}`;

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

      <link rel="icon" href="/favicon.ico" />

      <meta name="og:title" content={title} />
      <meta
        name="og:description"
        content="fan site for the best emo band of all time."
      />
      <meta name="og:image" content={album.cover_url} />
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
      <meta name="twitter:image" content={album.cover_url} />
      <meta name="og:url" content={url} />
    </Head>
  );
}

export default AlbumSEO;
