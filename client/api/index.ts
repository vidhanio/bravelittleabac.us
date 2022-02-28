import {
  AlbumResponse,
  AlbumsResponse,
  TrackResponse,
  TracksResponse,
} from "types";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.bravelittleabac.us"
    : "http://localhost:8080";

export async function getAlbums(): Promise<AlbumsResponse> {
  const res = await fetch(`${baseUrl}/albums`);
  return await res.json();
}

export async function getAlbum(albumPath: string): Promise<AlbumResponse> {
  const res = await fetch(`${baseUrl}/albums/${albumPath}`);
  return await res.json();
}

export async function getTracks(albumPath: string): Promise<TracksResponse> {
  const res = await fetch(`${baseUrl}/albums/${albumPath}/tracks`);
  return await res.json();
}

export async function getTrack(
  albumPath: string,
  trackNumber: number
): Promise<TrackResponse> {
  const res = await fetch(
    `${baseUrl}/albums/${albumPath}/tracks/${trackNumber}`
  );
  return await res.json();
}
