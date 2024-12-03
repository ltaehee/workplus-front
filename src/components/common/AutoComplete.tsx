import { useEffect, useState } from "react";
import { UserData } from "../../types";
import axios from "axios";
import UseDebounce from "../../hooks/useDebounce";
import { useSelectedUserStore, useUserStore } from "../../store/useUserStore";

type AutoCompleteProps = {
  value?: UserData[];
  onSelect: (user: UserData) => void;
  id?: string;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ onSelect, id }) => {
  const [query, setQuery] = useState("");
  const { filteredData, setFilteredData } = useUserStore();
  const { selectedUsers } = useSelectedUserStore();
  const [user, setUser] = useState<{
    token: string;
  }>({ token: "" });
  const loginUser = localStorage.getItem("user");

  const debouncedSearchInputValue = UseDebounce(query, 700);

  const getUserName = async () => {
    try {
      const request = await axios.get(
        `/api/user/search?username=${debouncedSearchInputValue}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      console.log("getUserName data ", request.data);
      setFilteredData(request.data.users);
    } catch (err) {
      console.log("Error getUserName ", err);
    }
  };

  // useEffect(() => {
  //   console.log("filteredData : ", filteredData);
  // }, [filteredData]);

  // useEffect(() => {
  //   console.log("selectedUsers : ", selectedUsers);
  // }, [selectedUsers]);

  useEffect(() => {
    if (debouncedSearchInputValue) {
      getUserName();
    } else {
      setFilteredData([]);
    }
  }, [debouncedSearchInputValue]);

  useEffect(() => {
    if (loginUser) {
      setUser(JSON.parse(loginUser));
    }
  }, []);

  // useEffect(() => {
  //   console.log("query: ", query);
  //   console.log("filteredData: ", filteredData);
  // }, [query, filteredData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSelect = (user: UserData) => {
    setQuery(user.username);
    setFilteredData([]);
    onSelect(user);
  };

  const availablueUsers = filteredData.filter(
    (user) =>
      !selectedUsers.some((selected) => selected.username === user.username)
  );
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
          {availablueUsers.map((user, index) => (
            <li key={index} className="" onClick={() => handleSelect(user)}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
