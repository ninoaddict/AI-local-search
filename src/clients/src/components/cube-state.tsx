interface CubeStateProps {
  matrixData: number[];
  value: number;
}

export default function CubeState({ matrixData, value }: CubeStateProps) {
  const handleCLick = () => {
    console.log("clicked");
  };

  return (
    <div>
      <p>Value: {value}</p>
      <div className="flex flex-wrap gap-4">
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
                    onClick={handleCLick}
                    key={innerIndex}
                    className="text-black bg-yellow-200 border-black border-2 w-[35px] h-[35px]"
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
