package services

import (
	"src/server/internal/models"
)

// HillClimbing implements the Steepest Hill Climbing algorithm.
func HillClimbing() (*models.State, *models.State, []models.Iteration, int) {
	initial := &models.State{}
	initial.Init()

	current := initial
	iterations := []models.Iteration{}
	iter := 0

	for {
		iter++
		neighbor, first, second := current.BestNeighbor()

		// If no better neighbor is found, return the result.
		if neighbor.Value >= current.Value {
			return initial, current, iterations, iter
		}

		// Move to the better neighbor.
		current = neighbor
		iterations = append(iterations, models.Iteration{
			First:  first,
			Second: second,
			Value:  current.Value,
			Exp:    1, // For Steepest Hill Climbing, Exp can be kept constant.
		})
	}
}

// HillClimbingSideways implements the Steepest Hill Climbing with Sideways Moves.
func HillClimbingSideways(maxMove int) (*models.State, *models.State, []models.Iteration, int) {
	initial := &models.State{}
	initial.Init()

	current := initial
	iterations := []models.Iteration{}
	iter := 0
	counterMove := 0 // Counter for sideways moves.

	for {
		iter++
		neighbor, first, second := current.BestNeighbor()

		// If a strictly better neighbor is found, move to it.
		if neighbor.Value > current.Value {
			return initial, current, iterations, iter
		} else if neighbor.Value == current.Value {
			// Handle sideways moves if the value is equal to the current state.
			if counterMove < maxMove {
				counterMove++
				current = neighbor
				iterations = append(iterations, models.Iteration{
					First:  first,
					Second: second,
					Value:  current.Value,
					Exp:    1, // Sideways move; keeping Exp constant.
				})
			} else {
				// Return if the maximum number of sideways moves is reached.
				return initial, current, iterations, iter
			}
		} else {
			// Reset counterMove and move to a better neighbor if found.
			counterMove = 0
			current = neighbor
			iterations = append(iterations, models.Iteration{
				First:  first,
				Second: second,
				Value:  current.Value,
				Exp:    1,
			})
		}
	}
}
