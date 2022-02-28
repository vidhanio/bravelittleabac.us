import { Album } from "types";
import AlbumSEO from "components/album-seo";
import { GetServerSidePropsResult } from "next";
import H1 from "components/elements/h1";
import Image from "next/image";
import Link from "next/link";
import { getAlbum } from "api";

type Props = {
  album: Album;
};

type Params = {
  params: {
    album: string;
  };
};

export default function AlbumPage({ album }: Props): JSX.Element {
  return (
    <>
      <AlbumSEO album={album} />

      <div className="flex flex-col items-center gap-16">
        <Image
          src={album.cover_url}
          alt="album cover"
          width={256}
          height={256}
        />
        <H1>{album.title}</H1>
      </div>
      <ol className="list-decimal text-xl">
        {album.tracks.map((track) => (
          <li key={track.track_number}>
            <Link
              href={"/albums/[album]/tracks/[track]"}
              as={`/albums/${album.path}/tracks/${track.track_number}`}
              scroll={false}
              passHref
            >
              <a className="text-xl text-green-500 hover:underline">
                {track.title}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

export async function getServerSideProps({
  params: params,
}: Params): Promise<GetServerSidePropsResult<Props>> {
  const res = await getAlbum(params.album);

  if (res.error !== "") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      album: res.data,
    },
  };
}
