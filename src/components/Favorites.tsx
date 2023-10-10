import { useEffect, useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavorites } from "../selectors";
import { getDataFromLocalStorage, isFavorite } from "../utils";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { IPerson } from "./People";

const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  const [people, setPeoples] = useState<IPerson[]>([
    ...favorites,
    ...getDataFromLocalStorage(),
  ]);

  useEffect(() => {
    setPeoples((prev) =>
      prev.filter(
        ({ url }: { url: string }) =>
          isFavorite(favorites, { url }) || !!localStorage.getItem(url)
      )
    );
  }, [favorites]);

  return (
    <div>
      <Link to="/">go back</Link>
      {!people.length ? (
        <p>Empty list...</p>
      ) : (
        <table>
          <TableHeader />
          <tbody>
            {people.map((person) => (
              <TableRow
                person={person}
                key={person.url}
                setPeoples={setPeoples as (args: unknown) => void}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Favorites;
