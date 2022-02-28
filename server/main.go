package main

import (
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/vidhanio/bravelittleabac.us/server/server"
)

func main() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	log.Debug().Msg("Creating server")
	s, err := server.New("data/music.json")
	if err != nil {
		log.Panic().Err(err).Msg("Failed to create server")
	}

	log.Debug().Msg("Starting server")
	err = s.Start()
	if err != nil {
		log.Panic().Err(err).Msg("Failed to start server")
	}
}
