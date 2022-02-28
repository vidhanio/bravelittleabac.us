import { Dispatch, SetStateAction } from "react";
import { NextIcon, PauseIcon, PlayIcon, PreviousIcon } from "./icons/playback";

import Link from "next/link";
import { Track } from "types";

type PlayPauseProps = {
  paused: boolean;
  setPaused: Dispatch<SetStateAction<boolean>>;
};

type PreviousNextProps = {
  track: Track;
};

const className = "fill-green-500";
const disabledClassName =
  "fill-green-200 dark:fill-green-800 cursor-not-allowed";

export function PlayPauseButton({
  paused,
  setPaused,
}: PlayPauseProps): JSX.Element {
  return (
    <button onClick={() => setPaused(!paused)}>
      {paused ? (
        <PauseIcon className={className} />
      ) : (
        <PlayIcon className={className} />
      )}
    </button>
  );
}

export function Previous({ track }: PreviousNextProps): JSX.Element {
  const firstTrack = track.track_number === 1;

  return firstTrack ? (
    <PreviousIcon className={disabledClassName} />
  ) : (
    <Link
      href={"/albums/[album]/tracks/[track]"}
      as={`/albums/${track.album_path}/tracks/${track.track_number - 1}`}
      scroll={false}
    >
      <a>
        <PreviousIcon className={className} />
      </a>
    </Link>
  );
}

export function Next({ track }: PreviousNextProps): JSX.Element {
  const lastTrack = track.track_number === track.album_length;

  return lastTrack ? (
    <NextIcon className={disabledClassName} />
  ) : (
    <Link
      href={"/albums/[album]/tracks/[track]"}
      as={`/albums/${track.album_path}/tracks/${track.track_number + 1}`}
      scroll={false}
    >
      <a>
        <NextIcon className={className} />
      </a>
    </Link>
  );
}
