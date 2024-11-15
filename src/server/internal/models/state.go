package models

import (
	"fmt"
	"math/rand"
)

// i nusuk
// j baris
// k kolom

type State struct {
	Cubes   []int
	CurrSum []int
	Value   int
}

func (state *State) InitEmptyCubes() {
	state.Cubes = make([]int, 125)
}

func (state *State) InitVal() {
	state.CurrSum = make([]int, 109)
	// row
	idx := 0
	for i := 0; i < 5; i++ {
		for j := 0; j < 5; j++ {
			sum := 0
			for k := 0; k < 5; k++ {
				absIdx := i*5*5 + j*5 + k
				sum += state.Cubes[absIdx]
			}
			state.CurrSum[idx] = sum
			idx++
		}
	}

	// column
	for i := 0; i < 5; i++ {
		for k := 0; k < 5; k++ {
			sum := 0
			for j := 0; j < 5; j++ {
				absIdx := i*5*5 + j*5 + k
				sum += state.Cubes[absIdx]
			}
			state.CurrSum[idx] = sum
			idx++
		}
	}

	// tiang
	for j := 0; j < 5; j++ {
		for k := 0; k < 5; k++ {
			sum := 0
			for i := 0; i < 5; i++ {
				absIdx := i*5*5 + j*5 + k
				sum += state.Cubes[absIdx]
			}
			state.CurrSum[idx] = sum
			idx++
		}
	}

	// calculate the first diagonal plane
	for i := 0; i < 5; i++ {
		sum1 := 0
		sum2 := 0
		for j := 0; j < 5; j++ {
			absIdx1 := i*5*5 + j*5 + j
			absIdx2 := i*5*5 + j*5 + (4 - j)
			sum1 += state.Cubes[absIdx1]
			sum2 += state.Cubes[absIdx2]
		}
		state.CurrSum[idx] = sum1
		idx++
		state.CurrSum[idx] = sum2
		idx++
	}

	// calculate the second diagonal plane
	for j := 0; j < 5; j++ {
		sum1 := 0
		sum2 := 0
		for i := 0; i < 5; i++ {
			absIdx1 := i*5*5 + j*5 + i
			absIdx2 := i*5*5 + j*5 + (4 - i)
			sum1 += state.Cubes[absIdx1]
			sum2 += state.Cubes[absIdx2]
		}
		state.CurrSum[idx] = sum1
		idx++
		state.CurrSum[idx] = sum2
		idx++
	}

	// calculate the third diagonal plane
	for k := 0; k < 5; k++ {
		sum1 := 0
		sum2 := 0
		for j := 0; j < 5; j++ {
			absIdx1 := j*5*5 + j*5 + k
			absIdx2 := (4-j)*5*5 + j*5 + k
			sum1 += state.Cubes[absIdx1]
			sum2 += state.Cubes[absIdx2]
		}
		state.CurrSum[idx] = sum1
		idx++
		state.CurrSum[idx] = sum2
		idx++
	}

	// space diagonal
	sum1 := 0
	sum2 := 0
	sum3 := 0
	sum4 := 0
	for i := 0; i < 5; i++ {
		absIdx1 := i*5*5 + i*5 + i
		absIdx2 := i*5*5 + (4-i)*5 + i
		absIdx3 := (4-i)*5*5 + i*5 + i
		absIdx4 := (4-i)*5*5 + (4-i)*5 + i
		sum1 += state.Cubes[absIdx1]
		sum2 += state.Cubes[absIdx2]
		sum3 += state.Cubes[absIdx3]
		sum4 += state.Cubes[absIdx4]
	}
	state.CurrSum[idx] = sum1
	idx++
	state.CurrSum[idx] = sum2
	idx++
	state.CurrSum[idx] = sum3
	idx++
	state.CurrSum[idx] = sum4
	idx++

	res := 0
	for i := 0; i < 109; i++ {
		res += ((315 - state.CurrSum[i]) * (315 - state.CurrSum[i]))
	}
	state.Value = res
}

func (state *State) Init() {
	state.Cubes = []int{}
	for i := 1; i <= 125; i++ {
		state.Cubes = append(state.Cubes, i)
	}
	rand.Shuffle(len(state.Cubes), func(i, j int) { state.Cubes[i], state.Cubes[j] = state.Cubes[j], state.Cubes[i] })
	state.InitVal()
}

func getAffectedArea(idx int) []int {
	res := []int{}
	i := idx / 25
	j := (idx % 25) / 5
	k := idx % 5

	// check row
	idxRow := 5*i + j
	res = append(res, idxRow)

	// check col
	idxCol := 25 + 5*i + k
	res = append(res, idxCol)

	// check tiang
	idxTiang := 50 + 5*j + k
	res = append(res, idxTiang)

	// check diagonal-1
	if j == k {
		res = append(res, 75+i*2)
	} else {
		res = append(res, -1)
	}

	if k == 4-j {
		res = append(res, 75+i*2+1)
	} else {
		res = append(res, -1)
	}

	// check diagonal-2
	if i == k {
		res = append(res, 85+j*2)
	} else {
		res = append(res, -1)
	}

	if k == 4-i {
		res = append(res, 85+j*2+1)
	} else {
		res = append(res, -1)
	}

	// check diagonal-3
	if i == j {
		res = append(res, 95+k*2)
	} else {
		res = append(res, -1)
	}

	if i == 4-j {
		res = append(res, 95+k*2+1)
	} else {
		res = append(res, -1)
	}

	// check space diagonal

	if i == j && j == k {
		res = append(res, 105)
	} else {
		res = append(res, -1)
	}
	if j == 4-i && i == k {
		res = append(res, 106)
	} else {
		res = append(res, -1)
	}
	if j == k && i == 4-j {
		res = append(res, 107)
	} else {
		res = append(res, -1)
	}
	if i == j && j == 4-k {
		res = append(res, 108)
	} else {
		res = append(res, -1)
	}
	return res
}

