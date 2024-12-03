type VacationHistoryProps = {
  onClick?: () => void;
  className?: string;
  title?: string;
  data?: { label: string; name?: string; date: string }[];
  onListClick?: (item: {
    label?: string;
    date?: string;
    details?: string;
  }) => void;
};

const VacationHistory: React.FC<VacationHistoryProps> = ({
  onListClick,
  className,
  title,
  data,
}) => {
  return (
    <div>
      <p className="font-bold pb-2">{title}</p>
      <div
        className={`border border-[#DFDFDF] bg-white rounded-md p-6 ${className}`}
      >
        {data ? (
          <ul>
            {data.map((item, index) => (
              <li
                onClick={() => onListClick?.(item)}
                key={index}
                className="mb-1 flex justify-between items-center border-b border-gray-300 last:border-none py-2 cursor-pointer hover:text-gray-500"
              >
                <p className="truncate w-[100px]">{item.label}</p>
                <p>{item.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default VacationHistory;
