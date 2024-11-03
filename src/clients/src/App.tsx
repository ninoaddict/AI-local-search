import { func } from "ts-interface-checker";
import VideoPlayer from "./components/video-player";
import AlgorithmSelection from "./components/algorithm-selection";
import { useState } from "react";

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
  const initialArray = generateSequentialArray(125);
  const indexPairs = generateRandomIndexPairs(125, 7500);

  //TODO: use the right type
  const [responseData, setResponseData] = useState<string | null>(null);

  const handleResponseData = (data: string) => {
    setResponseData(data);
  };

  return (
    <div>
      <AlgorithmSelection onSearch={handleResponseData} />
    </div>
  );
};

export default App;
