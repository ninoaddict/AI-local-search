"use client";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import CubeState from "./cube-state";
import { useState, useEffect } from "react";

interface VideoPlayerProps {
  initialArray: number[];
  indexPairs: [number, number][];
}

export default function VideoPlayer({
  initialArray,
  indexPairs,
}: VideoPlayerProps) {
  const [currentMatrixIndex, setCurrentMatrixIndex] = useState(0);
  const [PrevMatrixIndex, setPrevMatrixIndex] = useState(0);
  const [currentMatrixData, setCurrentMatrixData] =
    useState<number[]>(initialArray);
  const [isPaused, setIsPaused] = useState(true);
  const [playSpeed, setPlaySpeed] = useState<number>(1);

  useEffect(() => {
    let arrayCopy = [...currentMatrixData];

    if (currentMatrixIndex > PrevMatrixIndex) {
      for (let i = PrevMatrixIndex; i < currentMatrixIndex; i++) {
        let [index1, index2] = indexPairs[i];
        [arrayCopy[index1], arrayCopy[index2]] = [
          arrayCopy[index2],
          arrayCopy[index1],
        ];
      }
    } else if (currentMatrixIndex < PrevMatrixIndex) {
      for (let i = PrevMatrixIndex - 1; i >= currentMatrixIndex; i--) {
        let [index1, index2] = indexPairs[i];
        [arrayCopy[index2], arrayCopy[index1]] = [
          arrayCopy[index1],
          arrayCopy[index2],
        ]; // swap reverse
      }
    }

    setPrevMatrixIndex(currentMatrixIndex);
    setCurrentMatrixData(arrayCopy);
  }, [initialArray, indexPairs, currentMatrixIndex]);

  useEffect(() => {
    if (isPaused) return;

    const intervalID = setInterval(() => {
      setCurrentMatrixIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < indexPairs.length ? nextIndex : prevIndex; // stay di index yg sama
      });
    }, 500 / playSpeed);

    return () => clearInterval(intervalID);
  }, [isPaused, playSpeed, indexPairs.length]);

  const next = () => {
    setCurrentMatrixIndex((prevIndex) => {
      console.log(prevIndex);
      //   console.log(indexPairs.length);
      if (prevIndex < indexPairs.length) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const prev = () => {
    setCurrentMatrixIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const togglePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  const handleSelectChange = (value: string) => {
    const speedValue = parseFloat(value);
    setPlaySpeed(speedValue);
  };

  return (
    <div>
      <p>CURRENT MATRIX: {currentMatrixIndex}</p>
      <CubeState matrixData={currentMatrixData} />

      <Button onClick={prev}> PREV </Button>
      <Button onClick={next}> NEXT </Button>

      <Slider
        value={[currentMatrixIndex]}
        onValueChange={(value) => setCurrentMatrixIndex(value[0])}
        min={0}
        max={indexPairs.length - 1}
        step={1}
        className="w-full mt-4"
      />

      <Select onValueChange={handleSelectChange} value={String(playSpeed)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Speed" />
        </SelectTrigger>
        <SelectContent>
          {[0.1, 0.5, 1, 1.5, 2, 5].map((speed) => (
            <SelectItem key={speed} value={String(speed)}>
              {speed}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={togglePause}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        {isPaused ? "Resume" : "Pause"}
      </Button>
    </div>
  );
}
