package handlers

import (
	"net/http"
	"src/server/internal/models"
	"src/server/internal/services"
	"time"

	"github.com/gin-gonic/gin"
)

func HandleSimulatedAnnealing(c *gin.Context) {
	startTime := time.Now()
	initial, final, iterations, numIter, stuckIter := services.SimulatedAnnealing()
	endTime := time.Now()
	executionTime := endTime.Sub(startTime)

	response := models.Response{
		Initial:    *initial,
		Final:      *final,
		Iterations: iterations,
		NumIter:    numIter,
		Stuck:      stuckIter,
		Time:       float64(executionTime.Microseconds()) / float64(1000),
	}
	c.JSON(http.StatusOK, response)
}
