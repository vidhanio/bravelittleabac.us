import { Album } from "types";
import { GetServerSidePropsResult } from "next";
import H1 from "components/elements/h1";
import Link from "next/link";
import PageSEO from "components/page-seo";
import { getAlbums } from "api";

type Props = {
  albums: Album[];
};

export default function AlbumsPage({ albums }: Props): JSX.Element {
  return (
    <>
      <PageSEO path="albums" />

      <H1>albums</H1>
      <ul className="flex flex-col items-start justify-center gap-16 md:flex-row md:flex-wrap">
        {albums
          .sort((a, b) => {
            return a.release_date < b.release_date ? -1 : 1;
          })
          .map((album) => (
            <li key={album.path} className="w-full md:w-1/4">
              <Link
                href={"/albums/[album]"}
                as={`/albums/${album.path}`}
                scroll={false}
                passHref
              >
                <a className="flex flex-col items-center gap-4 text-center text-xl text-green-500 hover:underline">
                  <img
                    src={album.cover_url}
                    alt={album.title}
                    width={256}
                    height={256}
                  />
                  <p>{album.title}</p>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const res = await getAlbums();

  if (res.error !== "") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      albums: res.data,
    },
  };
}
