"use client";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
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
  const [playSpeed, setPlaySpeed] = useState(1);

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

  const getMatrixSlice = (matrix: number[], start: number, end: number) => {
    return matrix.slice(start, end);
  };

  return (
    <div>
      <p>CURRENT MATRIX: {currentMatrixIndex}</p>
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="text-black bg-[#88AAEE] grid grid-cols-5 grid-rows-5 gap-1 rounded-[5px] border-black border-2 p-5 max-w-[200px] h-[200px] flex-shrink-0"
          >
            {currentMatrixData.length > 0 &&
              currentMatrixData
                .slice(index * 25, (index + 1) * 25)
                .map((num, innerIndex) => (
                  <Button
                    key={innerIndex}
                    className="text-black bg-yellow-200 border-black border-2 w-[35px] h-[35px]"
                  >
                    {num}
                  </Button>
                ))}
          </div>
        ))}
      </div>

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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded">
            Select Speed
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setPlaySpeed(0.1)}>
              0.1
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setPlaySpeed(0.5)}>
              0.5
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setPlaySpeed(1)}>
              1
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setPlaySpeed(1.5)}>
              1.5
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setPlaySpeed(10)}>
              10
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        onClick={togglePause}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        {isPaused ? "Resume" : "Pause"}
      </Button>
    </div>
  );
}
