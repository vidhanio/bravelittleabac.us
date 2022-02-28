package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi"
	"github.com/vidhanio/bravelittleabac.us/server/music"
)

type Server struct {
	music       map[string]*music.Album
	timeStarted time.Time
	mux         *chi.Mux
}

func New(filename string) (*Server, error) {
	s := &Server{
		music: make(map[string]*music.Album),
		mux:   chi.NewRouter(),
	}

	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}

	err = json.NewDecoder(file).Decode(&s.music)
	if err != nil {
		return nil, err
	}

	s.mux.Use(JSONContentTypeMiddleware)

	s.registerRoutes()

	return s, err
}

func (s *Server) Start() error {
	s.timeStarted = time.Now()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return http.ListenAndServe(fmt.Sprintf(":%s", port), s.mux)
}
