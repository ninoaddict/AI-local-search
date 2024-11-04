# DIAGONAL MAGIC CUBE

A **5x5x5 diagonal magic cube** is a three-dimensional extension of a magic square, where the cube consists of 5 layers, each being a 5x5 grid of cells. The goal is to fill the cube with distinct integers from 1 to 125 such that:

1. **Rows, Columns, and Pillars**: The sums of the numbers in each row, column, and pillar (vertical line going through each layer) must all be equal.
2. **Main Diagonals**:
   - The cube should maintain the magic property along the main diagonals in each 2D layer (both forward and backward diagonals).
   - It should also satisfy the magic property for the four main space diagonals, each extending from one corner of the cube to its opposite corner.

### Problem Goal

Construct a 5x5x5 arrangement of numbers where each of the described properties holds true, making it a valid diagonal magic cube. This configuration is challenging due to the multiple conditions that must simultaneously be satisfied.

This repository provides a comprehensive solution to the **5x5x5 diagonal magic cube problem** using a range of local search algorithms.

## Algorithms Implemented

The solution employs various local search techniques, including:

#### 1. **Hill Climbing Variants**
- **Steepest-Ascent Hill Climbing**: Evaluates all neighboring solutions and moves to the best one to maximize progress.
- **Sideways Move Handling**: Allows limited sideways moves to escape plateaus.
- **Random Restart**: Runs hill climbing multiple times from different starting points to avoid local optima.
- **Stochastic Hill Climbing**: Chooses a random neighboring solution with potential improvement.

#### 2. **Simulated Annealing**
- Uses a probabilistic approach to escape local optima by allowing non-improving moves with a decreasing likelihood over time, inspired by the physical annealing process.

#### 3. **Genetic Algorithm (GA)**
- Simulates natural selection to evolve a population of candidate solutions over generations through selection, crossover, and mutation to find an optimal or near-optimal configuration.


## How to Run

You can clone or download the code using compressed zip file.
```bash
git clone https://github.com/ninoaddict/AI-local-search.git
```

You need to run 2 main programs (frontend and backend). 

#### Run the frontend (clients)
Move to ```src/clients``` directory and run this command

If you have not installed all dependencies for the clients (node modules), run this command:
```bash
npm install
```

After all dependecies are installed, run the frontend using this command initially:
```bash
npm start
```

#### Run the backend (server)
Move to ```src/server``` directory and run this command

If you have not installed all dependencies for the server, run this command initially:
```bash
go get
```

After all dependecies are gathered, run the backend using this command:
```bash
go run main.go
```

The frontend need the server (backend) to run first to reach any services provided by the server.  

#### Task Assigments
| **NIM**           | **Task**                                                                                        |
|-------------------|-------------------------------------------------------------------------------------------------|
| `13522068`        | Server (State, Genetic Algorithm, API setup, Handler for Genetic Algorithm), Report             |
| `13522093`        | Clients (UI) + Video Player, Report                                                             |
| `13522098`        | Server (Hill Climbing, Simulated Annealing, Handler for Hill Climbing ada Simulated Annealing)  |
| `13522118`        | Clients (UI) + Video Player, Report                                                             |
