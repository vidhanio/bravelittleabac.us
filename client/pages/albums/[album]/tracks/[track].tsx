import { Next, PlayPauseButton, Previous } from "components/playback";
import { useEffect, useRef, useState } from "react";

import { GetServerSidePropsResult } from "next";
import H1 from "components/elements/h1";
import Image from "next/image";
import { Track } from "types";
import { getTrack } from "api";

type Props = {
  track: Track;
};

type Params = {
  params: {
    album: string;
    track: string;
  };
};

export default function AlbumPage({ track }: Props): React.ReactNode {
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      if (paused) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
    }
  }, [paused]);

  return (
    <>
      <div className="flex flex-col items-center gap-16">
        <Image
          src={track.cover_url}
          alt="album cover"
          width={250}
          height={250}
        />
        <H1>{track.title}</H1>
      </div>
      <div className="flex flex-row items-center gap-16">
        <Previous track={track} />
        <PlayPauseButton paused={paused} setPaused={setPaused} />
        <Next track={track} />
      </div>
      <audio src={track.audio_url} ref={ref} autoPlay></audio>
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
