import VideoPlayer from "./components/video-player";
import AlgorithmSelection from "./components/algorithm-selection";
import { useState } from "react";
import CubeState from "./components/cube-state";
import { ApiResponse, Iteration } from "./types/response-types";
import { ValuePlot } from "./components/value-plot";
import { GeneticIteration } from "./types/response-types";
import { GeneticPlot } from "./components/genetic-value-plot";

function generateRandomMatrix(): number[] {
  return Array.from({ length: 125 }, () => Math.floor(Math.random() * 125) + 1);
}

function generateSequentialArray(size: number) {
  return Array.from({ length: size }, (_, index) => index + 1);
}

const generateSequentialIndexPairs = (size: number): [number, number][] => {
  const pairs: [number, number][] = [];

  for (let i = 0; i < size; i++) {
    pairs.push([i, i + 1]);
  }

  return pairs;
};

const generateRandomIndexPairs = (
  size: number,
  pairCount: number
): [number, number][] => {
  const pairs = new Set<string>();
  while (pairs.size < pairCount) {
    const index1 = Math.floor(Math.random() * size);
    const index2 = Math.floor(Math.random() * size);
    if (index1 !== index2) {
      pairs.add(
        JSON.stringify([Math.min(index1, index2), Math.max(index1, index2)])
      );
    }
  }
  return Array.from(pairs).map((pair) => JSON.parse(pair) as [number, number]);
};

const chartData: Iteration[] = [
  { First: 1, Second: 2, Value: 10, Exp: 100 },
  { First: 2, Second: 3, Value: 20, Exp: 200 },
  { First: 3, Second: 4, Value: 30, Exp: 300 },
  // Tambahkan data lainnya jika diperlukan
];

const App = () => {
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);

  const handleResponseData = (data: ApiResponse) => {
    console.log(data);
    setResponseData(data);
  };

  return (
    <div>
      <AlgorithmSelection onSearch={handleResponseData} />

      {/* Render response data berdasarkan tipe */}
      {responseData && (
        <div className="p-4 mt-4 bg-gray-100 rounded-lg shadow-md">
          {"initialPopulation" in responseData && (
            <>
              <h3>Genetic Algorithm Response</h3>
              <div>Best Objective Function: {responseData.bestState.Value}</div>
              <div>Number of Iteration: {responseData.numIter}</div>
              <div>Time: {responseData.time}</div>
              <div>
                Number of Population: {responseData.finalPopulation.length}
              </div>

              <div>BEST STATE </div>
              <CubeState
                matrixData={responseData.bestState.Cubes}
                value={responseData.bestState.Value}
              />

              <GeneticPlot chartData={responseData.iterations} />

              <div>Initial Population</div>
              {responseData.initialPopulation.map((state, index) => (
                <CubeState
                  key={index}
                  matrixData={state.Cubes}
                  value={state.Value}
                />
              ))}

              <div>Final Population</div>
              {responseData.finalPopulation.map((state, index) => (
                <CubeState
                  key={index}
                  matrixData={state.Cubes}
                  value={state.Value}
                />
              ))}
            </>
          )}
          {"numRestart" in responseData && (
            <>
              <h3>Random Restart Hill-Climbing Response</h3>
              <div>Restart Time {responseData.numRestart} </div>
              <div>DURATION {responseData.time} </div>

              <div>INITIAL </div>
              <CubeState
                matrixData={responseData.initial.Cubes}
                value={responseData.initial.Value}
              />

              <div>FINAL</div>
              <CubeState
                matrixData={responseData.final.Cubes}
                value={responseData.final.Value}
              />

              <div>PLOT</div>
              {responseData.iterations.map((iteration, index) => (
                <div>
                  <p>Iteration {index}</p>
                  <ValuePlot chartData={iteration.Iter} />
                </div>
              ))}

              <div>VIDEO </div>
              {responseData.iterations.map((iteration, index) => (
                <div>
                  <p>
                    Iteration for restart {index} : {iteration.NumIter}
                  </p>
                  <VideoPlayer
                    key={index}
                    initialArray={responseData.initial.Cubes}
                    indexPairs={iteration.Iter}
                  />
                </div>
              ))}
            </>
          )}
          {"stuckIter" in responseData && (
            <>
              <div>stuckIter: {responseData.stuckIter}</div>
              <div>numIter: {responseData.numIter}</div>
              <div>DURATION {responseData.time} </div>

              <div>INITIAL </div>
              <CubeState
                matrixData={responseData.initial.Cubes}
                value={responseData.initial.Value}
              />

              <div>FINAL</div>
              <CubeState
                matrixData={responseData.final.Cubes}
                value={responseData.final.Value}
              />

              <div>PLOT</div>
              <ValuePlot chartData={responseData.iterations} />

              <div>VIDEO </div>
              <VideoPlayer
                initialArray={responseData.initial.Cubes}
                indexPairs={responseData.iterations}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
