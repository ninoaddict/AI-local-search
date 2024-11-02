package main

// import "src/server/api"

import (
	"fmt"
	"math/rand"
	"src/server/internal/services"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	init, fin, _, _, _ := services.GeneticAlgorithm(10, 4)
	for i := 0; i < len(init); i++ {
		fmt.Printf("Value: %d\n", init[i].Value)
		init[i].PrintState()
		fmt.Println("============================")
	}
	fmt.Println("============================")

	for i := 0; i < len(fin); i++ {
		fmt.Printf("Value: %d\n", fin[i].Value)
		fin[i].PrintState()
		fmt.Println("============================")
	}
	// for index, iter := range iterations {
	// 	fmt.Printf("iter: %d, %d, %f\n", index, iter.MinValue, iter.AvgValue)
	// }
}
