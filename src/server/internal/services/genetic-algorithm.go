package services

import (
	"fmt"
	"math/rand"
	"src/server/internal/models"
	"time"
)

func GeneticAlgorithm(maxIteration int, initPopulation int) ([]*models.State, []*models.State, []models.GeneticIteration, *models.State, int) {
	initialPops := []*models.State{}
	for i := 0; i < initPopulation; i++ {
		newState := models.State{}
		newState.Init()
		initialPops = append(initialPops, &newState)
	}

	iterations := []models.GeneticIteration{}

	valSum := 0
	minVal := 10000000
	minIdx := 0
	population := initialPops
	for iter := 1; iter <= maxIteration; iter++ {
		newPopulation := []*models.State{}
		valSum = 0
		minVal = 10000000
		minIdx = 0
		for i := 0; i < len(population); i++ {
			x := randomSelection(population)
			y := randomSelection(population)
			child := reproduce(x, y)
			fmt.Printf("%d %d\n", x.Value, y.Value)
			r := rand.New(rand.NewSource(time.Now().UnixNano()))
			if r.Float64() < 0.1 {
				mutation(child)
			}
			valSum += child.Value
			if minVal > child.Value {
				minVal = child.Value
				minIdx = i
			}
			newPopulation = append(newPopulation, child)
		}
		population = newPopulation
		avgVal := float64(valSum) / float64(len(population))
		iterations = append(iterations, models.GeneticIteration{MinValue: minVal, AvgValue: avgVal})

		if minVal == 0 {
			return initialPops, population, iterations, population[minIdx], iter
		}
	}
	return initialPops, population, iterations, population[minIdx], maxIteration
}

func fitness(state *models.State) float64 {
	return 1.0 / (1.0 + float64(state.Value))
}

func randomSelection(population []*models.State) *models.State {
	prefSum := []float64{0}
	sum := 0.0
	for i := 0; i < len(population); i++ {
		fit := fitness(population[i]) * 1000
		sum += fit
		prev := prefSum[i]
		prefSum = append(prefSum, prev+fit)
	}

	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	selectedVal := r.Float64() * sum

	lo := 0
	hi := len(prefSum)
	ans := -1
	for lo <= hi {
		mid := (lo + hi) / 2
		if prefSum[mid] <= selectedVal {
			ans = mid
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}

	return population[ans]
}

func reproduce(p1 *models.State, p2 *models.State) *models.State {
	child := models.State{}
	vis := make([]bool, 125)
	child.InitEmptyCubes()
	start, end := randomSegment()
	rangeLen := (end - start + 1 + 125) % 125
	for i := 0; i < rangeLen; i++ {
		child.Cubes[(start+i)%125] = p1.Cubes[(start+i)%125]
		vis[child.Cubes[(start+i)%125]-1] = true
	}

	i := 0
	j := 0

	for i < 125 && j < 125 {
		if child.Cubes[i] != 0 {
			i++
			continue
		}
		if vis[p2.Cubes[j]-1] {
			j++
			continue
		}
		child.Cubes[i] = p2.Cubes[j]
		i++
		j++
	}
	child.InitVal()
	return &child
}

func randomSegment() (int, int) {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	start := r.Intn(125)
	end := r.Intn(125)
	for start == end {
		end = r.Intn(125)
	}
	return start, end
}

func mutation(state *models.State) {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	first := r.Intn(125)
	second := r.Intn(125)
	segLen := (second - first + 1 + 125) % 125

	rot := 0
	if segLen != 0 {
		rot = r.Intn(segLen)
	}

	temp := make([]int, segLen)
	for i := 0; i < segLen; i++ {
		srcIdx := (first + i) % 125
		targetIdx := (i + rot) % segLen
		temp[targetIdx] = state.Cubes[srcIdx]
	}

	for i := 0; i < segLen; i++ {
		state.Cubes[(first+i)%125] = temp[i]
	}
}
