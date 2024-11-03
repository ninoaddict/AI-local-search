package handlers

import (
	"net/http"
	"src/server/internal/models"
	"src/server/internal/services"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func HandleGeneticAlgo(c *gin.Context) {
	maxIterStr := c.Query("maxIter")
	initPopulationStr := c.Query("initPopulation")

	if maxIterStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "maxIter query parameter is required"})
		return
	}

	if initPopulationStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"Message": "initPopulation query parameter is required"})
		return
	}

	maxIter, _ := strconv.Atoi(maxIterStr)
	initPopulation, _ := strconv.Atoi(initPopulationStr)

	startTime := time.Now()
	initialPopulation, finalPopulation, iterations, bestState, numIter := services.GeneticAlgorithm(maxIter, initPopulation)
	endTime := time.Now()
	executionTime := endTime.Sub(startTime)

	response := models.GeneticResponse{
		InitialPopulation: convertSlice(initialPopulation),
		FinalPopulation:   convertSlice(finalPopulation),
		Iterations:        iterations,
		BestState:         *bestState,
		NumIter:           numIter,
		Time:              float64(executionTime.Microseconds()) / float64(1000),
	}
	c.IndentedJSON(http.StatusOK, response)
}

func convertSlice(arr []*models.State) []models.State {
	res := make([]models.State, len(arr))
	for i, ptr := range arr {
		res[i] = *ptr
	}
	return res
}
