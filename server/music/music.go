package music

import (
	"encoding/json"
	"fmt"
	"time"
)

type Album struct {
	Title       string    `json:"title"`
	ReleaseDate time.Time `json:"release_date"`
	Tracks      []Track   `json:"tracks"`
	CoverURL    string    `json:"cover_url"`
	Path        string    `json:"path"`
}

type Track struct {
	AlbumPath   string `json:"album_path"`
	AlbumLength int    `json:"album_length"`
	CoverURL    string `json:"cover_url"`
	Title       string `json:"title"`
	Lyrics      string `json:"lyrics"`
	TrackNumber int    `json:"track_number"`
	AudioURL    string `json:"audio_url"`
}

func (a *Album) UnmarshalJSON(data []byte) error {
	type Alias Album

	aux := &struct {
		ReleaseDate  string `json:"release_date"`
		CoverDriveID string `json:"cover_drive_id"`
		Tracks       []struct {
			DriveID string `json:"drive_id"`
			Track
		} `json:"tracks"`
		*Alias
	}{
		Alias: (*Alias)(a),
	}

	err := json.Unmarshal(data, &aux)
	if err != nil {
		return err
	}

	t, err := time.Parse("2006-01-02", aux.ReleaseDate)
	if err != nil {
		return err
	}

	a.ReleaseDate = t
	a.CoverURL = fmt.Sprintf("https://drive.google.com/uc?export=download&id=%s", aux.CoverDriveID)

	a.Tracks = make([]Track, len(aux.Tracks))

	for i, track := range aux.Tracks {
		a.Tracks[i] = Track{
			AlbumPath:   aux.Path,
			AlbumLength: len(aux.Tracks),
			Title:       track.Title,
			Lyrics:      track.Lyrics,
			TrackNumber: i + 1,
			CoverURL:    a.CoverURL,
			AudioURL:    fmt.Sprintf("https://drive.google.com/uc?export=download&id=%s", track.DriveID),
		}
	}

	return nil
}
