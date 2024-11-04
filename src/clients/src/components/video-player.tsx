"use client";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import CubeState from "./cube-state";
import { Iteration } from "../types/response-types";
import { useState, useEffect } from "react";
import pauseLogo from "../public/pause.png";
import playLogo from "../public/play.png";
import nextLogo from "../public/next.png";
import previousLogo from "../public/previous.png";
interface VideoPlayerProps {
  initialArray: number[];
  initialVal: number;
  indexPairs: Iteration[];
  totalIndex: number;
}

export default function VideoPlayer({
  initialArray,
  initialVal,
  indexPairs,
  totalIndex,
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
        let { First: index1, Second: index2 } = indexPairs[i];
        [arrayCopy[index1], arrayCopy[index2]] = [
          arrayCopy[index2],
          arrayCopy[index1],
        ];
      }
    } else if (currentMatrixIndex < PrevMatrixIndex) {
      for (let i = PrevMatrixIndex - 1; i >= currentMatrixIndex; i--) {
        let { First: index1, Second: index2 } = indexPairs[i];
        [arrayCopy[index2], arrayCopy[index1]] = [
          arrayCopy[index1],
          arrayCopy[index2],
        ]; // swap reverse
      }
    }

    setPrevMatrixIndex(currentMatrixIndex);
    setCurrentMatrixData(arrayCopy);
    console.log(indexPairs.length); // TODO
  }, [initialArray, indexPairs, currentMatrixIndex]);

  useEffect(() => {
    if (isPaused) return;

    const intervalID = setInterval(() => {
      setCurrentMatrixIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < indexPairs.length ? nextIndex : prevIndex;
      });
    }, 500 / playSpeed);

    return () => clearInterval(intervalID);
  }, [isPaused, playSpeed, indexPairs.length]);

  const next = () => {
    setCurrentMatrixIndex((prevIndex) => {
      console.log(prevIndex);
      if (prevIndex < indexPairs.length - 1) {
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
      <CubeState
        matrixData={currentMatrixData}
        value={
          currentMatrixIndex == 0
            ? initialVal
            : indexPairs[currentMatrixIndex - 1].Value
        }
        dataChange={
          currentMatrixIndex > 0
            ? [
                indexPairs[currentMatrixIndex - 1].First,
                indexPairs[currentMatrixIndex - 1].Second,
              ]
            : undefined
        }
      />

      <div>
        <div className="flex flex-row translate-x-2 translate-y-4 font-poppinsRegular">
          <p>{currentMatrixIndex + 1}</p>
          <p>/</p>
          <p>{totalIndex + 1}</p>
        </div>
        <Slider
          value={[currentMatrixIndex]}
          onValueChange={(value) => setCurrentMatrixIndex(value[0])}
          min={0}
          max={indexPairs.length}
          step={1}
          className="w-full mt-4"
        />
      </div>
      <div className="flex flex-row mt-2">
        <div className="flex items-center justify-center w-full gap-5">
          <Button
            onClick={prev}
            className="text-white p-2 bg-[#88AAEE] border-black border-2 rounded-full"
            variant={"noShadow"}
          >
            <img src={previousLogo} alt="Previous" width={20} height={20} />
          </Button>
          <Button
            onClick={togglePause}
            className="text-white p-2 bg-[#88AAEE] border-black border-2 rounded-full"
            variant={"noShadow"}
          >
            {!isPaused ? (
              <img src={pauseLogo} alt="Pause" width={20} height={20} />
            ) : (
              <img src={playLogo} alt="Pause" width={20} height={20} />
            )}
          </Button>
          <Button
            onClick={next}
            className="text-white p-2 bg-[#88AAEE] border-black border-2 rounded-full"
            variant={"noShadow"}
          >
            <img src={nextLogo} alt="Next" width={20} height={20} />
          </Button>
        </div>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="rounded-lg border-black max-w-[70px] text-center justify-evenly">
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent className="border-black rounded-lg">
            {[0.5, 1, 1.5, 2, 5, 10, 100].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
