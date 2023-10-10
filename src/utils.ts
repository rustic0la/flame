import { IPerson } from "./components/People";

export const getIdFromUrl = (url: string): string => {
  const splitted = url.split("/");
  return splitted[splitted.length - 2];
};

export const isFavorite = (
  favorites: IPerson[],
  { url }: { url: string }
): boolean => {
  return favorites.map(({ url }) => url).includes(url);
};

export const getDataFromLocalStorage = () => {
  return Object.entries(localStorage)
    .filter(([key]) => key.includes("https://swapi.dev/api/people/"))
    .map(([_, value]) => JSON.parse(value));
};
