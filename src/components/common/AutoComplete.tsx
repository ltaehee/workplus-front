import { useState } from "react";

type UserData = {
  name: string;
  id: string;
};

type AutoCompleteProps = {
  data: UserData[];
  onSelect: (user: UserData) => void;
  id?: string;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ data, onSelect, id }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<UserData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = data.filter(
        (user) => user.name.toLowerCase().includes(value.toLowerCase()) // 입력할때마다 소문자변환
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleSelect = (user: UserData) => {
    setSearchTerm(user.name);
    setFilteredData([]);
    onSelect(user);
  };

  return (
    <div className="">
      {id ? (
        <label className={"text-sm"} htmlFor={id}>
          {id}
        </label>
      ) : null}
      <input
        type="text"
        className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2"
        value={searchTerm}
        onChange={handleChange}
        placeholder="참여자 검색"
      />
      {filteredData.length > 0 && (
        <ul className=" z-10 w-full bg-white border border-gray-300 rounded">
          {filteredData.map((user) => (
            <li key={user.id} className="" onClick={() => handleSelect(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
