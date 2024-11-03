package models

type Response struct {
	// ubah yang sesuai
}

type GeneticResponse struct {
	InitialPopulation []State            `json:"initialPopulation"`
	FinalPopulation   []State            `json:"finalPopulation"`
	Iterations        []GeneticIteration `json:"iterations"`
	BestState         State              `json:"bestState"`
	NumIter           int                `json:"numIter"`
	Time              float64            `json:"time"`
}
