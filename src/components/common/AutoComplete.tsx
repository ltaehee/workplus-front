import { useEffect, useState } from "react";
import { UserData } from "../../types";
import axios from "axios";
import UseDebounce from "../../hooks/useDebounce";

type AutoCompleteProps = {
  data: UserData[];
  onSelect: (user: UserData) => void;
  id?: string;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ data, onSelect, id }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<UserData[]>([]);
  const token = localStorage.getItem("token");

  const debouncedSearchInputValue = UseDebounce(query, 1000);

  const getUserName = async () => {
    try {
      const request = await axios.get(`/api/user/search?username=${query}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("getUserName data ", request.data);
    } catch (err) {
      console.log("Error getUserName ", err);
    }
  };

  useEffect(() => {
    getUserName();
  }, [debouncedSearchInputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = data.filter(
        (user) => user.userName.toLowerCase().includes(value.toLowerCase()) // 입력할때마다 소문자변환
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleSelect = (user: UserData) => {
    setQuery(user.userName);
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
        value={query}
        onChange={handleChange}
        placeholder="참여자 검색"
      />
      {filteredData.length > 0 && (
        <ul className=" z-10 w-full bg-white border border-gray-300 rounded">
          {filteredData.map((user) => (
            <li key={user.id} className="" onClick={() => handleSelect(user)}>
              {user.userName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
