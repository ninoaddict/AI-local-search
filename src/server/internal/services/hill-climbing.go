package services

import (
	"src/server/internal/models"
)

func HillClimbing() (*models.State, *models.State, []models.Iteration, int) {

	initial := &models.State{}
	initial.Init()

	current := initial

	iterations := []models.Iteration{}
	iter := 0

	for {
		iter++
		neighbor, first, second := current.BestNeighbor()
		if neighbor.Value >= current.Value {
			return initial, current, iterations, iter
		}
		current = neighbor
		iterations = append(iterations, models.Iteration{First: first, Second: second, Value: current.Value, Exp: 1})
	}
}

func HillClimbingSideways(maxMove int) (*models.State, *models.State, []models.Iteration, int) {
	initial := &models.State{}
	initial.Init()

	current := initial

	iterations := []models.Iteration{}
	iter := 0
	counterMove := 0

	for {
		iter++
		neighbor, first, second := current.BestNeighbor()
		if neighbor.Value > current.Value {
			return initial, current, iterations, iter
		} else if neighbor.Value == current.Value {
			if counterMove < maxMove {
				counterMove++
				current = neighbor
				iterations = append(iterations, models.Iteration{First: first, Second: second, Value: current.Value, Exp: 1})
			} else {
				return initial, current, iterations, iter
			}
		} else {
			counterMove = 0
			current = neighbor
			iterations = append(iterations, models.Iteration{First: first, Second: second, Value: current.Value, Exp: 1})
		}
	}
}
