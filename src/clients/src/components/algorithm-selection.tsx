"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";

const algorithms = [
  {
    value: "Hill-Climbing",
  },
  {
    value: "Hill-Climbing with Sideways Move",
    inputs: [{ placeholder: "Max Iteration: " }],
  },
  {
    value: "Random Restart Hill-Climbing",
    inputs: [{ placeholder: "Max Restart: " }],
  },
  {
    value: "Stochastic Hill-climbing",
  },
  {
    value: "Simulated Annealing",
  },
  {
    value: "Genetic Algorithm",
    inputs: [
      { placeholder: "Population Size: " },
      { placeholder: "Iteration Time: " },
    ],
  },
];

interface AlgorithmSelectionProps {
  onSearch: (selectedAlgorithm: string, inputValues: string[]) => void;
}

export default function AlgorithmSelection({
  onSearch,
}: AlgorithmSelectionProps) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    algorithms[0].value
  );

  const [inputValues, setInputValues] = useState<string[]>(
    algorithms[0].inputs ? algorithms[0].inputs.map(() => "") : []
  );

  const handleAlgorithmChange = (value: string) => {
    const selectedAlg = algorithms.find((alg) => alg.value === value);
    setSelectedAlgorithm(value);
    setInputValues(selectedAlg?.inputs ? selectedAlg.inputs.map(() => "") : []);
  };

  const handleInputChange = (index: number, newValue: string) => {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = newValue;
      return updatedValues;
    });
  };

  // TODO: Pass to the right endpoint
  const handleSearch = async () => {
    try {
      const response = await fetch("/api/dummySearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          algorithm: selectedAlgorithm,
          inputs: inputValues,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      onSearch(selectedAlgorithm, inputValues); // Pass both values back to the parent
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const currentAlgorithm = algorithms.find(
    (alg) => alg.value === selectedAlgorithm
  );

  return (
    <div className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Local Search</h2>

      <Select value={selectedAlgorithm} onValueChange={handleAlgorithmChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Algorithm" />
        </SelectTrigger>

        <SelectContent>
          {algorithms.map((alg, index) => (
            <SelectItem key={index} value={alg.value}>
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
              <input
                type="text"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No additional inputs required for this algorithm.
          </p>
        )}
      </div>

      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
