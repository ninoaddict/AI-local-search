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
		iterations = append(iterations, models.Iteration{
			First:  first,
			Second: second,
			Value:  current.Value,
			Exp:    1,
		})
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
				iterations = append(iterations, models.Iteration{
					First:  first,
					Second: second,
					Value:  current.Value,
					Exp:    1,
				})
			} else {
				return initial, current, iterations, iter
			}
		} else {
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

func RandomRestartHillClimbing(maxRestart int) (*models.State, *models.State, []models.RestartIteration, int) {
	restartIteration := []models.RestartIteration{}
	counter := 0

	best := &models.State{}
	best.Init()
	best.Value = 10000000

	for counter < maxRestart {
		counter++
		init, final, iteration, iter := HillClimbing()
		restartIteration = append(restartIteration, models.RestartIteration{
			Initial: *init,
			Final:   *final,
			Iter:    iteration,
			NumIter: iter,
		})
		if final.Value < best.Value {
			best = final
		}
		if best.Value == 0 {
			break
		}
	}

	return &restartIteration[0].Initial, best, restartIteration, counter
}

func StochasticHillClimbing() (*models.State, *models.State, []models.Iteration, int) {
	initial := &models.State{}
	initial.Init()

	current := initial
	iterations := []models.Iteration{}
	counter := 0

	for counter < 800000 {
		counter++
		neighbor, first, second := current.RandomNeighbor()

		if neighbor.Value < current.Value {
			current = neighbor
			iterations = append(iterations, models.Iteration{
				First:  first,
				Second: second,
				Value:  current.Value,
				Exp:    1,
			})
		}
		if current.Value == 0 {
			return initial, current, iterations, counter
		}
	}
	return initial, current, iterations, counter
}
