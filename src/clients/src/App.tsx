import VideoPlayer from "./components/video-player";
import AlgorithmSelection from "./components/algorithm-selection";
import { useState } from "react";
import CubeState from "./components/cube-state";

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

const App = () => {
  const [responseData, setResponseData] = useState<any | null>(null); // Update with specific type if available

  const handleResponseData = (data: any) => {
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
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
            </>
          )}
          {"numRestart" in responseData && (
            <>
              <h3>Random Restart Hill-Climbing Response</h3>
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
            </>
          )}
          {"initial" in responseData && (
            <>
              <div>INITIAL </div>
              <CubeState matrixData={responseData.initial.Cubes} />

              <div>FINAL</div>
              <CubeState matrixData={responseData.final.Cubes} />

              <div>VIDEO </div>
              <VideoPlayer
                initialArray={responseData.initial.Cubes}
                indexPairs={responseData.iterations}
              />

              <div>DURATION {responseData.time} </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
