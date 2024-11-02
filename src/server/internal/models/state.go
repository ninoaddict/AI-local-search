package models

import (
	"fmt"
	"math/rand"
	"time"
)

// i nusuk
// j baris
// k kolom

type State struct {
	Cubes   []int
	CurrSum []int
	Value   int
}

func (state *State) Init() {
	state.Cubes = []int{}
	for i := 1; i <= 125; i++ {
		state.Cubes = append(state.Cubes, i)
	}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	r.Shuffle(len(state.Cubes), func(i, j int) { state.Cubes[i], state.Cubes[j] = state.Cubes[j], state.Cubes[i] })

	// state.Cubes = []int{
	// 	25, 16, 80, 104, 90, 115, 98, 4, 1, 97, 42, 111, 85, 2, 75, 66, 72, 27, 102, 48, 67, 18, 119, 106, 5,
	// 	91, 77, 71, 6, 70, 52, 64, 117, 69, 13, 30, 118, 21, 123, 23, 26, 39, 92, 44, 114, 116, 17, 14, 73, 95,
	// 	47, 61, 45, 76, 86, 107, 43, 38, 33, 94, 89, 68, 63, 58, 37, 32, 93, 88, 83, 19, 40, 50, 81, 65, 79,
	// 	31, 53, 112, 109, 10, 12, 82, 34, 87, 100, 103, 3, 105, 8, 96, 113, 57, 9, 62, 74, 56, 120, 55, 49, 35,
	// 	121, 108, 7, 20, 59, 29, 28, 122, 125, 11, 51, 15, 41, 124, 84, 78, 54, 99, 24, 60, 36, 110, 46, 22, 101,
	// }

	state.CurrSum = []int{}
	for i := 0; i < 109; i++ {
		state.CurrSum = append(state.CurrSum, 0)
	}

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
	idxDiagonal1 := -1
	if j == k {
		idxDiagonal1 = 75 + i*2
	} else if k == 4-j {
		idxDiagonal1 = 75 + i*2 + 1
	}
	res = append(res, idxDiagonal1)

	// check diagonal-2
	idxDiagonal2 := -1
	if i == k {
		idxDiagonal2 = 85 + j*2
	} else if k == 4-i {
		idxDiagonal2 = 85 + j*2 + 1
	}
	res = append(res, idxDiagonal2)

	// check diagonal-3
	idxDiagonal3 := -1
	if i == j {
		idxDiagonal3 = 95 + k*2
	} else if i == 4-j {
		idxDiagonal3 = 95 + k*2 + 1
	}
	res = append(res, idxDiagonal3)

	idxDiagonalSpace := -1
	if i == j && j == k {
		idxDiagonalSpace = 105
	} else if j == 4-i && i == k {
		idxDiagonalSpace = 106
	} else if j == k && i == 4-j {
		idxDiagonalSpace = 107
	} else if i == j && j == 4-k {
		idxDiagonalSpace = 108
	}
	res = append(res, idxDiagonalSpace)

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

			for k := 0; k < 7; k++ {
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

	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	rndFirst := r.Intn(len(arrayFirst))
	first = arrayFirst[rndFirst]
	second = arraySecond[rndFirst]

	newState := State{Value: minVal}
	newState.Cubes = make([]int, len(state.Cubes))
	copy(newState.Cubes, state.Cubes)
	newState.CurrSum = make([]int, len(state.CurrSum))
	copy(newState.CurrSum, state.CurrSum)

	affectedArea1 := getAffectedArea(first)
	affectedArea2 := getAffectedArea(second)

	for k := 0; k < 7; k++ {
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
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	first := r.Intn(125)
	second := r.Intn(125)

	for first == second {
		second = r.Intn(125)
	}

	newState := State{}
	newState.Cubes = make([]int, len(state.Cubes))
	copy(newState.Cubes, state.Cubes)
	newState.CurrSum = make([]int, len(state.CurrSum))
	copy(newState.CurrSum, state.CurrSum)

	currVal := state.Value
	affectedArea1 := getAffectedArea(first)
	affectedArea2 := getAffectedArea(second)

	for k := 0; k < 7; k++ {
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
