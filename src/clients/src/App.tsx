import VideoPlayer from "./components/video-player";
import AlgorithmSelection from "./components/algorithm-selection";
import { useState } from "react";
import CubeState from "./components/cube-state";
import { ApiResponse } from "./types/response-types";
import { ValuePlot } from "./components/value-plot";
import { ExpPlot } from "./components/exp-plot";
import { GeneticPlot } from "./components/genetic-value-plot";
import ResultDetail from "./components/ResultDetail";

const App = () => {
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const handleResponseData = (data: ApiResponse) => {
    console.log(data);
    setResponseData(data);
  };

  return (
    <div
      className={`${
        responseData && !isSearching ? "py-4" : "h-screen"
      } flex justify-center items-center  bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]`}
    >
      <div className={`flex flex-col w-full items-center justify-center`}>
        <AlgorithmSelection
          onSearch={handleResponseData}
          onSearching={setIsSearching}
          isSearching={isSearching}
        />
        {/* Render response data berdasarkan tipe */}
        {responseData && !isSearching && (
          <div
            className="p-4 mt-4 rounded-lg"
            key={isSearching ? "Searching" : "Not Search"}
          >
            {"initialPopulation" in responseData && (
              <>
                <ResultDetail
                  title="Genetic Algorithm"
                  bestObjective={responseData.bestState.Value}
                  totalPopulation={responseData.finalPopulation.length}
                  numIter={responseData.numIter}
                  duration={responseData.time}
                />

                <div className="mt-6 text-xl font-bold text-center">
                  BEST STATE
                </div>
                <CubeState
                  matrixData={responseData.bestState.Cubes}
                  value={responseData.bestState.Value}
                />
                <div className="mt-6 text-xl font-bold text-center">PLOT</div>
                <GeneticPlot chartData={responseData.iterations} />
                <div className="mt-6 text-xl font-bold text-center">
                  Initial Population
                </div>
                {responseData.initialPopulation.map((state, index) => (
                  <CubeState
                    key={index}
                    matrixData={state.Cubes}
                    value={state.Value}
                    className="mt-6"
                  />
                ))}

                <div className="mt-6 text-xl font-bold text-center">
                  Final Population
                </div>
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
                <ResultDetail
                  title="Random Restart Hill Climbing"
                  restartTime={responseData.numRestart}
                  duration={responseData.time}
                  bestObjective={responseData.final.Value}
                />

                <div className="mt-6 text-xl font-bold text-center">
                  INITIAL
                </div>
                <CubeState
                  matrixData={responseData.initial.Cubes}
                  value={responseData.initial.Value}
                />

                <div className="mt-6 text-xl font-bold text-center">FINAL</div>
                <CubeState
                  matrixData={responseData.final.Cubes}
                  value={responseData.final.Value}
                />

                <div className="mt-6 text-xl font-bold text-center">PLOT</div>
                {responseData.iterations.map((iteration, index) => (
                  <div>
                    <ValuePlot
                      chartData={iteration.Iter}
                      initialValue={responseData.initial.Value}
                      description={"Restart: " + index}
                    />
                  </div>
                ))}

                <div className="mt-6 text-xl font-bold text-center">VIDEO</div>
                {responseData.iterations.map((iteration, index) => (
                  <div>
                    <p>
                      Iteration for restart {index} : {iteration.NumIter}
                    </p>
                    <VideoPlayer
                      key={index}
                      initialVal={responseData.initial.Value}
                      initialArray={responseData.initial.Cubes}
                      indexPairs={iteration.Iter}
                      totalIndex={iteration.Iter.length}
                    />
                  </div>
                ))}
              </>
            )}
            {"stuckIter" in responseData && (
              <>
                <ResultDetail
                  title="Result"
                  numIter={responseData.numIter}
                  duration={responseData.time}
                  bestObjective={responseData.final.Value}
                  stuckIter={
                    responseData.numIter > 0
                      ? responseData.stuckIter
                      : undefined
                  }
                />

                <div className="mt-6 text-xl font-bold text-center">
                  INITIAL
                </div>
                <CubeState
                  matrixData={responseData.initial.Cubes}
                  value={responseData.initial.Value}
                />

                <div className="mt-6 text-xl font-bold text-center">FINAL</div>
                <CubeState
                  matrixData={responseData.final.Cubes}
                  value={responseData.final.Value}
                />

                <div className="mt-6 text-xl font-bold text-center">PLOT </div>
                <ValuePlot
                  chartData={responseData.iterations}
                  initialValue={responseData.initial.Value}
                />

                {responseData.numIter > 0 && (
                  <div className="mt-6">
                    <ExpPlot chartData={responseData.iterations} />
                  </div>
                )}

                <div className="mt-6 text-xl font-bold text-center">VIDEO</div>
                <VideoPlayer
                  initialVal={responseData.initial.Value}
                  initialArray={responseData.initial.Cubes}
                  indexPairs={responseData.iterations}
                  totalIndex={responseData.iterations.length}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
