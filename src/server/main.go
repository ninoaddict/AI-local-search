package main

import (
	"math/rand"
	"src/server/api"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	api.Init()
}
