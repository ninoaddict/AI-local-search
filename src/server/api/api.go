package api

import (
	"src/server/internal/handlers"

	"github.com/gin-gonic/gin"
)

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, application-json")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	}
}

func Init() {
	router := gin.Default()
	router.Use(corsMiddleware())
	// add handler methods

	// URL example: /genetic?maxIter=100&initPopulation=4
	router.GET("/genetic", handlers.HandleGeneticAlgo)
	// URL example: /steepest
	router.GET("/steepest", handlers.HandleHillClimbing)
	// URL example: /sideways?maxMove=200
	router.GET("/sideways", handlers.HandleHillClimbingSideways)
	// URL example: /random-restart?maxRestart=100
	router.GET("/random-restart", handlers.HandleRandomRestart)
	// URL example: /stochastic
	router.GET("/stochastic", handlers.HandleStochastic)
	// URL example: /simulated
	router.GET("/simulated", handlers.HandleSimulatedAnnealing)

	router.Run("localhost:8080")
}
