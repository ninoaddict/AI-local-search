package main

// import "src/server/api"

import (
	// "src/server/internal/models"
	"fmt"
	"src/server/internal/services"
)

func main() {
	// api.Init()
	initial, final, _, _ := services.HillClimbingSideways(100)
	fmt.Printf("Value: %d\n", initial.Value)
	initial.PrintState()
	fmt.Println("============================")
	fmt.Printf("Value: %d\n", final.Value)
	final.PrintState()
}
