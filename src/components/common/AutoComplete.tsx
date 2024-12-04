import { useEffect, useRef, useState } from "react";
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
  const { filteredData, setFilteredData } = useUserStore(); // 자동완성 데이터
  const { selectedUsers } = useSelectedUserStore();
  const [token, setToken] = useState<{
    token?: string;
  }>({ token: "" });
  const loginUser = localStorage.getItem("user");

  const debouncedSearchInputValue = UseDebounce(query, 500);

  const getUserName = async () => {
    try {
      const request = await axios.get(
        `/api/user/search?username=${debouncedSearchInputValue}`,
        {
          headers: {
            Authorization: token.token,
          },
        }
      );
      // console.log("getUserName data ", request.data);
      setFilteredData(request.data.users);
    } catch (err) {
      console.log("Error getUserName ", err);
    }
  };
  const queryRef = useRef(sessionStorage.getItem("query") || "");
  useEffect(() => {
    console.log("마운트");
    setQuery(queryRef.current);

    if (debouncedSearchInputValue) {
      getUserName();
    }

    return () => {
      setFilteredData([]);
      console.log("언마운트");
    };
    //  else {
    //   setFilteredData([]);
    // }
  }, [debouncedSearchInputValue]);

  useEffect(() => {
    if (loginUser) {
      setToken(JSON.parse(loginUser));
    }
  }, []);

  useEffect(() => {
    queryRef.current = query;
    sessionStorage.setItem("query", query);
    console.log(`Session storage set: ${query}`);
  }, [query]);
  // useEffect(() => {
  //   sessionStorage.setItem("query", query);
  // }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(`Query updated to: ${value}`);
    setQuery(value);
  };

  const handleSelect = (user: UserData) => {
    setQuery("");
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
        type="search"
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
