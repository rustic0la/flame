import { useSelector } from "react-redux";
import { selectSelectedPerson } from "../selectors";
import { Link } from "react-router-dom";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

const Person = () => {
  const selectedPerson = useSelector(selectSelectedPerson);

  if (!selectedPerson) {
    return <Link to="/peoples">go back</Link>;
  }

  return (
    <>
      <Link to="/peoples">go back</Link>
      <table>
        <TableHeader />
        <tbody>
          <TableRow person={selectedPerson} key={selectedPerson.url} />
        </tbody>
      </table>
    </>
  );
};

export default Person;
