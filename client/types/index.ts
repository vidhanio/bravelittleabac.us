export type AlbumResponse = {
  error: string;
  data: Album;
};

export type AlbumsResponse = {
  error: string;
  data: Album[];
};

export type Album = {
  title: string;
  release_date: string;
  tracks: Track[];
  cover_url: string;
  path: string;
};

export type TrackResponse = {
  error: string;
  data: Track;
};

export type TracksResponse = {
  error: string;
  data: Track[];
};

export type Track = {
  album_path: string;
  cover_url: string;
  album_length: number;
  title: string;
  lyrics: string;
  track_number: number;
  audio_url: string;
};
