"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import Input from "./ui/input";

const algorithms = [
  { value: "Hill-Climbing", endpoint: "/steepest" },
  {
    value: "Hill-Climbing with Sideways Move",
    endpoint: "/sideways",
    inputs: [
      { placeholder: "Max Consecutive Sideways: ", paramName: "maxMove" },
    ],
  },
  {
    value: "Random Restart Hill-Climbing",
    endpoint: "/random-restart",
    inputs: [{ placeholder: "Max Restart: ", paramName: "maxRestart" }],
  },
  { value: "Stochastic Hill-climbing", endpoint: "/stochastic" },
  { value: "Simulated Annealing", endpoint: "/simulated" },
  {
    value: "Genetic Algorithm",
    endpoint: "/genetic",
    inputs: [
      { placeholder: "Population Size: ", paramName: "initPopulation" },
      { placeholder: "Iteration Time: ", paramName: "maxIter" },
    ],
  },
];

interface AlgorithmSelectionProps {
  onSearch: (data: any) => void; // TODO: Define more specific type if available
}

export default function AlgorithmSelection({
  onSearch,
}: AlgorithmSelectionProps) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  const [inputValues, setInputValues] = useState<string[]>(
    algorithms[0].inputs ? algorithms[0].inputs.map(() => "") : []
  );

  const handleAlgorithmChange = (value: string) => {
    console.log("HANDLE CHANGE");
    const selectedAlg = algorithms.find((alg) => alg.value === value);
    setSelectedAlgorithm(value);
    setInputValues(selectedAlg?.inputs ? selectedAlg.inputs.map(() => "") : []);
  };

  // TODO: Pass to the right endpoint
  const handleSearch = async () => {
    const currentAlgorithm = algorithms.find(
      (alg) => alg.value === selectedAlgorithm
    );
    if (!currentAlgorithm) return;

    const url = new URL(`http://localhost:8080${currentAlgorithm.endpoint}`);
    if (currentAlgorithm.inputs) {
      currentAlgorithm.inputs.forEach((input, index) => {
        if (inputValues[index]) {
          url.searchParams.append(input.paramName, inputValues[index]);
        }
      });
    }

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error("API call error:", error);
      onSearch(null);
    }
  };

  const currentAlgorithm = algorithms.find(
    (alg) => alg.value === selectedAlgorithm
  );

  return (
    <div className="bg-white max-w-md min-w-[310px] p-4 border-black border-2 shadow-black rounded-[5px] shadow-light dark:shadow-dark">
      <h2 className="mb-4 text-xl font-bold text-center">Local Search</h2>

      <Select onValueChange={handleAlgorithmChange}>
        <SelectTrigger className="border-black rounded-lg">
          <SelectValue placeholder="Select an algorithm" />
        </SelectTrigger>
        <SelectContent className="border-black rounded-lg">
          {algorithms.map((alg) => (
            <SelectItem
              key={alg.value}
              value={alg.value}
              className="hover:border ring-offset-black"
            >
              {alg.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-4 space-y-2">
        {currentAlgorithm?.inputs && currentAlgorithm.inputs.length > 0 ? (
          currentAlgorithm.inputs.map((inputConfig, index) => (
            <div key={index} className="flex items-center">
              <label className="mr-2 font-medium">
                {inputConfig.placeholder.replace(":", "")}:
              </label>
              <Input
                key={index}
                value={inputValues[index]}
                setValue={(newValue: string) => {
                  setInputValues((prevValues) => {
                    const updatedValues = [...prevValues];
                    updatedValues[index] = newValue;
                    return updatedValues;
                  });
                }}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder={inputConfig.placeholder}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            {/* No additional inputs required for this algorithm. */}
          </p>
        )}
      </div>

      <Button
        className="mt-2 w-full bg-main border-none rounded-[5px] shadow-light dark:shadow-dark hover:border-solid hover:border-black hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}
