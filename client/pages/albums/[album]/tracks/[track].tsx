import { Next, PlayPauseButton, Previous } from "components/playback";
import { useEffect, useRef, useState } from "react";

import { GetServerSidePropsResult } from "next";
import H1 from "components/elements/h1";
import { Track } from "types";
import TrackSEO from "components/track-seo";
import { getTrack } from "api";
import { useRouter } from "next/router";

type Props = {
  track: Track;
};

type Params = {
  params: {
    album: string;
    track: string;
  };
};

export default function AlbumPage({ track }: Props): JSX.Element {
  const router = useRouter();
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const first = track.track_number === 1;
    const last = track.track_number === track.album_length;

    document.onkeydown = (e) => {
      switch (e.key) {
        case " ":
          e.preventDefault();
          setPaused(!paused);
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (!first) {
            router.push(
              "/albums/[album]/tracks/[track]",
              `/albums/${track.album_path}/tracks/${track.track_number - 1}`,
              {
                scroll: false,
              }
            );
          }
          break;
        case "ArrowRight":
          if (!last) {
            e.preventDefault();
            router.push(
              "/albums/[album]/tracks/[track]",
              `/albums/${track.album_path}/tracks/${track.track_number + 1}`,
              {
                scroll: false,
              }
            );
          }
          break;
      }
    };
  }, [router, track, paused]);

  useEffect(() => {
    if (paused) {
      ref.current?.pause();
    } else {
      ref.current?.play();
    }
  }, [paused]);

  useEffect(() => {
    const last = track.track_number === track.album_length;

    if (ended) {
      if (!last) {
        router.push(
          "/albums/[album]/tracks/[track]",
          `/albums/${track.album_path}/tracks/${track.track_number + 1}`,
          {
            scroll: false,
          }
        );
      }

      setEnded(false);
    }
  }, [router, track, ended]);

  return (
    <>
      <TrackSEO track={track} />

      <div className="flex flex-col items-center gap-16">
        <img src={track.cover_url} alt="album cover" width={256} height={256} />
        <H1>{track.title}</H1>
      </div>
      <div className="flex flex-row items-center gap-16">
        <Previous track={track} />
        <PlayPauseButton paused={paused} setPaused={setPaused} />
        <Next track={track} />
      </div>
      <audio
        src={track.audio_url}
        ref={ref}
        onEnded={() => setEnded(true)}
        autoPlay
      ></audio>
    </>
  );
}

export async function getServerSideProps({
  params: params,
}: Params): Promise<GetServerSidePropsResult<Props>> {
  const res = await getTrack(params.album, Number(params.track));

  if (res.error !== "") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      track: res.data,
    },
  };
}
