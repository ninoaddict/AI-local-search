import { Card, CardContent } from "./ui/card";

interface ResultProps {
  title?: string;
  stuckIter?: number;
  numIter?: number;
  duration: number;
  restartTime?: number;
  bestObjective?: number;
  totalPopulation?: number;
}

export default function ResultDetail({
  title,
  stuckIter,
  numIter,
  duration,
  restartTime,
  bestObjective,
  totalPopulation,
}: ResultProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-[310px] bg-white p-0 rounded-lg border-black border-2 shadow-black shadow-light dark:shadow-dark">
        <CardContent className="w-[310px] flex flex-col px-4 py-4 font-poppinsRegular">
          {title && (
            <h1 className="text-xl text-center font-poppinsSemiBold">
              {title}
            </h1>
          )}
          {stuckIter !== undefined && stuckIter > 0 && (
            <p className="grid grid-cols-[1fr_10px_1fr]">
              <h1>Stuck Frequency</h1>
              <h1>:</h1>
              <h1>{stuckIter}</h1>
            </p>
          )}
          {bestObjective && (
            <p className="grid grid-cols-[1fr_10px_1fr]">
              <h1>Best Objective</h1>
              <h1>:</h1>
              <h1>{bestObjective}</h1>
            </p>
          )}
          {totalPopulation && (
            <p className="grid grid-cols-[1fr_10px_1fr]">
              <h1>Total Population</h1>
              <h1>:</h1>
              <h1>{totalPopulation}</h1>
            </p>
          )}
          {numIter && (
            <p className="grid grid-cols-[1fr_10px_1fr]">
              <h1>Total Iteration</h1>
              <h1>:</h1>
              <h1> {numIter}</h1>
            </p>
          )}
          {restartTime && (
            <p className="grid grid-cols-[1fr_10px_1fr]">
              <h1>Restart Iteration</h1>
              <h1>:</h1>
              <h1>{restartTime}</h1>
            </p>
          )}

          <p className="grid grid-cols-[1fr_10px_1fr]">
            <h1>Duration Search</h1>
            <h1>: </h1>

            <h1>{duration} ms</h1>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
