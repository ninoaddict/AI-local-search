package handlers

import (
	"net/http"
	"src/server/internal/models"
	"src/server/internal/services"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func HandleHillClimbing(c *gin.Context) {
	startTime := time.Now()
	initial, final, iterations, numIter := services.HillClimbing()
	endTime := time.Now()
	executionTime := endTime.Sub(startTime)

	response := models.Response{
		Initial:    *initial,
		Final:      *final,
		Iterations: iterations,
		NumIter:    numIter,
		Time:       float64(executionTime.Microseconds()) / float64(1000),
	}
	c.JSON(http.StatusOK, response)
}

func HandleHillClimbingSideways(c *gin.Context) {
	maxMoveStr := c.Query("maxMove")

	if maxMoveStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "maxMove query parameter is required"})
		return
	}

	maxMove, _ := strconv.Atoi(maxMoveStr)

	if maxMove < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "maxMove is required and has to be positive number"})
		return
	}

	startTime := time.Now()
	initial, final, iterations, numIter := services.HillClimbingSideways(maxMove)
	endTime := time.Now()
	executionTime := endTime.Sub(startTime)

	response := models.Response{
		Initial:    *initial,
		Final:      *final,
		Iterations: iterations,
		NumIter:    numIter,
		Time:       float64(executionTime.Microseconds()) / float64(1000),
	}
	c.JSON(http.StatusOK, response)
}

func HandleRandomRestart(c *gin.Context) {
	maxRestartStr := c.Query("maxRestart")

	if maxRestartStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "maxRestart query parameter is required"})
		return
	}

	maxRestart, _ := strconv.Atoi(maxRestartStr)

	if maxRestart < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "maxRestart is required and has to be positive number"})
		return
	}

	startTime := time.Now()
	initial, final, iterations, numRestart := services.RandomRestartHillClimbing(maxRestart)
	endTime := time.Now()
	executionTime := endTime.Sub(startTime)

	response := models.RestartResponse{
		Initial:    *initial,
		Final:      *final,
		Iterations: iterations,
		NumRestart: numRestart,
		Time:       float64(executionTime.Microseconds()) / float64(1000),
	}
	c.JSON(http.StatusOK, response)
}

func HandleStochastic(c *gin.Context) {
	startTime := time.Now()
	initial, final, iterations, numIter := services.StochasticHillClimbing()
	endTime := time.Now()
	executionTime := endTime.Sub(startTime)

	response := models.Response{
		Initial:    *initial,
		Final:      *final,
		Iterations: iterations,
		NumIter:    numIter,
		Time:       float64(executionTime.Microseconds()) / float64(1000),
	}
	c.JSON(http.StatusOK, response)
}
