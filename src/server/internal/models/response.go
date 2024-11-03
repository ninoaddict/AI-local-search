package models

type Response struct {
	Initial    State       `json:"initial"`
	Final      State       `json:"final"`
	Iterations []Iteration `json:"iterations"`
	NumIter    int         `json:"numIter"`
	Stuck      int         `json:"stuckIter"`
	Time       float64     `json:"time"`
}

type RestartResponse struct {
	Initial    State              `json:"initial"`
	Final      State              `json:"final"`
	Iterations []RestartIteration `json:"iterations"`
	NumRestart int                `json:"numRestart"`
	Time       float64            `json:"time"`
}

type GeneticResponse struct {
	InitialPopulation []State            `json:"initialPopulation"`
	FinalPopulation   []State            `json:"finalPopulation"`
	Iterations        []GeneticIteration `json:"iterations"`
	BestState         State              `json:"bestState"`
	NumIter           int                `json:"numIter"`
	Time              float64            `json:"time"`
}
