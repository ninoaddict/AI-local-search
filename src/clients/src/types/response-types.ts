// Type for State dan Iteration
export type State = {
  Cubes: number[];
  CurrSum: number[];
  Value: number;
};

export type Iteration = {
  First: number;
  Second: number;
  Value: number;
  Exp: number;
};

export type GeneticIteration = {
  AvgValue: number;
  MinValue: number;
};

export type RestartIteration = {
  Initial: State;
  Final: State;
  Iter: Iteration[];
  NumIter: number;
};

// Types for response
export type Response = {
  initial: State;
  final: State;
  iterations: Iteration[];
  numIter: number;
  stuckIter: number;
  time: number;
};

export type RestartResponse = {
  initial: State;
  final: State;
  iterations: RestartIteration[];
  numRestart: number;
  time: number;
};

export type GeneticResponse = {
  initialPopulation: State[];
  finalPopulation: State[];
  iterations: GeneticIteration[];
  bestState: State;
  numIter: number;
  time: number;
};

// General API Response Type
export type ApiResponse = Response | RestartResponse | GeneticResponse;
