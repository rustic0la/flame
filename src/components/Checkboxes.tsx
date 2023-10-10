import { useCallback, useState } from "react";
import { isFavorite } from "../utils";
import { useSelector } from "react-redux";
import { selectFavorites } from "../selectors";

const Checkboxes = ({
  url,
  saveToLocalStorage,
  saveToFavorites,
}: {
  url: string;
  saveToLocalStorage: () => void;
  saveToFavorites: () => void;
}) => {
  const [isInLocalStorage, setIsInLocalStorage] = useState(
    () => !!localStorage.getItem(url)
  );

  const favorites = useSelector(selectFavorites);

  const handleLocalStorageToggle = useCallback(() => {
    saveToLocalStorage();
    setIsInLocalStorage((prev) => !prev);
  }, [saveToLocalStorage]);

  return (
    <>
      <td>
        <input
          key={`favorite_${url}`}
          checked={isFavorite(favorites, { url })}
          type="checkbox"
          onChange={saveToFavorites}
          disabled={isInLocalStorage}
        />
      </td>
      <td>
        <input
          key={`localStorage_${url}`}
          type="checkbox"
          id="localStorageCheckbox"
          checked={isInLocalStorage}
          disabled={isFavorite(favorites, { url })}
          onChange={handleLocalStorageToggle}
        />
      </td>
    </>
  );
};

export default Checkboxes;
