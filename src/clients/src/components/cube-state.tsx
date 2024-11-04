interface CubeStateProps {
  matrixData: number[];
  value: number;
  haveChanged?: number[];
  willChange?: number[];
  className?: string;
}

export default function CubeState({
  matrixData,
  haveChanged,
  willChange,
  className,
  value,
}: CubeStateProps) {
  return (
    <div
      className={` bg-white py-4 px-4 rounded-lg border-black border-2 shadow-black shadow-light dark:shadow-dark text-center ${
        className ?? ""
      }`}
    >
      <p className="mb-2 font-poppinsMedium">Objective Value: {value} </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="text-black bg-[#88AAEE] grid grid-cols-5 grid-rows-5 gap-1 rounded-[5px] border-black border-2 p-5 max-w-[200px] h-[200px] flex-shrink-0"
          >
            {matrixData.length > 0 &&
              matrixData
                .slice(index * 25, (index + 1) * 25)
                .map((num, innerIndex) => (
                  <button
                    key={innerIndex}
                    className={`text-black ${
                      haveChanged?.includes(index * 25 + innerIndex)
                        ? "bg-green-200"
                        : willChange?.includes(index * 25 + innerIndex)
                        ? "bg-red-200"
                        : "bg-yellow-200"
                    } border-black border-2 w-[35px] h-[35px] translate-x-[-3px] translate-y-[-3px]`}
                  >
                    {num}
                  </button>
                ))}
          </div>
        ))}
      </div>
    </div>
  );
}
