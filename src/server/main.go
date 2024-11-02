package main

// import "src/server/api"

import (
	// "src/server/internal/models"
	"fmt"
	"src/server/internal/services"
)

func main() {
	// api.Init()
	initial, final, iterations, _, _ := services.SimulatedAnnealing()
	fmt.Printf("Value: %d\n", initial.Value)
	initial.PrintState()
	fmt.Println("============================")
	fmt.Printf("Value: %d\n", final.Value)
	final.PrintState()

	for index, iter := range iterations {
		fmt.Printf("iter: %d, %v\n", index, iter)
	}
}
