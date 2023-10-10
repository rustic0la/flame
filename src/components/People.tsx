import { useEffect, useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import Search from "./Search";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

export interface IPerson {
  url: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
}

const People = () => {
  const [people, setPeople] = useState<IPerson[]>([]);
  console.log("🚀 ~ file: People.tsx:46 ~ People ~ People:");

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((res) => res.json())
      .then(({ results }) => setPeople(results));
  }, []);

  return (
    <div>
      <Link to="/">go back</Link>
      {!people.length ? (
        <p>Loading...</p>
      ) : (
        <>
          <Search />
          <table>
            <TableHeader />
            <tbody>
              {people.map((person) => (
                <TableRow person={person} key={person.url} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default People;