func (state *State) BestNeighbor() (*State, int, int) {
	minVal := 1000000
	first := -1
	second := -1
	arrayFirst := []int{}
	arraySecond := []int{}
	for i := 0; i < 125; i++ {
		for j := i + 1; j < 125; j++ {
			currVal := int(state.Value)
			affectedArea1 := getAffectedArea(i)
			affectedArea2 := getAffectedArea(j)

			for k := 0; k < 13; k++ {
				area1 := affectedArea1[k]
				area2 := affectedArea2[k]
				if area1 != area2 {
					if area1 != -1 {
						currVal -= (315 - state.CurrSum[area1]) * (315 - state.CurrSum[area1])
						currVal += (315 - (state.CurrSum[area1] + state.Cubes[j] - state.Cubes[i])) * (315 - (state.CurrSum[area1] + state.Cubes[j] - state.Cubes[i]))
					}
					if area2 != -1 {
						currVal -= (315 - state.CurrSum[area2]) * (315 - state.CurrSum[area2])
						currVal += (315 - (state.CurrSum[area2] + state.Cubes[i] - state.Cubes[j])) * (315 - (state.CurrSum[area2] + state.Cubes[i] - state.Cubes[j]))
					}
				}
			}

			if currVal < minVal {
				minVal = currVal
				arrayFirst = []int{}
				arraySecond = []int{}
				arrayFirst = append(arrayFirst, i)
				arraySecond = append(arraySecond, j)
			} else if currVal == minVal {
				arrayFirst = append(arrayFirst, i)
				arraySecond = append(arraySecond, j)
			}
		}
	}

	rndFirst := rand.Intn(len(arrayFirst))
	first = arrayFirst[rndFirst]
	second = arraySecond[rndFirst]

	newState := State{Value: minVal}
	newState.Cubes = make([]int, len(state.Cubes))
	copy(newState.Cubes, state.Cubes)
	newState.CurrSum = make([]int, len(state.CurrSum))
	copy(newState.CurrSum, state.CurrSum)

	affectedArea1 := getAffectedArea(first)
	affectedArea2 := getAffectedArea(second)

	for k := 0; k < 13; k++ {
		area1 := affectedArea1[k]
		area2 := affectedArea2[k]
		if area1 != area2 {
			if area1 != -1 {
				newState.CurrSum[area1] = newState.CurrSum[area1] + newState.Cubes[second] - newState.Cubes[first]
			}
			if area2 != -1 {
				newState.CurrSum[area2] = newState.CurrSum[area2] + newState.Cubes[first] - newState.Cubes[second]
			}
		}
	}

	temp := newState.Cubes[first]
	newState.Cubes[first] = newState.Cubes[second]
	newState.Cubes[second] = temp
	return &newState, first, second
}

func (state *State) RandomNeighbor() (*State, int, int) {
	first := rand.Intn(125)
	second := rand.Intn(125)

	for first == second {
		second = rand.Intn(125)
	}

	newState := State{}
	newState.Cubes = make([]int, len(state.Cubes))
	copy(newState.Cubes, state.Cubes)
	newState.CurrSum = make([]int, len(state.CurrSum))
	copy(newState.CurrSum, state.CurrSum)

	currVal := state.Value
	affectedArea1 := getAffectedArea(first)
	affectedArea2 := getAffectedArea(second)

	for k := 0; k < 13; k++ {
		area1 := affectedArea1[k]
		area2 := affectedArea2[k]
		if area1 != area2 {
			if area1 != -1 {
				currVal -= (315 - state.CurrSum[area1]) * (315 - state.CurrSum[area1])
				currVal += (315 - (state.CurrSum[area1] + state.Cubes[second] - state.Cubes[first])) * (315 - (state.CurrSum[area1] + state.Cubes[second] - state.Cubes[first]))
				newState.CurrSum[area1] = newState.CurrSum[area1] + newState.Cubes[second] - newState.Cubes[first]
			}
			if area2 != -1 {
				currVal -= (315 - state.CurrSum[area2]) * (315 - state.CurrSum[area2])
				currVal += (315 - (state.CurrSum[area2] + state.Cubes[first] - state.Cubes[second])) * (315 - (state.CurrSum[area2] + state.Cubes[first] - state.Cubes[second]))
				newState.CurrSum[area2] = newState.CurrSum[area2] + newState.Cubes[first] - newState.Cubes[second]
			}
		}
	}

	temp := newState.Cubes[first]
	newState.Cubes[first] = newState.Cubes[second]
	newState.Cubes[second] = temp

	newState.Value = currVal
	return &newState, first, second
}

func (state *State) PrintState() {
	for i := 0; i < 5; i++ {
		fmt.Printf("Layer %d\n", i+1)
		for j := 0; j < 5; j++ {
			for k := 0; k < 5; k++ {
				fmt.Printf("%d\t", state.Cubes[i*25+j*5+k])
			}
			fmt.Println()
		}
		fmt.Println()
	}
}
