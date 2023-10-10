import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IPerson } from "./People";
import { useDispatch } from "react-redux";
import { setPerson } from "../slice";
import { useNavigate } from "react-router-dom";
import { getIdFromUrl } from "../utils";

const debounce = (cb: (args?: unknown) => void, delay = 1000) => {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const Search = () => {
  const [value, setValue] = useState("");
  const [searchedPeople, setSearchedPeople] = useState<IPerson[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debounce(() => setValue(e.target.value), 1500)();
      // @ts-ignore
      const value = document.getElementById("search")?.value;
      for (let person of searchedPeople) {
        if (value === person.name) {
          dispatch(setPerson(person));
          navigate(`/peoples/${getIdFromUrl(person.url)}`);
        }
      }
    },
    [dispatch, navigate, searchedPeople]
  );

  useEffect(() => {
    if (value)
      fetch(`https://swapi.dev/api/people/?search=${value}`)
        .then((res) => res.json())
        .then(({ results }) => setSearchedPeople(results));
  }, [value]);

  return (
    <div>
      🔍
      <input
        list="search-names"
        id="search"
        placeholder="type name..."
        onChange={handleInputChange}
      />
      <datalist id="search-names">
        {searchedPeople.map(({ url, name }) => (
          <option key={url}>{name}</option>
        ))}
      </datalist>
    </div>
  );
};

export default Search;
