package services

import (
	"math"
	"math/rand"
	"src/server/internal/models"
)

func SimulatedAnnealing() (*models.State, *models.State, []models.Iteration, int, int) {
	initial := &models.State{}
	initial.Init()

	current := initial
	iterations := []models.Iteration{}
	iter := 0
	stuck := 0

	for t := 1; ; t++ {
		iter++
		T := schedule(t)

		if T <= 0.01 || current.Value == 0 {
			return initial, current, iterations, iter, stuck
		}

		neighbor, first, second := current.RandomNeighbor()

		deltaE := current.Value - neighbor.Value

		if deltaE > 0 {
			current = neighbor
			iterations = append(iterations, models.Iteration{
				First:  first,
				Second: second,
				Value:  current.Value,
				Exp:    1,
			})
		} else {
			probability := math.Exp(float64(deltaE) / T)
			if rand.Float64() <= probability {
				current = neighbor
				stuck++
				iterations = append(iterations, models.Iteration{
					First:  first,
					Second: second,
					Value:  current.Value,
					Exp:    probability,
				})
			}
		}
	}
}

func schedule(t int) float64 {
	initialTemperature := 9000000.0
	coolingRate := 0.9995

	T := initialTemperature * math.Pow(coolingRate, float64(t))

	return T
}
