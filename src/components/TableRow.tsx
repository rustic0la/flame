import { useDispatch, useSelector } from "react-redux";
import { IPerson } from "./People";
import { useCallback } from "react";
import { setPerson, toggleFavorites, toggleToLocalStorage } from "../slice";
import { getDataFromLocalStorage, getIdFromUrl } from "../utils";
import { Link } from "react-router-dom";
import Checkboxes from "./Checkboxes";
import { selectFavorites } from "../selectors";

const TableRow = ({
  person,
  setPeoples,
}: {
  person: IPerson;
  setPeoples?: (args: unknown) => void;
}) => {
  const favorites = useSelector(selectFavorites);

  const { url, name, height, mass, hair_color } = person;
  const dispatch = useDispatch();

  const savePerson = useCallback(
    (person: IPerson) => {
      dispatch(setPerson(person));
    },
    [dispatch]
  );

  const saveToFavorites = useCallback(() => {
    dispatch(toggleFavorites(person));
  }, [dispatch, person]);

  const saveToLocalStorage = useCallback(() => {
    dispatch(toggleToLocalStorage(person));
    setPeoples?.([...favorites, ...getDataFromLocalStorage()]);
  }, [dispatch, favorites, person, setPeoples]);

  return (
    <tr key={url}>
      <td onClick={() => savePerson(person)}>
        <Link to={`/peoples/${getIdFromUrl(person.url)}`}>{name}</Link>
      </td>
      <td>{height}</td>
      <td>{mass}</td>
      <td>{hair_color}</td>
      <Checkboxes
        saveToFavorites={saveToFavorites}
        saveToLocalStorage={saveToLocalStorage}
        url={url}
      />
    </tr>
  );
};

export default TableRow;
