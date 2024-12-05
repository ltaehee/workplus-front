const Pagination = () => {
  return (
    <>
      <div className="flex justify-center items-center space-x-2 mt-4">
        {/* 이전 버튼 */}
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400">
          이전
        </button>

        {/* 페이지 번호 */}
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded ${
              index + 1 === 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* 다음 버튼 */}
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400">
          다음
        </button>
      </div>
    </>
  );
};

export default Pagination;
