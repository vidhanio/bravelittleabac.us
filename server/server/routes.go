package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/vidhanio/bravelittleabac.us/server/music"
)

func (s *Server) registerRoutes() {
	s.mux.Get("/albums", s.getAlbums)
	s.mux.Get("/albums/{album-path}", s.getAlbum)
	s.mux.Get("/albums/{album-path}/cover", s.getAlbumCover)
	s.mux.Get("/albums/{album-path}/tracks", s.getTracks)
	s.mux.Get("/albums/{album-path}/tracks/{track-number}", s.getTrack)
}

type errorResponse struct {
	Error string      `json:"error"`
	Data  interface{} `json:"data"`
}

type albumsReponse struct {
	Error string         `json:"error"`
	Data  []*music.Album `json:"data"`
}

type albumReponse struct {
	Error string       `json:"error"`
	Data  *music.Album `json:"data"`
}

type tracksResponse struct {
	Error string        `json:"error"`
	Data  []music.Track `json:"data"`
}

type trackResponse struct {
	Error string      `json:"error"`
	Data  music.Track `json:"data"`
}

func httpError(w http.ResponseWriter, message string, code int) {
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(errorResponse{message, nil})
}

func (s *Server) getAlbums(w http.ResponseWriter, r *http.Request) {
	albums := make([]*music.Album, 0, len(s.music))
	for _, album := range s.music {
		albums = append(albums, album)
	}

	json.NewEncoder(w).Encode(albumsReponse{"", albums})
}

func (s *Server) getAlbum(w http.ResponseWriter, r *http.Request) {
	albumPath := chi.URLParam(r, "album-path")
	album, ok := s.music[albumPath]
	if !ok {
		httpError(w, "not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(albumReponse{"", album})
}

func (s *Server) getTracks(w http.ResponseWriter, r *http.Request) {
	albumPath := chi.URLParam(r, "album-path")
	album, ok := s.music[albumPath]
	if !ok {
		httpError(w, "not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(tracksResponse{"", album.Tracks})
}

func (s *Server) getTrack(w http.ResponseWriter, r *http.Request) {
	albumPath := chi.URLParam(r, "album-path")
	album, ok := s.music[albumPath]
	if !ok {
		httpError(w, "not found", http.StatusNotFound)
		return
	}

	trackNumber, err := strconv.Atoi(chi.URLParam(r, "track-number"))
	if err != nil {
		httpError(w, err.Error(), http.StatusBadRequest)
		return
	}

	if trackNumber < 1 || trackNumber > len(album.Tracks) {
		httpError(w, "not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(trackResponse{"", album.Tracks[trackNumber-1]})
}

func (s *Server) getAlbumCover(w http.ResponseWriter, r *http.Request) {
	albumPath := chi.URLParam(r, "album-path")
	album, ok := s.music[albumPath]
	if !ok {
		httpError(w, "not found", http.StatusNotFound)
		return
	}

	coverPath := fmt.Sprintf("data/music/%s/cover.jpg", album.Path)

	w.Header().Set("Content-Type", "image/jpeg")
	f, err := os.Open(coverPath)
	if err != nil {
		httpError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.ServeContent(w, r, "", s.timeStarted, f)
}
