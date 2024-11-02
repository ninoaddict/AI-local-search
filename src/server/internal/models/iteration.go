package models

import "fmt"

type Iteration struct {
	First  int
	Second int
	Value  int
	Exp    float64
}

type GeneticIteration struct {
	AvgValue float64
	MinValue int
}

func (iter Iteration) String() string {
	return fmt.Sprintf("Iteration { First: %d, Second: %d, Value: %d, Exp: %.2f }", iter.First, iter.Second, iter.Value, iter.Exp)
}
